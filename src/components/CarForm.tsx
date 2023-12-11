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
  ListItemButton,
  Alert,
  AlertTitle,
  DialogContentText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import GarageIcon from '@mui/icons-material/Garage';
import { Edit, Delete, EditRounded } from '@mui/icons-material';
import { getCliente, postUser, putUser } from '../service/clienteServiceApi';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { deleteCar, postCar, putCar } from '../service/carServiceApi';
import { getVagasDisponiveis } from '../service/vagaServiceApi';
import { postEstacionar } from '../service/estacionarServiceApi';


interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  cars: Car[];
}
interface Car {
  id: number;
  placa: string;
  modelo: string;
  ano: number;
  cor: string;
  marca: string;
}
interface Estacionar{
  cliente: Cliente;
  car: Car;  
  numVaga:number;
  entrada?:string;
  saida?:string;
  preco?:number;
  tempoestadia?:number;
}

interface CarFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setClienteSelected: React.Dispatch<React.SetStateAction<Cliente | null>>;
  cliente?: Cliente;
}

const CarForm: React.FC<CarFormProps> = ({
  open,
  setOpen,
  setClienteSelected,
  cliente = { nome: '', cpf: '', id: -1, telefone: '', cars: [] },
}) => {
  const [cars, setCarros] = useState<Car[]>(cliente.cars);
  const [car, setCarSelected] = useState<Car | null>(null);
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [cor, setCor] = useState('');
  const [ano, setAno] = useState('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [showMessage, setShowMessage] = useState(false);
  const [isSucess, setIsSucess] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [estacionarDialog, setEstacionarDialog] = useState(false);
  const [vagaSelecionada,setVagaSelecionada] = useState <number|null>(null);
  const [vagasDisponiveis,setVagasDisponiveis] = useState <number[]>();



  const handleCarSave = async () => {
    try {
      if (!car) {
        const response = await postCar({ id: -1, placa: placa, modelo: modelo, marca: marca, cor: cor, ano: Number(ano), cliente: cliente });
        if (response) {
          updateData();
          handleMessageSucessWarning(true, "Carro adicionado!");
        }
      } else {
        const response = await putCar({ id: car.id, placa: placa, modelo: modelo, marca: marca, cor: cor, ano: Number(ano), cliente: cliente });
        if (response) {
          updateData();
          handleMessageSucessWarning(true, "Carro atualizado!");
        }
      }

    } catch (error) {
      console.error('Erro: ', error);
      handleMessageSucessWarning(false, "Não foi possível concluir a operação!");

    }
  }
  const updateData = async () => {
    const updateCLiente = await getCliente(cliente.id);
    console.log(updateCLiente);
    if (updateCLiente)
      setClienteSelected(updateCLiente);
    else
      handleClose();
  }

  const handleCarDelete = async () => {
    try {
      if (car) {
        const response = await deleteCar(car.id);
        if (response) {
          setDeleteDialog(false);
          handleMessageSucessWarning(true, "Carro deletado com sucesso!")
          updateData();
        } else {
          throw new Error("Não foi possível deletar o carro");
        }
      } else {
        throw new Error("Carro não esta selecionado!")
      }
    } catch (error) {
      setDeleteDialog(false);
      handleMessageSucessWarning(false, "Não foi possível deletar o carro");
      console.error("Erro: ", error);
      throw error;
    }

  }
  const handleCarEstacionar = async () => {
    try{
      if(vagaSelecionada && car){
        const novoRegistroEstacioar:Estacionar = {
        numVaga: vagaSelecionada,  
        cliente: cliente,
        car: car
      }; 
      const response = await postEstacionar(novoRegistroEstacioar);
      if(response){
        setEstacionarDialog(false);
        setCarSelected(null);
        handleMessageSucessWarning(true, "Registro cadastrado com sucesso!")
      }else{
        throw new Error("Não foi possível cadastrar o novo registro");
      }
    }else{
      throw new Error("Dados faltando para fazer a requsição!");
    }
    }catch(error){
      console.error("Erro ao criar o registro", error);
      setEstacionarDialog(false);
      setCarSelected(null);
      handleMessageSucessWarning(false, "Não foi possível cadastrar o novo registro");
      console.error("Erro: ", error);
      throw error;
    }
  }
  const handleMessageSucessWarning = (sucess: boolean, message: string) => {
    setIsSucess(sucess);
    setAlertMessage(message);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setIsSucess(false);
      setAlertMessage('');
    }, 5000);

  }
  const handleClose = () => {
    setOpen(false);
    if (cliente) setClienteSelected(null);
    if (car) setCarSelected(null);

  };

  useEffect( () => {
      const fetchData = async(): Promise<number[]> =>{
        try{
          const vagas = await getVagasDisponiveis().then(vagas=>vagas)
          if(vagas)
            return vagas;
          else
            throw new Error("Erro ao obter quais vagas estão disponíveis!")
      }catch(err){ 
      console.error('Erro: ', err);
       handleMessageSucessWarning(false, "Não foi possível concluir a operação!");
       setEstacionarDialog(false);
       return [];
     }
    
    }
    if(estacionarDialog){
      fetchData().then(vagas=> setVagasDisponiveis(vagas));
         
    }
  },
    [estacionarDialog])

  useEffect(() => {
    if (car) {
      setPlaca(car.placa);
      setModelo(car.modelo);
      setMarca(car.marca);
      setAno(String(car.ano));
      setCor(car.cor);
    } else {
      setPlaca('');
      setModelo('');
      setMarca('');
      setAno('');
      setCor('');
    }

  }, [car])

  useEffect(() => {
    setCarros(cliente.cars)
    setCarSelected(null);
  },
    [cliente])

    
  const handleOnClickEdit = (carro: Car) => {
    if (car) {
      setCarSelected(null);
    } else {
      setCarSelected(carro);
    }
  }
  const handleChangeVaga = (e: SelectChangeEvent)=>{
      setVagaSelecionada(Number(e.target.value));
  }

  return (
    <Dialog fullScreen={fullScreen} aria-labelledby="responsive-dialog-title" open={open} onClose={handleClose}>
      {deleteDialog ? (
        <React.Fragment>
          <DialogTitle id="responsive-dialog-title">Deletar Carro</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Tem certeza que deseja deletar o carro de placa {car?.placa}? Todos os registros de estacionamento ligados a ele seráo perdididos.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setDeleteDialog(false); setCarSelected(null) }} autoFocus>Não</Button>
            <Button onClick={handleCarDelete}>
              Sim
            </Button>
          </DialogActions>
        </React.Fragment>
      ) : estacionarDialog ? (
        <React.Fragment>
          <DialogTitle id="responsive-dialog-title">Estacionar Carro</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Escolha o número  da vaga para estacioar o carro de placa {car?.placa}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Vaga</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={String(vagaSelecionada)}
                label="Age"
                onChange={handleChangeVaga}
              >
                 <MenuItem value={""}>nenhuma</MenuItem>
                {vagasDisponiveis?.map((vaga)=>(
                  <MenuItem value={vaga}>{vaga}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button onClick={() => { setEstacionarDialog(false); setCarSelected(null) }} autoFocus>Não</Button>
            <Button disabled={!vagaSelecionada} onClick={handleCarEstacionar}>
              Sim
            </Button>
          </DialogActions>

        </React.Fragment>
      ) : (
        <React.Fragment >
          <DialogTitle id="responsive-dialog-title">Gerenciar carros de {cliente.nome}</DialogTitle>
          <DialogContent >
            <Grid container spacing={5} justifyContent="center" alignItems="center">
              {showMessage &&
                (
                  <Grid item xs={12}>
                    <Alert severity={isSucess ? 'success' : 'warning'}>
                      <AlertTitle>{isSucess ? 'Sucesso' : 'Alerta'}</AlertTitle>
                      {alertMessage}
                    </Alert>
                  </Grid>
                )}

              <Grid item xs={12}>
                <TextField label="Placa" fullWidth value={placa} inputProps={{ maxLength: 7 }} onChange={(e) => { setPlaca(e.target.value) }} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Modelo" fullWidth value={modelo} onChange={(e) => setModelo(e.target.value)} />
              </Grid>

              <Grid item xs={12}>
                <TextField label="Marca" fullWidth value={marca} onChange={(e) => setMarca(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Ano" fullWidth value={ano} onChange={(e) => setAno(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Cor" fullWidth value={cor} onChange={(e) => setCor(e.target.value)} />
              </Grid>
              <Grid item xs={12} >
                <List subheader="Carros">
                  {cars.map((carro) => (
                    <>
                      <ListItem selected={car && car.id == carro.id ? true : false}>
                        <ListItemText sx={{ paddingRight: 0 }} primary={carro.placa} secondary={carro.modelo} />
                        <ListItemSecondaryAction>
                          <IconButton color={car && car.id == carro.id ? 'secondary' : 'primary'} onClick={() => handleOnClickEdit(carro)}>
                            {car && car.id == carro.id ? <EditRounded /> : <Edit />}
                          </IconButton >
                          <IconButton sx={{ color: 'primary.main' }} onClick={() => { setDeleteDialog(true); setCarSelected(carro) }}>
                            <Delete />
                          </IconButton>
                          <IconButton sx={{ color: 'primary.main' }} onClick={() => { setEstacionarDialog(true); setCarSelected(carro); }}>
                            <GarageIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>

                    </>
                  ))}
                </List>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button variant="contained" color="primary" onClick={handleCarSave}>
                Salvar
              </Button>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Cancelar
              </Button>
            </ButtonGroup>
          </DialogActions>
        </React.Fragment>

      )}
    </Dialog>
  )
};

export default CarForm;
