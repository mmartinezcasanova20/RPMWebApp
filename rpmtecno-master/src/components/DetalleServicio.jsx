import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Container, Grid, TextField, Typography } from "@mui/material";


export default function DetalleServicio() {

  const { NumeroOrden } = useParams();
  const [detalleServicio, setDetalleServicio] = useState(null);
  const [editando, setEditando] = useState(false);
  const [formulario, setFormulario] = useState({
    NumeroOrden: '',
    CICliente: '',
    TipoEquipo: '',
    Modelo: '',
    TrabajoARealizar: '',
    TipoServicio: '',
    FechaRecibido: '',
    FechaFinalizado: '',
    Tecnico: '',
    PrecioReparacion:'',
    IdEstado:'',
    Nota:''
   
  });
 
  useEffect(() => {
    const fetchDetalleServicio = async () => {
      try {
        const response = await axios.get(`https://rpm-tecno-web-api-dev.azurewebsites.net/api/servicio/${NumeroOrden}`);
        setDetalleServicio(response.data);
        // También actualiza el estado del formulario con los datos del cliente
        setFormulario(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error al obtener los detalles del servicio', error);
      }
    };
 
    if (NumeroOrden) {
      fetchDetalleServicio();
    }
  }, [NumeroOrden]);
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prevFormulario) => ({
      ...prevFormulario,
      [name]: value,
    }));
  };
 
  const handleEditarClick = () => {
    setEditando(true);
  };
 
  const handleGuardarClick = async () => {
    try {
      // Realiza la solicitud para actualizar los datos del cliente en el servidor
      await axios.put(`https://rpm-tecno-web-api-dev.azurewebsites.net/api/servicio/ActualizarDetalles/${NumeroOrden}`, formulario);
      setEditando(false);
      window.location.href = '/servicios';
      console.log('Servicio actualizado correctamente');
      window.alert('Servicio actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar los detalles del servicio', error);
    }
  };
  
  return(
    <>
      
      {detalleServicio ? (
        <Container>
          <Typography variant='h4' sx={{mb:2}}>Detalles Orden</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>          
          <TextField
            label="Número de Orden"
            name="NumeroOrden"
            value={formulario.NumeroOrden}
            onChange={handleInputChange}
            disabled={true}
            sx={{ mb: 2, mr:3 }}
            fullWidth
          />
          
          
          <TextField
            label="Cliente"
            name="CICliente"
            value={formulario.CICliente}
            onChange={handleInputChange}
            disabled={!editando}
            sx={{ mb: 2, mr:3 }}
            fullWidth
          />
          
          <TextField
            label="Tipo de Equipo"
            name="TipoEquipo"
            value={formulario.TipoEquipo}
            onChange={handleInputChange}
            disabled={!editando}
            sx={{ mb: 2, mr:3 }}
            fullWidth
          />
         
          <TextField
            label="Modelo"
            name="Modelo"
            value={formulario.Modelo}
            onChange={handleInputChange}
            disabled={!editando}
            sx={{ mb: 2 }}
            fullWidth
          />
          
          <TextField
            label="Trabajo a realizar"
            name="TrabajoARealizar"
            value={formulario.TrabajoARealizar}
            onChange={handleInputChange}
            disabled={!editando}
            sx={{ mb: 2 }}
            fullWidth
          />
          
          </Grid>
          <Grid item xs={12} sm={6}>
          
          <TextField
            label="Tipo de Servicio"
            name="TipoServicio"
            value={formulario.TipoServicio}
            onChange={handleInputChange}
            disabled={!editando}
            sx={{ mb: 2, mr:3 }} 
            fullWidth           
          />
          
          <TextField
            label="Fecha Recibido"
            name="FechaRecibido"
            value={formulario.FechaRecibido}
            onChange={handleInputChange}
            disabled={!editando}
            sx={{ mb: 2, mr:3 }}
            fullWidth
          />
          
          <TextField
            label="Técnico"
            name="Tecnico"
            value={formulario.Tecnico}
            onChange={handleInputChange}
            disabled={!editando}
            sx={{ mb: 2, mr:3 }}
            fullWidth
          />
        
          <TextField
            label="Precio"
            name="PrecioReparacion"
            value={formulario.PrecioReparacion}
            onChange={handleInputChange}
            disabled={!editando}
            sx={{ mb: 2}}
            fullWidth
          />
         
          <TextField
            label="Nota"
            name="Nota"
            value={formulario.Nota}
            onChange={handleInputChange}
            disabled={!editando}
            sx={{ mb: 2}}
            fullWidth
          />
         
          </Grid>
          </Grid>
 
          {editando ? (
            <Button variant="contained" onClick={handleGuardarClick}>
              Guardar
            </Button>
          ) : (
            <Button variant="contained" onClick={handleEditarClick}>
              Editar
            </Button>
          )}
        </Container>
      ) : (
        <p>Cargando detalles del servicio...</p>
      )}
    
                {/* <Box sx={styleModal}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                    Detalles de la Órden
                  </Typography>
                  {servicioSeleccionado && (
                    <div>
                      <TextField label='Numero de Orden' defaultValue={servicioSeleccionado.NumeroOrden} size="small" variant="standard" sx={{ mr: 20, mb: 2 }} />
                      <TextField label='Cliente' defaultValue={servicioSeleccionado.CICliente} size="small" variant="standard" sx={{ mb: 2 }} />
                      <TextField label='Tipo de Equipo' defaultValue={servicioSeleccionado.TipoEquipo} size="small" variant="standard" sx={{ mr: 20, mb: 2 }} />
                      <TextField label='Modelo' defaultValue={servicioSeleccionado.Modelo} size="small" variant="standard" sx={{ mb: 2 }} />
                      <TextField label='Trabajo a Realizar' defaultValue={servicioSeleccionado.TrabajoARealizar} size="small" variant="standard" sx={{ mr: 20 }} />
                      <TextField label='Tipo de Servicio' defaultValue={servicioSeleccionado.TipoServicio && tiposServicios.find((tiposervicio) => tiposervicio.IdTipoServicio === servicioSeleccionado.TipoServicio)?.NombreServicio} size="small" variant="standard" sx={{ mb: 2 }} />
                      <TextField label='Fecha Recibido' defaultValue={servicioSeleccionado.FechaRecibido} size="small" variant="standard" sx={{ mr: 20, mb: 2 }} />
                      <TextField label='Fecha Finalizado' defaultValue={servicioSeleccionado.FechaFinalizado} size="small" variant="standard" sx={{ mb: 2 }} />
                      <TextField label='Tecnico' defaultValue={servicioSeleccionado.Tecnico && tecnicos.find((empleado) => empleado.IdEmpleado === servicioSeleccionado.Tecnico)?.NombreEmpleado} size="small" variant="standard" sx={{ mr: 20, mb: 2 }} />
                      <TextField label='Precio: $' defaultValue={servicioSeleccionado.PrecioReparacion} size="small" variant="standard" sx={{ mb: 2 }} />
                      <TextField label='Estado' defaultValue={servicioSeleccionado.IdEstado && estados.find((estado) => estado.IdEstado === servicioSeleccionado.IdEstado)?.Estado} size="small" variant="standard" sx={{ mr: 20, mb: 2 }} />
                    </div>
                  )}
                </Box> */}
              

    </>
  )
}