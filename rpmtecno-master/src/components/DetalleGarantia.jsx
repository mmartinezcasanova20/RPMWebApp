import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Autocomplete, Button, Container, TextField, Typography } from '@mui/material';

export default function FormularioGarantia() {
  const [garantias, setGarantias] = useState([]);  
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

  const [formData, setFormData] = useState({
    NumeroOrden : '',
    FechaInicio : formattedDate,   
    FechaFinal : '',
    
  });

  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://rpm-tecno-web-api-dev.azurewebsites.net/api/garantia');
        setGarantias(response.data);
        
        const responseServicios = await axios.get('https://rpm-tecno-web-api-dev.azurewebsites.net/api/servicio');
        const ordenesServicioNoGarantizadas = responseServicios.data.filter((servicio) => {
          // Filtrar las órdenes de servicio que no están en la tabla de garantía
          return !response.data.some((garantia) => garantia.NumeroOrden === servicio.NumeroOrden);
        });
  
        setServicios(ordenesServicioNoGarantizadas);
        
        
      } catch (error) {
        console.error('Error al obtener la lista de Garantias', error);
      }
    };

    fetchData();
  }, []); 


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
   
     
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { NumeroOrden, FechaInicio, FechaFinal} = formData;

    try {

      const response = await axios.post('https://rpm-tecno-web-api-dev.azurewebsites.net/api/garantia', {
        NumeroOrden,
        FechaInicio,
        FechaFinal,
      });
      console.log(response);
      console.log('Garantia creada correctamente.');
      window.location.href = '/detalleGarantia';
    } catch (error) {
      console.error('Error :', error);
    }
  };



  return (
    <Container sx={{mt:5}}>
      <Typography variant='h4' sx={{mb:2}}>Formulario de Garantia</Typography>
      <form onSubmit={handleSubmit}>      
        {/* <div className="form-group">  
          <TextField 
          label='Número de Orden'
          name='NumeroOrden'
          value={formData.NumeroOrden}
          onChange={handleInputChange}
          fullWidth 
          />
        </div> */}
        <div className="form-group">
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={servicios}
            name="NumeroOrden"
            value={servicios.find((servicio) => servicio.NumeroOrden === formData.NumeroOrden) || null}
            getOptionLabel={(option) => (option ? option.NumeroOrden.toString() : '')}
            fullWidth
            onChange={(event, newValue) => {
              setFormData({ ...formData, NumeroOrden: newValue?.NumeroOrden || null });
            }}
            renderInput={(params) => <TextField {...params} label="Numero de Orden" required />}
            renderOption={(props, option) => (
              <li {...props}>{option ? option.NumeroOrden.toString() : ''}</li>
            )}
          />
        </div>
        <div className="form-group">
          <TextField
            label='Fecha De Inicio'
            name="FechaInicio"
            value={formData.FechaInicio}
            onChange={handleInputChange}
            required
            fullWidth 
          />
        </div>
        <div className="form-group">
          <TextField
            label='Fecha Final'
            name="FechaFinal"
            value={formData.FechaFinal}
            onChange={handleInputChange}
            required
            fullWidth 
          />
        </div>
       
        <Button variant="contained" type="submit" >Crear</Button>     
      </form>
    </Container>
  );
};


