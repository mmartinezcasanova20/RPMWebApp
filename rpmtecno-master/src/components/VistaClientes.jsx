import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Box, Button, Container, Grid, InputAdornment, Modal, OutlinedInput, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function VistaClientes() {
    const [servicios, setServicios] = useState([]);
    const [estados, setEstados] = useState([]);
    const [tecnicos, setTecnicos] = useState([]);
    const [tiposServicios, setTiposServicios] = useState([]);
    const [ordenBuscado, setOrdenBuscado] = useState('');
    const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://rpm-tecno-web-api-dev.azurewebsites.net/api/servicio');
                setServicios(response.data);

                const estadosResponse = await axios.get('https://rpm-tecno-web-api-dev.azurewebsites.net/api/estadoservicio');
                setEstados(estadosResponse.data);

                const tiposSResponse = await axios.get('https://rpm-tecno-web-api-dev.azurewebsites.net/api/tiposervicio');
                setTiposServicios(tiposSResponse.data);

                const tecnicosResponse = await axios.get('https://rpm-tecno-web-api-dev.azurewebsites.net/api/empleado');
                setTecnicos(tecnicosResponse.data);
            } catch (error) {
                console.error('Error al obtener la lista de servicios y estados', error);
            }
        };

        fetchData();
    }, []);

    const buscarServicio = (input) => {
        return servicios.find(servicio => servicio.NumeroOrden.toString() === input);
    };

    const handleBuscarClick = () => {
        const servicio = buscarServicio(ordenBuscado);
        if (servicio) {
            setServicioSeleccionado(servicio);
            setOpen(true);
            setError(false);
        } else {
            setServicioSeleccionado(null);
            setOpen(false);
            setError(true);
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

    return (
        <>
            <Container>
                <Box>
                    <Typography variant='h4' sx={{ mb: 1, mt: 15, textAlign: 'center' }}>Consultá tu reparación</Typography>
                    <Typography variant='h4' sx={{ mb: 2, textAlign: 'center', fontSize: 15 }}>Consulte aquí el estado de su reparación, ingresando su número de orden.</Typography>
                </Box>
                <Grid container spacing={5} sx={{mt:4}}>
                    <Grid item xs={12} sm={6}>
                        <Typography>Número de orden</Typography>          
                <TextField value={ordenBuscado} onChange={(e) => setOrdenBuscado(e.target.value)} placeholder="Buscar..." sx={{ mb: 2 }} fullWidth size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    helperText={error ? 'No se encontró ninguna reparación con el número de orden especificado' : ''} 
                    error={error} />
                <Button onClick={handleBuscarClick} variant="contained" sx={{ mt:1 }}>
                    Buscar
                </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant='h5'>¿Cómo saber mi número de orden?</Typography>
                    <Typography>Tu número de orden aparece en el comprobante de reparación como en la siguiente imagen:</Typography>
                    <img src="./numeroOrden.png" alt="numero orden" />
                </Grid>
                </Grid>
            </Container>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                        Detalles de la Reparación
                    </Typography>
                    {servicioSeleccionado && (
                        <div>
                            <TextField label='Numero de Orden' defaultValue={servicioSeleccionado.NumeroOrden} size="small" variant="standard" InputProps={{
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
                            <TextField label='Presupuesto: $' defaultValue={servicioSeleccionado.PrecioReparacion} size="small" variant="standard" InputProps={{
                                readOnly: true,
                            }} sx={{ mr: 20,mb: 2 }} />
                            <TextField label='Estado' defaultValue={servicioSeleccionado.IdEstado && estados.find((estado) => estado.IdEstado === servicioSeleccionado.IdEstado)?.Estado} size="small" variant="standard" InputProps={{
                                readOnly: true,
                            }} sx={{ mb: 2 }} />
                        </div>
                    )}
                </Box>
            </Modal>
        </>
    );
}
