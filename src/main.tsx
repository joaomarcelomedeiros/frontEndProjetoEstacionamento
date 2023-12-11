import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import {  CssBaseline } from '@mui/material';
import theme from './theme';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import ClientesPage from './pages/ClientesPage';
import RegistrosPage from './pages/RegistrosPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/clientes",
    element: <ClientesPage/>
  },
  {
    path: "/registros",
    element: <RegistrosPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar/>
      <RouterProvider router={router}/>
    </ThemeProvider>
  </React.StrictMode>,
);
