import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Container, TextField, Typography } from '@mui/material';

export default function FormularioEmpleado() {
  const [empleados, setEmpleados] = useState([]);


  const [formData, setFormData] = useState({
    
    NombreEmpleado : ''
       
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://rpm-tecno-web-api-dev.azurewebsites.net/api/empleado');
        setEmpleados(response.data);
        
      } catch (error) {
        console.error('Error al obtener la lista de empleados', error);
      }
    };

    fetchData();
  }, []); 


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    let formattedValue = value;  
     
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { IdEmpleado, NombreEmpleado} = formData;

    try {
      const response = await axios.post('https://rpm-tecno-web-api-dev.azurewebsites.net/api/empleado', {
        IdEmpleado,
        NombreEmpleado
      });

      console.log(response);
      console.log('Empleado registrado correctamente.');
      window.location.href = '/empleados';
    } catch (error) {
      console.error('Error al registrar el empleado:', error);
    }
  };



  return (
    <Container sx={{mt:5}}>
      <Typography variant='h4' sx={{mb:2}}>Formulario de Técnico</Typography>
      <form onSubmit={handleSubmit}>      
        <div className="form-group">
          <TextField
            label='Nombre'
            name="NombreEmpleado"
            value={formData.NombreEmpleado}
            onChange={handleInputChange}
            required
            fullWidth 
          />
        </div>
        <Button variant="contained" type="submit">Crear</Button>     
      </form>
    </Container>
  );
};


