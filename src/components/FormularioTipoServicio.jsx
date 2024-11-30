import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Container, TextField, Typography } from '@mui/material';

export default function FormularioTipoServicio() {
  const [tipoServicios, setTipoServicios] = useState([]);


  const [formData, setFormData] = useState({
    
    NombreServicio : ''
       
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://rpm-tecno-web-api-dev.azurewebsites.net/api/tiposervicio');
        setTipoServicios(response.data);
        
      } catch (error) {
        console.error('Error al obtener la lista de servicios', error);
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

    const { IdTipoServicio, NombreServicio} = formData;

    try {
      const response = await axios.post('https://rpm-tecno-web-api-dev.azurewebsites.net/api/tiposervicio', {
        IdTipoServicio,
        NombreServicio
      });

      console.log(response);
      console.log('Servicio registrado correctamente.');
      window.location.href = '/tipoServicios';
    } catch (error) {
      console.error('Error al registrar el servicio:', error);
    }
  };



  return (
    <Container sx={{mt:5}}>
      <Typography variant='h4' sx={{mb:2}}>Formulario de Servicios</Typography>
      <form onSubmit={handleSubmit}>      
        <div className="form-group">
          <TextField
            label='Nombre del Servicio'
            name="NombreServicio"
            value={formData.NombreServicio}
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


