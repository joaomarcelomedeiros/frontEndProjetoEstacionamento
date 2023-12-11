import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { purple, deepPurple, blueGrey } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: deepPurple[500],
    },
    background: {
      default: blueGrey[900],
      paper: blueGrey[800],
    },
    text: {
      primary: '#fff', 
      secondary: 'rgba(255, 255, 255, 0.7)', 
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Fonte principal
    h1: {
      color: '#fff', // Cor do título de nível 1
    },
    h2: {
      color: '#fff', // Cor do título de nível 2
    },
    h3: {
      color: '#fff', // Cor do título de nível 3
    },
    h4: {
      color: '#fff', // Cor do título de nível 4
    },
    h5: {
      color: '#fff', // Cor do título de nível 5
    },
    h6: {
      color: '#fff', // Cor do título de nível 6
    },
    subtitle1: {
      color: 'rgba(255, 255, 255, 0.7)', // Cor do subtítulo 1
    },
    subtitle2: {
      color: 'rgba(255, 255, 255, 0.7)', // Cor do subtítulo 2
    },
    body1: {
      color: '#fff', // Cor do corpo de texto 1
    },
    body2: {
      color: 'rgba(255, 255, 255, 0.7)', // Cor do corpo de texto 2
    },
  },
});

export default theme;
