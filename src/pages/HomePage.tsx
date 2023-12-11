import React, { useState, useEffect } from 'react';
import { Grid, Button, Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { getVagasDisponiveis } from '../service/vagaServiceApi';
import { useLocation } from 'react-router-dom';

const HomePage: React.FC  = () => {
  const [vagasDisponiveis, setVagasDisponiveis] = useState(0);
  const[isVagaReturn, setIsVagaReturn] = useState (true);
  const[isFull, setIsFull] = useState (false);

  const location = useLocation();

  const color = {
    color: isFull ? 'red' : '#4caf50' 
  }
  useEffect( () => {
    const fetchData = async(): Promise<void> =>{
      try{
        const vagas = await getVagasDisponiveis().then(vagas=>vagas)
        if(vagas){
          setVagasDisponiveis(vagas.length);
          if(vagas.length==20){
            setIsFull(true);
          }
          else{
            setIsFull(false);
          }
        }
        else
          setIsVagaReturn(false);
      }catch(err){ 
        setIsVagaReturn(false);
      console.error('Erro: ', err);     
   }
  
  }
  if(location.pathname === '/')
    fetchData();
       
  
},
  [location.pathname]) 

  return (
    <Container
    maxWidth='md'
    sx={{
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt:'20px', color: 'blue', marginBottom: '20px' }}>
        Bem-vindo ao Sistema de Estacionamento
      </Typography>

      <Typography variant="h5" sx={{ color:'secondary.main', marginBottom: '20px' }}>
        { isVagaReturn?(<>Vagas disponíveis: <span style= { color }>{vagasDisponiveis}/20</span></>) :(<>Erro ao buscar o numero de vagas no sistema!</>)}
      </Typography>
        
        <Container  sx={{ p:'30px',border: 1, display:'flex',alignItems:'center',flexDirection:'column', borderColor: 'secondary.main'} }>
        <Typography variant="body1" component="h2"  sx={{ marginBottom: '10px' }}>
          Este sistema foi desenvolvido como projeto acadêmico pelos alunos João e Matheus. Utilizamos as seguintes tecnologias:
        </Typography>
        <List >
          <ListItem>
            <ListItemText primary="TypeORM" secondary="Biblioteca ORM para Node.js e TypeScript" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Elephant SQL" secondary="Banco de dados como serviço baseado em PostgreSQL" />
          </ListItem>
          <ListItem>
            <ListItemText primary="TypeScript" secondary="Superset tipado de JavaScript" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Node.js" secondary="Ambiente de execução JavaScript do lado do servidor" />
          </ListItem>
          <ListItem>
            <ListItemText primary="React" secondary="Biblioteca JavaScript para construção de interfaces de usuário" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Vite" secondary="Bundler e ferramenta de desenvolvimento para projetos React e Vue" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Material-UI" secondary="Biblioteca de componentes React para um design visual atraente" />
          </ListItem>
        </List>
      </Container>
    </Container>
  );
};

export default HomePage;
