import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  IconButton,
} from '@mui/material';
import { Add, Delete, DirectionsCar, Edit } from '@mui/icons-material';

interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  cars:Car[]
}

interface Car {
  id: number;
  placa: string;
  modelo: string;
  ano:number;
  cor:string;
  marca:string;
}


interface ClientesTableProps {
  data?: Cliente[];
  onSelectCliente: (cliente: Cliente | null) => void;
  setOpenCliente: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenCar: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteCliente: React.Dispatch<React.SetStateAction<boolean>>;
}
const ClientesTable: React.FC<ClientesTableProps> = ({ data, onSelectCliente, setOpenCliente, setOpenCar, setOpenDeleteCliente }) => {

  const handleEditClick = (cliente: Cliente| null) => {
    onSelectCliente(cliente);
    setOpenCliente(true);
  };
  const handleCarClick = (cliente:Cliente|null) =>{
    onSelectCliente(cliente);
    setOpenCar(true);
  };
  const handleDeleteClienteClick = (cliente: Cliente|null) =>{
    onSelectCliente(cliente);
    setOpenDeleteCliente(true);
  }
  return (
    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell sx={{display:{xs: 'none', sm:'table-cell',md:'table-cell'}}}>CPF</TableCell>
            <TableCell sx={{display:{xs: 'none', sm:'table-cell',md:'table-cell'}}}>Telefone</TableCell>
            <TableCell>Carros</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Deletar</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((cliente) => (
            <TableRow key={cliente.id}  style={{ cursor: 'pointer' }}>
              <TableCell>
                {cliente.nome}
              </TableCell>
              <TableCell sx={{display:{xs: 'none', sm:'table-cell',md:'table-cell'}}}>{cliente.cpf}</TableCell>
              <TableCell sx={{display:{xs: 'none', sm:'table-cell',md:'table-cell'}}} >{cliente.telefone}</TableCell>
              <TableCell ><IconButton sx={{color: 'primary.main'}} onClick={()=>handleCarClick(cliente)}> <DirectionsCar/></IconButton></TableCell>
              <TableCell><IconButton sx={{color: 'primary.main'}} onClick={() => handleEditClick(cliente)} ><Edit/></IconButton></TableCell>      
              <TableCell><IconButton sx={{color: 'primary.main'}} onClick={() => handleDeleteClienteClick(cliente)} ><Delete/></IconButton></TableCell>      

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientesTable;
