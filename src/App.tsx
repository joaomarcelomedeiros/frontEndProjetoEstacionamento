import Box from '@mui/material/Box';
import NavBar from './components/NavBar';
import ClientesPage from './pages/ClientesPage';
import Registros from './pages/Registros'
import HomePage from './pages/HomePage';

export default function App() {
  return (
  <>
    <NavBar/>
    <ClientesPage></ClientesPage>
  </>
  );
}
