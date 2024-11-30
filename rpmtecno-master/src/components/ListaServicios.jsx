import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Box, Button, Container, Grid, IconButton, InputAdornment, MenuItem, Modal, OutlinedInput, Paper, Select, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PrintIcon from '@mui/icons-material/Print';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




export default function ListaServicios() {
  const [servicios, setServicios] = useState([]);
  const [estados, setEstados] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [tiposServicios, setTiposServicios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [ordenBuscado, setOrdenBuscado] = useState('');
  const [tipoServicioFiltrado, setTipoServicioFiltrado] = useState('');
  const [fechaRecibidoFiltrado, setFechaRecibidoFiltrado] = useState('');
  const [estadoFiltrado, setEstadoFiltrado] = useState('');
  const [tecnicoFiltrado, setTecnicoFiltrado] = useState('');
  const [numeroCliente, setNumeroCliente] = useState('');
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null)
  const [bloquearEstado, setBloquearEstado] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openDialogo, setOpenDialogo] = React.useState(false);
  const handleOpenDialogo = () => setOpenDialogo(true);

 
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://rpm-tecno-web-api-dev.azurewebsites.net/api/servicio');
        setServicios(response.data);
        console.log(response.data);

        const estadosResponse = await axios.get('https://rpm-tecno-web-api-dev.azurewebsites.net/api/estadoservicio');
        setEstados(estadosResponse.data);

        const tiposSResponse = await axios.get('https://rpm-tecno-web-api-dev.azurewebsites.net/api/tiposervicio');
        setTiposServicios(tiposSResponse.data);

        const tecnicosResponse = await axios.get('https://rpm-tecno-web-api-dev.azurewebsites.net/api/empleado');
        setTecnicos(tecnicosResponse.data);
        

        const clientesResponse = await axios.get('https://rpm-tecno-web-api-dev.azurewebsites.net/api/cliente');
        setClientes(clientesResponse.data);

      } catch (error) {
        console.error('Error al obtener la lista de servicios y estados', error);
      }
    };

    fetchData();
  }, []);

  const buscador = (e) => {
    setOrdenBuscado(e.target.value)
    console.log(e)
  }

  const filtroTipoServicio = (e) => {
    setTipoServicioFiltrado(e.target.value);
  };

  const filtroFechaRecibido = (e) => {
    setFechaRecibidoFiltrado(e.target.value);
  };

  const filtroEstado = (e) => {
    setEstadoFiltrado(e.target.value);
  };

  const filtroTecnico = (e) => {
    setTecnicoFiltrado(e.target.value);
  };

  //Metodos de filtrado
  let resultado = []

  const handleCloseDialogoCancelar =  ()  => {
    setOpenDialogo(false);
    
  }

  const handleEditEstado = async (id,CICliente,nuevoEstado) => {
    try {
      const data = {
        NumeroOrden: id,
        IdEstado: nuevoEstado,
        FechaFinalizado: ' '
      };
      
      await axios.put(`https://rpm-tecno-web-api-dev.azurewebsites.net/api/servicio/ModificarEstado/${id}`, data);
      
      setServicios((prevServicios) => {
        return prevServicios.map((servicio) =>
          servicio.NumeroOrden === id
            ? { ...servicio, IdEstado: nuevoEstado }
            : servicio
        );
      });
  
      if (nuevoEstado === 4) {
        const numCli = clientes.find((ci) => ci.CI === CICliente)?.Telefono;
        handleOpenDialogo(numCli);
        setNumeroCliente(numCli);
        setBloquearEstado(true); // Aquí establece el bloqueo del estado
      } 
      console.log(bloquearEstado);
      console.log(nuevoEstado);
    } catch (error) {
      console.error('Error al guardar el estado:', error);
    }
  };
  
  
  const handleCloseDialogo = () => {
    

    setOpenDialogo(false);  
    // Verifica si el número de teléfono del cliente está disponible
    if (numeroCliente) {
      // Construye el enlace de WhatsApp con el número del cliente
      const enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${numeroCliente}&text=${encodeURIComponent('Hola, su reparación está finalizada, puede retirar en la sucursal.')}`;
            // const enlaceWhatsApp = `https://api.whatsapp.com/send?phone=${(numeroCliente)}&text=Hola,%20vengo%20de%20su%20sitio%20web`;
            console.log(enlaceWhatsApp);
            console.log(numeroCliente);
            
      // Redirige al usuario al enlace de WhatsApp
      window.open(enlaceWhatsApp, '_blank');
    } else {
      console.error('Número de teléfono del cliente no disponible.');
    }


  };

  if (!ordenBuscado) {
    resultado = servicios
  } else {
    resultado = servicios.filter((dato) =>
      dato.NumeroOrden.toString().includes(ordenBuscado) ||
      dato.CICliente.toString().includes(ordenBuscado)

    )
  }

  if (tipoServicioFiltrado) {
    resultado = resultado.filter((dato) => dato.TipoServicio && tiposServicios.find((tipo) => tipo.IdTipoServicio === dato.TipoServicio)?.NombreServicio === tipoServicioFiltrado);
  }

  if (fechaRecibidoFiltrado) {
    resultado = resultado.filter((dato) => dato.FechaRecibido === fechaRecibidoFiltrado);
  }

  if (estadoFiltrado) {
    resultado = resultado.filter((dato) => dato.IdEstado && estados.find((estado) => estado.IdEstado === dato.IdEstado)?.Estado === estadoFiltrado);
  }

  if (tecnicoFiltrado) {
    resultado = resultado.filter((dato) => dato.Tecnico && tecnicos.find((tecnico) => tecnico.IdEmpleado === dato.Tecnico)?.NombreEmpleado === tecnicoFiltrado);
  }

  const handleDelete = (NumeroOrden) => {
    if (window.confirm("¿Seguro que deseas eliminar este registro?")) {
      axios
        .delete(`https://rpm-tecno-web-api-dev.azurewebsites.net/api/servicio/${NumeroOrden}`)
        .then((response) => {
          console.log("Registro eliminado con éxito.");
          setServicios(servicios.filter(servicio => servicio.NumeroOrden !== NumeroOrden));
        })
        .catch((error) => {
          console.error("Error al eliminar el registro:", error);
        });
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },

    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const mostrarDetallesServicio = (servicio) => {
    setServicioSeleccionado(servicio);
    handleOpen(); 
  };

  const editarServicio = (servicio) => {
 
    console.log('Mostrar detalles del servicio:', servicio);
  };

  const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

  const handlePrint = (servicio) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Nº Orden ' + servicio.NumeroOrden + '</title></head><body>');
  
    // Agrega aquí el contenido que deseas imprimir
  
    // Inicio de la tabla
    printWindow.document.write('<table style="width:100%;"><tr>');
  
    // Columna izquierda
    printWindow.document.write('<td style="width:50%;">');
    printWindow.document.write('<h3 style="color:grey; margin-top:35px;">ORDEN DE REPARACIÓN</h3>');
    printWindow.document.write('<div style="color:grey; font-size: 13px;">NÚMERO DE ORDEN</div>');
    printWindow.document.write('<div># ' + servicio.NumeroOrden + '</div>'); 
    printWindow.document.write('</td>');
  
    // Columna derecha
    printWindow.document.write('<td style="width:50%;">');
    printWindow.document.write('<div><img style="margin-right:60px" src="https://rpmtecno.myshopify.com/cdn/shop/files/logo-removebg-preview_d1e6665f-a2fd-4aab-b2d1-186ce040273e.png?v=1697052363&width=100" alt="Logo" /><div style="margin-top:5px;display:inline;position: absolute;"> ' + formattedDate + '</div></div>');
    printWindow.document.write('</td>');
  
    // Cierre de la tabla
    printWindow.document.write('</tr></table>');
    printWindow.document.write('<hr style="border: 2px solid #ccc;">');

  
    // Resto del contenido
    printWindow.document.write('<div style="color:grey;font-size: 13px; margin-top:15px;">CLIENTE:  <span style="color:black">' + servicio.CICliente + '</span> </div> ');
    printWindow.document.write('<div style="color:grey;font-size: 13px; margin-top:15px;">FECHA DE ENTREGA: <span style="color:black">' + servicio.FechaRecibido + '</span> </div> ');
    printWindow.document.write('<div style="color:grey;font-size: 13px; margin-top:15px;">EQUIPO A REPARAR: <span style="color:black">' + servicio.TipoEquipo + '</span> </div> ');
    printWindow.document.write('<div style="color:grey;font-size: 13px; margin-top:15px;">DESCRIPCIÓN FALLA: <span style="color:black">' + servicio.TrabajoARealizar + '</span> </div> ');
    printWindow.document.write('<div style="color:grey;font-size: 13px; margin-top:15px;">PRESUPUESTO: <span style="color:black">$ ' + servicio.PrecioReparacion + '</span> </div> ');
    printWindow.document.write('<p>Consultá el estado de tu reparación a través de nuestra web: rpmtecno.uy</p>');
    printWindow.document.write('<h2 style="margin-top:200px">INFORMACIÓN ADICIONAL (CELULARES)</h2>');
    printWindow.document.write('<div><img style="margin-right:60px" src="https://i.blogs.es/3c7257/patrondesbloqueo-1/450_1000.webp" alt="Logo" /></div>');
    printWindow.document.write('<p>PIN:</p>');
    printWindow.document.write('<p>CONTRASEÑA:</p>');


    // Cierre del documento
    printWindow.document.write('</body></html>');
    printWindow.document.close(); 
    printWindow.print();
  };


  return (
    <TableContainer component={Paper}>
      <Container>
        <Typography variant='h4' sx={{ mb: 2 }}>Listado de Reparaciones</Typography>
        <Button href='/formularioOrden' variant="contained" color="success" startIcon={<AddCircleOutlineIcon />} size="small" sx={{ mb: 2 }}>Añadir</Button>
        <OutlinedInput value={ordenBuscado} onChange={buscador} placeholder="Buscar..." sx={{ mb: 2 }} fullWidth size="small"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          } />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              sx={{ mb: 4 }}
              label='Tipo de Reparación'
              type="text"
              name="NombreServicio"
              size="small"
              fullWidth
              select
              value={tipoServicioFiltrado}
              onChange={filtroTipoServicio}
            >
              <MenuItem>
                Todos
              </MenuItem>
              {tiposServicios.map(tipo => (
    <MenuItem key={tipo.NombreServicio} value={tipo.NombreServicio}>
      {tipo.NombreServicio}
    </MenuItem>
  ))}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              sx={{ mb: 4 }}
              label='Estado'
              type="text"
              name="IdEstado"
              size="small"
              fullWidth
              select
              value={estadoFiltrado}
              onChange={filtroEstado}
            >
              <MenuItem>
                Todos
              </MenuItem>
              <MenuItem value='Ingresado'>
                Ingresado
              </MenuItem>
              <MenuItem value='En Proceso de Reparación'>
                En Proceso de Reparación
              </MenuItem>
              <MenuItem value='Esperando Repuesto'>
                Esperando Repuesto
              </MenuItem>
              <MenuItem value='Reparación Finalizada'>
                Reparación Finalizada
              </MenuItem>
              <MenuItem value='Reparación Cancelada'>
                Reparación Cancelada
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={3}>
          <TextField
  sx={{ mb: 4 }}
  label='Técnico'
  type="text"
  name="Tecnico"
  size="small"
  fullWidth
  select
  value={tecnicoFiltrado}
  onChange={filtroTecnico}
