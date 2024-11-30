import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {Paper, Table, TableBody, TableContainer, TableHead, TableRow, Button,OutlinedInput, InputAdornment, Typography, IconButton, Container} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const ListaEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [tecnicoBuscado, setTecnicoBuscado] = useState('');

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

  const buscador = (e) => {
    setTecnicoBuscado(e.target.value)
    console.log(e)
  }

  const handleDelete = (IdEmpleado) => {
    if (window.confirm("¿Seguro que deseas eliminar este registro?")) {
      axios
        .delete(`https://rpm-tecno-web-api-dev.azurewebsites.net/api/empleado/${IdEmpleado}`)
        .then((response) => {
          console.log("Registro eliminado con éxito.");
          setEmpleados(empleados.filter(empleado => empleado.IdEmpleado !== IdEmpleado));
        })
        .catch((error) => {
          console.error("Error al eliminar el registro:", error);
        });
    }
  };

  //Metodo de filtrado
    let resultado = []
    if(!tecnicoBuscado){
        resultado = empleados
    } else{
        resultado = empleados.filter((dato) =>
        dato.IdEmpleado.toString().includes(tecnicoBuscado) ||
        dato.NombreEmpleado.toLowerCase().includes(tecnicoBuscado.toLocaleLowerCase())
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

  return (
    <TableContainer component={Paper}>
      <Container>
    <Typography variant='h4' sx={{ mb: 2 }}>Listado de Técnicos</Typography>
    <Button href='/formularioEmpleado' variant="contained" color="success" startIcon={<AddCircleOutlineIcon />} size="small" sx={{ mb: 2 }}>Añadir</Button>
    <OutlinedInput value={tecnicoBuscado} onChange={buscador} placeholder="Buscar..."  sx={{mb:4}} fullWidth size="small"
    startAdornment={
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    }/>
    </Container> 
 <Table size="small">
    <TableHead >
        <TableRow >
          <StyledTableCell>ID Tecnico</StyledTableCell>
          <StyledTableCell>Nombre</StyledTableCell>
          <StyledTableCell>Acciones</StyledTableCell>            
        </TableRow>
      </TableHead>
      <TableBody>
        {resultado.map(tecnico => (
          <StyledTableRow key={tecnico.IdEmpleado}>
            <StyledTableCell >{tecnico.IdEmpleado}</StyledTableCell >
            <StyledTableCell >{tecnico.NombreEmpleado}</StyledTableCell >
            <StyledTableCell ><IconButton onClick={() => handleDelete(tecnico.IdEmpleado)}>
                    <DeleteIcon />
                  </IconButton></StyledTableCell>
            
          </StyledTableRow>
        ))}
      </TableBody>
    </Table >
    </TableContainer>
  );
}

export default ListaEmpleados;
