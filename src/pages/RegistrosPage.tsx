import React, { useState } from 'react';
import { format, differenceInMinutes } from 'date-fns';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Box } from '@mui/system';

const RegistrosPage : React.FC = () => {
  const dadosFicticios = Array.from({ length: 10 }, (_, index) => ({
    numeroEstacionar: index + 1,
    numVaga: `V${index + 1}`,
    placaCarro: `ABC-${index + 1000}`,
    entrada: new Date(2023, 0, index + 1, 9, 0),
    saida: new Date(2023, 0, index + 1, 17, 30),
    valor: `$${(index + 1) * 10}`,
  }));

  const [page, setPage] = useState(0);
  const [ano, setAno] = useState('');
  const [mes, setMes] = useState('');



  return (
    <Container maxWidth="md"  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' , height: '90vh'}}>
      <Paper sx={{ marginBottom: '20px', padding: '20px', width: '80%', justifyContent:'space-around', display: 'flex', flexDirection:{xs:'column', md:'row'} , alignItems: 'center', height:{xs: '30vh', md:'10vh'} }}>
        <Box>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Mes</InputLabel>
        <Select
            sx={{width: '100px'}}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={mes}
            label="Mes"
            onChange={(e:SelectChangeEvent)=>{setMes(e.target.value)}}
          >
            <MenuItem value={1}>Janeiro</MenuItem>
            <MenuItem value={2}>Fevereiro</MenuItem>
            <MenuItem value={3}>Março</MenuItem>
            <MenuItem value={4}>Abril</MenuItem>
            <MenuItem value={5}>Maio</MenuItem>
            <MenuItem value={6}>Junho</MenuItem>
            <MenuItem value={7}>Julho</MenuItem>
            <MenuItem value={8}>Agosto</MenuItem>
            <MenuItem value={9}>Setembro</MenuItem>
            <MenuItem value={10}>Outubro</MenuItem>
            <MenuItem value={11}>Novembro</MenuItem>
            <MenuItem value={12}>Dezembro</MenuItem>
          </Select>
          </FormControl>
          </Box>
          <Box>
          <TextField id="filled-basic" label="Ano" value={ano} onChange={(e)=>setAno(e.target.value)} variant="filled" />
          </Box>
          <Box>
          <Button variant="contained" color="primary">Buscar</Button>
          </Box>         
          
      </Paper>
      <TableContainer sx={{height: '80%'}} component={Paper}>
        <RadioGroup>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Número Estacionar</TableCell>
              <TableCell align="right">Num Vaga</TableCell>
              <TableCell align="right">Placa do Carro</TableCell>
              <TableCell align="right">Entrada</TableCell>
              <TableCell align="right">Saída</TableCell>
              <TableCell align="right">Tempo de Estadia (min)</TableCell>
              <TableCell align="right">Valor</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {dadosFicticios.map((dados, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                <FormControlLabel value={dados.numeroEstacionar} control={<Radio />} label={dados.numeroEstacionar} />
                </TableCell>
                <TableCell align="right">{dados.numVaga}</TableCell>
                <TableCell align="right">{dados.placaCarro}</TableCell>
                <TableCell align="right">{format(dados.entrada, 'dd/MM/yyyy HH:mm')}</TableCell>
                <TableCell align="right">{format(dados.saida, 'dd/MM/yyyy HH:mm')}</TableCell>
                <TableCell align="right">{differenceInMinutes(dados.saida, dados.entrada)}</TableCell>
                <TableCell align="right">{dados.valor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </RadioGroup>
      </TableContainer>
    </Container>
  );
};

export default RegistrosPage;