>
  <MenuItem value="">
    Todos
  </MenuItem>
  {tecnicos.map(tecnico => (
    <MenuItem key={tecnico.NombreEmpleado} value={tecnico.NombreEmpleado}>
      {tecnico.NombreEmpleado}
    </MenuItem>
  ))}
</TextField>
            
          </Grid>
          <Grid item xs={3}>
            <TextField
              sx={{ mb: 2 }}
              label='Fecha de Entrega'
              type="date"
              name="fechaRecibido"
              value={fechaRecibidoFiltrado}
              onChange={filtroFechaRecibido}
              fullWidth
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>

      </Container>

      <Table size="small">
        <TableHead >
          <TableRow >
            <StyledTableCell>Número de Orden</StyledTableCell>
            <StyledTableCell>Cliente</StyledTableCell>
            <StyledTableCell>Trabajo a Realizar</StyledTableCell>
            <StyledTableCell>Fecha Recibido</StyledTableCell>
            <StyledTableCell>Técnico</StyledTableCell>
            <StyledTableCell>Tipo Servicio</StyledTableCell>
            <StyledTableCell>Estado</StyledTableCell>
            <StyledTableCell>Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resultado.map(servicio => (
            <StyledTableRow key={servicio.NumeroOrden}>
              <StyledTableCell >{servicio.NumeroOrden}</StyledTableCell >
              <StyledTableCell >{servicio.CICliente}</StyledTableCell >
              <StyledTableCell >{servicio.TrabajoARealizar}</StyledTableCell >
              <StyledTableCell >{servicio.FechaRecibido}</StyledTableCell >
              <StyledTableCell >{servicio.Tecnico && tecnicos.find((empleado) => empleado.IdEmpleado === servicio.Tecnico)?.NombreEmpleado}</StyledTableCell >
              <StyledTableCell >{servicio.TipoServicio && tiposServicios.find((tiposervicio) => tiposervicio.IdTipoServicio === servicio.TipoServicio)?.NombreServicio}</StyledTableCell >


              <StyledTableCell>
                <Select size="small" variant="standard"
                  value={servicio.IdEstado}
                  onChange={(e) => handleEditEstado(servicio.NumeroOrden,servicio.CICliente, e.target.value)}
                  disabled={servicio.IdEstado == 4}
                >
                  {estados.map((estado) => (
                    <MenuItem key={estado.IdEstado} value={estado.IdEstado}>
                      {estado.Estado}
                    </MenuItem>
                  ))}
                </Select>
              </StyledTableCell>
              <StyledTableCell>
                <Box>
                  <IconButton onClick={() => mostrarDetallesServicio(servicio)}>
                    <SearchIcon sx={{ paddingRight: '2px' }} />
                  </IconButton>
                  <Link to={`/detalleServicio/${servicio.NumeroOrden}`}>
                  <IconButton>                 
                    <EditIcon onClick={() => editarServicio(servicio)} sx={{ paddingRight: '2px' }} />
                  </IconButton>
                </Link>
                <IconButton onClick={() => handlePrint(servicio)}>
                    <PrintIcon />
                  </IconButton>                 
                  <IconButton onClick={() => handleDelete(servicio.NumeroOrden)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </StyledTableCell>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                BackdropProps={{ invisible: true }}
              >
                <Box sx={styleModal}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                    Detalles de la Orden
                  </Typography>
                  {servicioSeleccionado && (
                    <div>
                      <TextField label='Número de Orden' defaultValue={servicioSeleccionado.NumeroOrden} size="small" variant="standard" InputProps={{
            readOnly: true,
          }} sx={{ mr: 20, mb: 2 }} />
                      <TextField label='Cliente' defaultValue={servicioSeleccionado.CICliente} size="small" variant="standard" InputProps={{
            readOnly: true,
          }} sx={{ mb: 2 }} />
                      <TextField label='Tipo de Equipo' defaultValue={servicioSeleccionado.TipoEquipo} size="small" variant="standard" InputProps={{
            readOnly: true,
          }} sx={{ mr: 20, mb: 2 }} />
                      <TextField label='Modelo' defaultValue={servicioSeleccionado.Modelo} size="small" variant="standard" InputProps={{
            readOnly: true,
          }} sx={{ mb: 2 }} />
                      <TextField label='Trabajo a Realizar' defaultValue={servicioSeleccionado.TrabajoARealizar} size="small" variant="standard" InputProps={{
            readOnly: true,
          }} sx={{ mr: 20 }} />
                      <TextField label='Tipo de Servicio' defaultValue={servicioSeleccionado.TipoServicio && tiposServicios.find((tiposervicio) => tiposervicio.IdTipoServicio === servicioSeleccionado.TipoServicio)?.NombreServicio} size="small" variant="standard" InputProps={{
            readOnly: true,
          }} sx={{ mb: 2 }} />
                      <TextField label='Fecha Recibido' defaultValue={servicioSeleccionado.FechaRecibido} size="small" variant="standard" InputProps={{
            readOnly: true,
          }} sx={{ mr: 20, mb: 2 }} />
                      <TextField label='Fecha Finalizado' defaultValue={servicioSeleccionado.FechaFinalizado} size="small" variant="standard" InputProps={{
            readOnly: true,
          }} sx={{ mb: 2 }} />
                      <TextField label='Tecnico' defaultValue={servicioSeleccionado.Tecnico && tecnicos.find((empleado) => empleado.IdEmpleado === servicioSeleccionado.Tecnico)?.NombreEmpleado} size="small" variant="standard" InputProps={{
            readOnly: true,
          }} sx={{ mr: 20, mb: 2 }} />
                      <TextField label='Presupuesto: $' defaultValue={servicioSeleccionado.PrecioReparacion} size="small" variant="standard" InputProps={{
            readOnly: true,
          }} sx={{ mb: 2 }} />
                      <TextField label='Estado' defaultValue={servicioSeleccionado.IdEstado && estados.find((estado) => estado.IdEstado === servicioSeleccionado.IdEstado)?.Estado} size="small" variant="standard" InputProps={{
            readOnly: true,
          }} sx={{ mr: 20, mb: 2 }} />
                    </div>
                  )}
                </Box>
              </Modal>
              <Dialog
        open={openDialogo}
        onClose={handleCloseDialogo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"La reparación se finalizó, ¿desea enviar mensaje de confirmación?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Se redirigirá a Whatsapp para enviar mensaje de aviso
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogoCancelar}>Cancelar</Button>
          <Link to={`/detalleGarantia`}>
          <Button onClick={handleCloseDialogo}>
            Confirmar
          </Button>
          </Link>
        </DialogActions>
      </Dialog>
            </StyledTableRow >
          ))}
        </TableBody>
      </Table >
    </TableContainer>
  );
}
