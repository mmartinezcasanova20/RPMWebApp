import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Autocomplete, Button, Container, MenuItem, TextField, Typography } from '@mui/material';


export default function FormularioReparacion() { 
  
  const [servicios, setServicios] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [tipoServicios, setTipoServicios] = useState([]);
  const currentDate = new Date().toISOString().split('T')[0];
  const [ordenBuscado, setOrdenBuscado] = useState('');
 

  
  const [formData, setFormData] = useState({
    
    ciCliente : '',   
    modelo : '',
    tipoEquipo : '',
    tipoServicio : '',
    trabajoARealizar : '',
    tecnico : '',
    precioReparacion : '',
    fechaRecibido : currentDate,
    fechaFinalizado : '',
    nota : '',
    idEstado : '1',
    Borrado : 0
  });  


  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://rpm-tecno-web-api-dev.azurewebsites.net/api/cliente');
        console.log('Clientes desde la API:', response.data);

        const formattedClientes = response.data.map((cliente) => ({ label: cliente.Nombre + ' ' + cliente.Apellido, value: cliente.CI }));
        console.log('Clientes formateados:', formattedClientes);

        const responseServicios = await axios.get('https://rpm-tecno-web-api-dev.azurewebsites.net/api/servicio');
        setServicios(responseServicios.data);

        setClientes(formattedClientes);

        const tecnicosResponse = await axios.get('https://rpm-tecno-web-api-dev.azurewebsites.net/api/empleado');
        setTecnicos(tecnicosResponse.data);

        const tipoServicioResponse = await axios.get('https://rpm-tecno-web-api-dev.azurewebsites.net/api/tiposervicio');
        setTipoServicios(tipoServicioResponse.data);

      } catch (error) {
        console.error('Error al obtener la lista de clientes', error);
      }
    };

    fetchData();
  }, []); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setOrdenBuscado(value);
    }
  
  
const handleSubmit = async (e) => {
  e.preventDefault();

  const {
      numeroOrden,
      ciCliente,
      tipoEquipo,
      modelo,
      trabajoARealizar,
      tipoServicio,
      fechaRecibido,
      fechaFinalizado,
      tecnico,
      precioReparacion,
      idEstado,
      nota
  } = formData;

  try {
    const response = await axios.post('https://rpm-tecno-web-api-dev.azurewebsites.net/api/servicio', {
      numeroOrden,
      ciCliente,
      tipoEquipo,
      modelo,
      trabajoARealizar,
      tipoServicio,
      fechaRecibido,
      fechaFinalizado,
      tecnico,
      precioReparacion,
      idEstado,
      nota
    });
    console.log(response);
    console.log('Reparación registrada correctamente.');
    window.location.href = '/servicios';
    
  } catch (error) {
    console.error('Error al registrar la reparación:', error);
  }
};

  return (
    <Container sx={{mt:5}}>
      <Typography variant='h4' sx={{mb:2}}>Formulario de Reparación</Typography>
      <form onSubmit={handleSubmit}>          
        <div className="form-group">
        <Autocomplete
          disablePortal
          id="combo-box-demo"          
          options={clientes}
          getOptionLabel={(option) => (option ? option.label : '')}
          fullWidth
          onChange={(event, newValue) => {
            setFormData({ ...formData, ciCliente: parseInt(newValue?.value, 10) || '' });
          }}
          renderInput={(params) => <TextField {...params} label="Cliente"
          required />}
        />
        </div>
        <div className="form-group">
          <TextField
            label='Cédula'
            type="number"
            name="ciCliente"
            value={formData.ciCliente}
            onChange={handleInputChange}
            required
            InputProps={{
              readOnly: true,
            }}
            fullWidth 
          />
        </div>    
        <div className="form-group">
          <TextField
            label='Tipo de Equipo'
            type="text"
            name="tipoEquipo"
            value={formData.tipoEquipo}
            onChange={handleInputChange}
            required
            fullWidth 
          />
        </div>
        <div className="form-group">
          <TextField
            label='Modelo de Equipo'
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleInputChange}
            required
            fullWidth
          />
        </div>
        <div className="form-group">
          <TextField
            label='Reparación a realizar'
            type="text"
            name="trabajoARealizar"
            value={formData.trabajoARealizar}
            onChange={handleInputChange}
            required
            multiline
            rows={4}
            fullWidth 
          />
        </div>
        <div className="form-group">
          <TextField
            label='Tipo de Servicio'
            type="text"
            name="tipoServicio"
            value={formData.tipoServicio}
            onChange={handleInputChange}
            required
            fullWidth
            select
            helperText="Por favor, seleccione el servicio que desea realizar"
          >
          {tipoServicios.map(tipo => (
    <MenuItem key={tipo.NombreServicio} value={tipo.IdTipoServicio}>
      {tipo.NombreServicio}
    </MenuItem>
  ))}
          </TextField>
        </div>
        <div className="form-group">
          <TextField
            label='Fecha de Entrega'
            type="date"
            name="fechaRecibido"
            value={formData.fechaRecibido}
            onChange={handleInputChange}
            required
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="form-group">
          <TextField
            label='Técnico'
            type="text"
            name="tecnico"
            value={formData.tecnico}
            onChange={handleInputChange}
            select
            required
            fullWidth
          >
            {tecnicos.map(tecnico => (
    <MenuItem key={tecnico.NombreEmpleado} value={tecnico.IdEmpleado}>
      {tecnico.NombreEmpleado}
    </MenuItem>
  ))}
          
          </TextField>
          
        </div>
        <div className="form-group">
          <TextField
            label='Presupuesto'
            type="number"
            name="precioReparacion"
            value={formData.precioReparacion}
            onChange={handleInputChange}
            required
            fullWidth
          />
        </div>
        <div className="form-group">
          <TextField
            label='Notas'
            type="textarea"
            name="nota"
            value={formData.nota}
            onChange={handleInputChange}
            fullWidth
            helperText="Registrar PIN o patrón de desbloqueo"
          />
        </div>        
        <Button variant="contained" type="submit" fullWidth >Registro</Button>
    </form>
    </Container>
  );
};


