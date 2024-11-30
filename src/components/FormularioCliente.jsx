import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Container, TextField, Typography } from '@mui/material';

export default function FormularioCliente() {
  const [clientes, setClientes] = useState([]);
  const [errorClienteExistente,setErrorClienteExistente] = useState(false);
  const [errorCI,setErrorCI] = useState(false);
  const [ciBuscado, setCIBuscado] = useState('');
  const [editando, setEditando] = useState(true);


  const [formData, setFormData] = useState({
    CI : '',
    Nombre : '',   
    Apellido : '',
    Telefono : '',
    Mail : ''    
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://rpm-tecno-web-api-dev.azurewebsites.net/api/cliente');
        setClientes(response.data);
        
      } catch (error) {
        console.error('Error al obtener la lista de clientes', error);
      }
    };

    fetchData();
  }, []); 


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setCIBuscado(value);
    let formattedValue = value;
    

    // Lógica para formatear la cédula
    if (name === 'CI') {
     // Eliminar puntos y guiones antes de aplicar el formato
     formattedValue = value.replace(/\D/g, '');
     
      
      }

      setFormData({ ...formData, [name]: formattedValue });
      // Validar longitud de la cédula al ingresar el valor
      if (name === 'CI' && (value.length === 7 || value.length === 8)) {
        setErrorCI(false);
  
    }
   
     
  };

  const handleBlurNumeroCI = () => {
    let estaPresente = false;
    console.log(ciBuscado);
  
    clientes.forEach((cliente) => {
      console.log(cliente.CI);
      if (cliente.CI.toString() === ciBuscado.toString()) {
        console.log(estaPresente);
        estaPresente = true;
        console.log(estaPresente);
      }
    });
  
    setErrorClienteExistente(estaPresente);
    setEditando(estaPresente);
  };

  

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { CI, Nombre, Apellido, Telefono, Mail } = formData;

    if (CI.length !== 7 && CI.length !== 8) {
      setErrorCI(true);
      return;
    }

    try {
      const response = await axios.post('https://rpm-tecno-web-api-dev.azurewebsites.net/api/cliente', {
        CI,
        Nombre,
        Apellido,
        Telefono,
        Mail,
      });

      console.log(response);
      console.log('Cliente registrado correctamente.');
      window.location.href = '/clientes';
    } catch (error) {
      console.error('Error al registrar el cliente:', error);
    }
  };



  return (
    <Container sx={{mt:5}}>
      <Typography variant='h4' sx={{mb:2}}>Formulario de Cliente</Typography>
      <form onSubmit={handleSubmit}>      
        <div className="form-group">  
          <TextField 
          label='Cédula'
          name='CI'
          value={formData.CI}
          onChange={handleInputChange}
          onBlur={handleBlurNumeroCI}
          helperText={errorClienteExistente
            ? 'El cliente ya está registrado'
            : errorCI
            ? 'Formato de cédula incorrecto'
            : ''}
          error={errorClienteExistente || errorCI}
          required
          fullWidth 
          />
        </div>
        <div className="form-group">
          <TextField
            label='Nombre'
            name="Nombre"
            value={formData.Nombre}
            onChange={handleInputChange}
            disabled={editando}
            required
            fullWidth 
          />
        </div>
        <div className="form-group">
          <TextField
            label='Apellido'
            name="Apellido"
            value={formData.Apellido}
            onChange={handleInputChange}
            disabled={editando}
            required
            fullWidth 
          />
        </div>
        <div className="form-group">
          <TextField
            label='Teléfono'
            name="Telefono"
            value={formData.Telefono}
            onChange={handleInputChange}
            disabled={editando}
            helperText="Debe ingresar el código de area y el número sin el 0. Ej: 59897258968"
            required
            fullWidth 
          />
        </div>
        <div className="form-group">
          <TextField
            label='Correo electrónico'
            type="mail"
            name="Mail"
            value={formData.Mail}
            onChange={handleInputChange}
            disabled={editando}s
            required
            fullWidth 
          />
        </div>
        <Button variant="contained" type="submit" disabled={editando}>Crear</Button>     
      </form>
    </Container>
  );
};


