import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {Paper, Table, TableBody, TableContainer, TableHead, TableRow, Button,OutlinedInput, InputAdornment, Typography, IconButton, Container} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const ListaTipoServicios = () => {
  const [tipoServicios, setTipoServicios] = useState([]);
  const [tipoBuscado, setTipoBuscado] = useState('');

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

  const buscador = (e) => {
    setTipoBuscado(e.target.value)
    console.log(e)
  }

  const handleDelete = (IdTipoServicio) => {
    if (window.confirm("¿Seguro que deseas eliminar este registro?")) {
      axios
        .delete(`https://rpm-tecno-web-api-dev.azurewebsites.net/api/tiposervicio/${IdTipoServicio}`)
        .then((response) => {
          console.log("Registro eliminado con éxito.");
          setTipoServicios(tipoServicios.filter(tipo => tipo.IdTipoServicio !== IdTipoServicio));
        })
        .catch((error) => {
          console.error("Error al eliminar el registro:", error);
        });
    }
  };

  //Metodo de filtrado
    let resultado = []
    if(!tipoBuscado){
        resultado = tipoServicios
    } else{
        resultado = tipoServicios.filter((dato) =>
        dato.IdTipoServicio.toString().includes(tipoBuscado) ||
        dato.NombreServicio.toLowerCase().includes(tipoBuscado.toLocaleLowerCase())
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
    <Typography variant='h4' sx={{ mb: 2 }}>Listado de Servicios</Typography>
    <Button href='/formularioTipoServicio' variant="contained" color="success" startIcon={<AddCircleOutlineIcon />} size="small" sx={{ mb: 2 }}>Añadir</Button>
    <OutlinedInput value={tipoBuscado} onChange={buscador} placeholder="Buscar..."  sx={{mb:4}} fullWidth size="small"
    startAdornment={
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    }/>
    </Container> 
 <Table size="small">
    <TableHead >
        <TableRow >
          <StyledTableCell>ID Tipo Servicio</StyledTableCell>
          <StyledTableCell>Nombre Servicio</StyledTableCell>
          <StyledTableCell>Acciones</StyledTableCell>            
        </TableRow>
      </TableHead>
      <TableBody>
        {resultado.map(tipo => (
          <StyledTableRow key={tipo.IdTipoServicio}>
            <StyledTableCell >{tipo.IdTipoServicio}</StyledTableCell >
            <StyledTableCell >{tipo.NombreServicio}</StyledTableCell >
            <StyledTableCell ><IconButton onClick={() => handleDelete(tipo.IdTipoServicio)}>
                    <DeleteIcon />
                  </IconButton></StyledTableCell>
            
          </StyledTableRow>
        ))}
      </TableBody>
    </Table >
    </TableContainer>
  );
}

export default ListaTipoServicios;
