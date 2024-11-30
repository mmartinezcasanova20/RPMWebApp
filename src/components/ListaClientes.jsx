import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {Paper, Table, TableBody, TableContainer, TableHead, TableRow, Button,OutlinedInput, InputAdornment, Typography, Container} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function Clientes() {

const [clientes, setClientes] = useState([]);
const [clienteBuscado, setclienteBuscado] = useState('');

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


  const buscador = (e) => {
    setclienteBuscado(e.target.value)
    console.log(e)
  }

  //Metodo de filtrado
    let resultado = []
    if(!clienteBuscado){
        resultado = clientes
    } else{
        resultado = clientes.filter((dato) =>
        dato.CI.toString().includes(clienteBuscado) ||
        dato.Nombre.toLowerCase().includes(clienteBuscado.toLocaleLowerCase()) ||
        dato.Apellido.toLowerCase().includes(clienteBuscado.toLowerCase())  ||
        dato.Telefono.toLowerCase().includes(clienteBuscado.toLowerCase())
        )
    }

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

    return(
        
        <TableContainer component={Paper}>
          <Container>
      <Typography variant='h4' sx={{ mb: 2 }}>Listado de Clientes</Typography>
      <Button href='/formularioCliente' variant="contained" color="success" startIcon={<AddCircleOutlineIcon />} size="small" sx={{ mb: 2 }}>Añadir</Button>
      <OutlinedInput value={clienteBuscado} onChange={buscador} placeholder="Buscar..."  sx={{mb:4}} fullWidth size="small"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }/>    
      </Container>
   <Table size="small">
      <TableHead >
          <TableRow >
            <StyledTableCell>Cédula</StyledTableCell>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell>Apellido</StyledTableCell>
            <StyledTableCell>Teléfono</StyledTableCell>
            <StyledTableCell>E-mail</StyledTableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {resultado.map(cliente => (
            <StyledTableRow key={cliente.CI}>
              <StyledTableCell >{cliente.CI}</StyledTableCell >
              <StyledTableCell >{cliente.Nombre}</StyledTableCell >
              <StyledTableCell >{cliente.Apellido}</StyledTableCell >
              <StyledTableCell >{cliente.Telefono}</StyledTableCell >
              <StyledTableCell >{cliente.Mail}</StyledTableCell >
            </StyledTableRow>
          ))}
        </TableBody>
      </Table >
      </TableContainer>
       
    )
}
