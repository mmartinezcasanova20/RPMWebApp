import './App.css';
import './css/Formularios.css';
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import ListaServicios from './components/ListaServicios';
import ListaClientes from './components/ListaClientes';
import FormularioReparacion from './components/FormularioReparacion';
import { BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
import FormularioCliente from './components/FormularioCliente';
import DetalleServicio from './components/DetalleServicio';
import DetalleGarantia from './components/DetalleGarantia';
import ListaGarantias from './components/ListaGarantias';
import Login from './components/Login';
import ListaEmpleados from './components/ListaEmpleados';
import FormularioEmpleado from './components/FormularioEmpleado';
import ListaTipoServicios from './components/ListaTipoServicios';
import FormularioTipoServicio from './components/FormularioTipoServicio';
import Graficas from './components/Graficas';
import VistaClientes from './components/VistaClientes';



export default function App(){ 

  return (
    <>
    <AuthProvider>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/servicios' element={<ProtectedRoute element={<ListaServicios />} />}/>
        <Route path='/formularioOrden'element={<ProtectedRoute element={<FormularioReparacion />} />}/>  
        <Route path="/clientes" element={<ProtectedRoute element={<ListaClientes />} />}/> 
        <Route path='/formularioCliente'element={<ProtectedRoute element={<FormularioCliente />} />}/>
        <Route path='/empleados'element={<ProtectedRoute element={<ListaEmpleados />} />}/>
        <Route path='/formularioEmpleado'element={<ProtectedRoute element={<FormularioEmpleado />} />}/>
        <Route path='/detalleServicio/:NumeroOrden' element={<ProtectedRoute element={<DetalleServicio />} />} />
        <Route path='/detalleGarantia' element={<ProtectedRoute element={<DetalleGarantia />} />}/>
        <Route path='/listaGarantias' element={<ProtectedRoute element={<ListaGarantias />} />}/>
        <Route path='/tipoServicios' element={<ProtectedRoute element={<ListaTipoServicios />} />}/>
        <Route path='/graficas' element={<ProtectedRoute element={<Graficas />} />}/>
        <Route path='/formularioTipoServicio' element={<ProtectedRoute element={<FormularioTipoServicio />} />}/>
        <Route path='/login' element={<Login/> } />
        <Route path="/"  element={<VistaClientes/> } />
        <Route path="/vistaClientes"  element={<VistaClientes/> } /> 
      </Routes>      
    </div>
    </AuthProvider>
    </>
  );
}

function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // Renderiza el componente solo si está autenticado, de lo contrario, redirige a /login
  return isAuthenticated ? element : (navigate('/'), null);
}

