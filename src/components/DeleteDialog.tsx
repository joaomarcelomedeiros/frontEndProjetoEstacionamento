import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Typography, DialogActions, DialogContentText, useTheme, useMediaQuery } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { deleteUser } from '../service/clienteServiceApi';


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
  ano:number;
  cor:string;
  marca:string;
}



interface deleteDialogProps {
  
  open: boolean;
  cliente?: Cliente;
  setClienteSelected: React.Dispatch<React.SetStateAction<Cliente | null>>;
  
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showMessage: (message: string, isSuccess: boolean) => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;

}

const deleteDialog: React.FC<deleteDialogProps> = ({ cliente, open, setClienteSelected, setOpen, showMessage, setSearchTerm }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  const  handleClose = () =>{
    setOpen(false);
    if(cliente) setClienteSelected(null);
    
  }
  const handleDelete = async() =>{
    try{
      if(cliente){
      const response =  await deleteUser(cliente.id);
      if(response){
        setSearchTerm("");
        handleClose();
        showMessage ("Carro deletado com sucesso!", true);
      }else{
       throw Error("Operação no servidor não concluuida!")
      }
    } 
    }catch(err){
      console.error("Não foi possível deletar o cliente", err);
      showMessage("Não foi possível deletar o cliente", false);

    }
  }

  return (
    <Dialog  fullScreen={fullScreen} open={open}  onClose={handleClose}>
      <DialogTitle id="responsive-dialog-title">Deletar Cliente</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Tem certeza que deseja deletar o cliente {cliente?.nome} e todos os dados relacionados?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button  autoFocus onClick={handleClose}>Não</Button>
            <Button onClick={handleDelete}>
              Sim
            </Button>
          </DialogActions>
    </Dialog>
  );
};

export default deleteDialog;
