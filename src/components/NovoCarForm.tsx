import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

interface Car {
  id: number;
  placa: string;
  modelo: string;
  ano: number;
  cor: string;
  marca: string;
}

interface NovoCarFormProps {
  onSave: (car: Car) => void;
  onCancel: () => void;
}

const NovoCarForm: React.FC<NovoCarFormProps> = ({ onSave, onCancel }) => {
  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState(0);
  const [cor, setCor] = useState('');
  const [marca, setMarca] = useState('');

  const handleSave = () => {
    const novoCarro: Car = { id: Date.now(), placa, modelo, ano, cor, marca };
    onSave(novoCarro);
  };

  return (
    <Dialog open={true} onClose={onCancel}>
      <DialogTitle>Adicionar Carro</DialogTitle>
      <DialogContent>
        <TextField label="Placa" fullWidth value={placa} onChange={(e) => setPlaca(e.target.value)} />
        <TextField label="Modelo" fullWidth value={modelo} onChange={(e) => setModelo(e.target.value)} />
        <TextField label="Ano" type="number" fullWidth value={ano} onChange={(e) => setAno(Number(e.target.value))} />
        <TextField label="Cor" fullWidth value={cor} onChange={(e) => setCor(e.target.value)} />
        <TextField label="Marca" fullWidth value={marca} onChange={(e) => setMarca(e.target.value)} />
        <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '20px' }}>
          Salvar
        </Button>

       
      </DialogContent>
    </Dialog>
  );
};

export default NovoCarForm;
