import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRoutes, BrowserRouter as Router } from 'react-router-dom';

// Importación de componentes
import Inicio from '../src/pages/inicio';
import Platillos from '../src/pages/Platillos';
import Pedidos from '../src/pages/Pedidos';
import Roles from '../src/pages/Usuario';
import NotFound from '../src/pages/NotFound';
import Navbar from './componentes/navbar';
import Informacion from './componentes/informacion';
import Productos from './pages/Productos';


const AppRoutes = () => {
  return useRoutes([
    { path: '/inicio', element: <Inicio /> },
    { path: '/platillos', element: <Platillos /> },
    { path: '/pedidos', element: <Pedidos /> },
    { path: '/roles', element: <Roles /> },
    { path: '*', element: <NotFound /> },
    { path: '/Productos', element: <Productos /> },
  ]);
};



function App() {
  return (
    <Router>
      <Navbar />
      {/* <Informacion/> */}
      {/* <PlatillosForm /> */}
      <AppRoutes />
    </Router>
  );
}

export default App;
