import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  Typography,
  DialogActions,
  ButtonGroup,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { postUser, putUser } from '../service/clienteServiceApi';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface Car {
  id: number;
  placa: string;
  modelo: string;
  ano: number;
  cor: string;
  marca: string;
}

interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  cars: Car[];
}

interface ClienteFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setClienteSelected: React.Dispatch<React.SetStateAction<Cliente | null>>;
  showMessage: (message: string, isSuccess: boolean) => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setOpenCar: React.Dispatch<React.SetStateAction<boolean>>;
  cliente?: Cliente;
}

const ClienteForm: React.FC<ClienteFormProps> = ({
  open,
  setOpen,
  setClienteSelected,
  showMessage,
  setSearchTerm,
  setOpenCar,
  cliente = { nome: '', cpf: '', id: -1, telefone: '', cars: [] },
}) => {
  const [cars, setCarros] = useState<Car[]>(cliente.cars);
  const [nome, setNome] = useState(cliente.nome);
  const [cpf, setCpf] = useState(cliente.cpf);
  const [telefone, setTelefone] = useState(cliente.telefone);
  const [error, setError] = useState<boolean>(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const inputCPF = e.target.value;
    const formattedCPF = inputCPF.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    if (inputCPF.length === 11) {
      setCpf(formattedCPF);
      setError(false);
    } else {
      setCpf(inputCPF);
      setError(true);
    }
  };
  
  const handleClienteSave = async () => {
    try {
      setError(false);

      if (cliente.id === -1) {
        const response = await postUser(cpf, nome, telefone);
        if (response) {
          showMessage('Usuário criado com sucesso', true);
          setSearchTerm(response.nome);
          handleClose();
        }
      } else {
        const putCliente: Cliente = { id: cliente.id, nome, cpf, telefone, cars };
        const response = await putUser(putCliente);
        if (response) {
          showMessage('Usuário editado com sucesso', true);
          setSearchTerm(response.nome);
          handleClose();
        }
      }
    } catch (error) {
      console.error('Erro: ', error);
      showMessage('Não foi possível concluir a operação', false);
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    if (cliente) setClienteSelected(null);
  };

  return (
    <Dialog fullScreen={fullScreen} aria-labelledby="responsive-dialog-title" open={open} onClose={handleClose}>
      <DialogTitle id="responsive-dialog-title">{cliente.id !== -1 ? 'Editar Cliente' : 'Adicionar Cliente'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={5} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <TextField label="Nome" fullWidth value={nome} onChange={(e) => setNome(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="CPF"
              fullWidth
              value={cpf}
              error={error}
              inputProps={{ maxLength: 14 }}
              helperText={error ? 'Digite o CPF completo' : ''}
              onChange={(e) => handleCPFChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Telefone" fullWidth value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button variant="contained" color="primary" onClick={handleClienteSave}>
            Salvar
          </Button>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Cancelar
          </Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
};

export default ClienteForm;
