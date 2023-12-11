import React, { useEffect, useState } from 'react';
import { Container, Button,ButtonGroup, TextField, Grid, Alert, AlertTitle } from '@mui/material';
import ClientesTable from '../components/ClientesTable';
import ClienteForm from '../components/ClienteForm';
import { getSearchUsers } from '../service/clienteServiceApi';
import CarForm from '../components/CarForm';
import DeleteDialog from '../components/DeleteDialog';

interface Car {
  id: number;
  placa: string;
  modelo: string;
  ano:number;
  cor:string;
  marca:string;
}

interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  cars: Car[];
}
const ClientesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [openFormCliente, setOpenFormCliente] = useState<boolean>(false);
  const [openFormCar, setOpenFormCar] = useState<boolean>(false);
  const [openAlertDeleteCliente, setOpenAlertDeleteCliente] = useState<boolean>(false);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [dataClientes, setClientes] = useState<Cliente[]>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [messageAlert, setMessageAlert] = useState <string> ("");

  const showMessage = (message: string, isSuccess: boolean) => {
    if (isSuccess) {
      setShowSuccess(true);
    } else {
      setShowAlert(true);
    }

    setMessageAlert(message);

    setTimeout(() => {
      setShowAlert(false);
      setShowSuccess(false);
      setMessageAlert('');
    }, 5000);
  };

  useEffect(()=>{
    if(!openAlertDeleteCliente || !openFormCar || !openFormCliente)
      handleSearchButtonClick();
  }, [openFormCar, openFormCliente,openAlertDeleteCliente])
  
  

  const handleSearchButtonClick = () =>{
    const fetchData = async () => {
      if (searchTerm.trim() === '') {
        setClientes(undefined);
        return;
      }
      getSearchUsers(searchTerm)
        .then((response) => {
          console.log(response);
          setClientes(response);
        })
        .catch((error) => {
          console.error('Erro na requisição:', error);
          showMessage('Não encontramos resposta para a pesquisa.', false);
        });
    };
    fetchData();
  } 
  const handleAddButtonClick = () => {
    setOpenFormCliente(true);
  };
 

  return (
    <Container  maxWidth="md" sx={{ marginTop: '20px', textAlign: 'center' }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            label="Pesquisar Cliente"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}

          />
        </Grid>
        <Grid item xs={12} md={4} container justifyContent="center" alignItems="center">
         <ButtonGroup variant="contained" aria-label="outlined primary button group"> 
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearchButtonClick}
          >
            Buscar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddButtonClick}
          >
            Adicionar
          </Button>
          </ButtonGroup>
        </Grid>
        
      </Grid>

      {showAlert && (
        <Alert severity="warning" style={{ marginTop: '10px' }}>
          <AlertTitle>Alerta</AlertTitle>
          {messageAlert}
        </Alert>
      )}

      {showSuccess && (
        <Alert severity="success" style={{ marginTop: '10px' }}>
          <AlertTitle>Sucesso</AlertTitle>
          {messageAlert}
        </Alert>
      )}
 

      <ClientesTable data={dataClientes} onSelectCliente={setSelectedCliente} setOpenCliente={setOpenFormCliente}  setOpenCar={setOpenFormCar} setOpenDeleteCliente={setOpenAlertDeleteCliente}/>
      {openFormCliente && (
        <ClienteForm
          open={openFormCliente}
          setOpen={setOpenFormCliente}
          showMessage={showMessage}
          setClienteSelected ={setSelectedCliente}
          setSearchTerm={setSearchTerm}
          setOpenCar={setOpenFormCar}
          cliente={selectedCliente ? { ...selectedCliente! } : undefined}
        />
      )}
      {openFormCar && (
        <CarForm open={openFormCar}  setOpen={setOpenFormCar}  setClienteSelected={setSelectedCliente}   cliente={selectedCliente!}/>
        )}
        {openAlertDeleteCliente && (
          <DeleteDialog open={openAlertDeleteCliente}  setClienteSelected={setSelectedCliente} setSearchTerm={setSearchTerm} setOpen={setOpenAlertDeleteCliente} cliente={selectedCliente! } showMessage={showMessage} ></DeleteDialog>
        )}
        
    </Container>
  );
};

export default ClientesPage;
