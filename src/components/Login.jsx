import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Box, Paper,Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';


const LoginForm = () => {
  const [CI, setCI] = useState('');
  const [password, setPassword] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [showPassword, setShowPassword] = React.useState(false);
  const { login } = useAuth(); 
  const navigate = useNavigate();
  const [errorLogin,setErrorLogin] = useState(false);



  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://rpm-tecno-web-api-dev.azurewebsites.net/api/usuario');
        setUsuarios(response.data);
        const listaUsuario = response.data;
        console.log('ListaUsuarios', listaUsuario);
        console.log(usuarios);
        
      } catch (error) {
        console.error('Error al obtener la lista de usuarios', error);
      }
    };

    fetchData();
  }, []); 

  // Manejar cambios en los campos de usuario y contraseña
  const handleCIChange = (event) => {
    setCI(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    // Realiza la solicitud para actualizar los datos del cliente en el servidor
    const response = await axios.get(`https://rpm-tecno-web-api-dev.azurewebsites.net/api/usuario/${CI}`);
    const usuario = response.data;
    console.log('Usuario.CI:', usuario.CI);
    console.log('Usuario.Pass:', usuario.Pass);
    console.log('Usuario', usuario);

    // Verifica si el usuario existe y si la contraseña coincide
    if (usuario.CI == CI && usuario.Pass == password) {
      console.log('Inicio de sesión exitoso');
      // Realiza la redirección a la página de clientes
      // Aquí podrías usar un enrutador de React en lugar de window.location.href
      // para mantener la navegación dentro de la aplicación
      login();
        // Puedes almacenar el token u otra información de autenticación aquí
        // localStorage.setItem('token', 'token_value');
        navigate('/clientes');
    } else {
      setErrorLogin(true);
      console.log('Cédula o contraseña incorrectas');
      console.log('Valor almacenado en usuario.Pass:', usuario.Pass);
      console.log('Valor ingresado en el formulario:', password);
      console.log('Tipo de dato usuario.Pass:', typeof usuario.Pass);
      console.log('Tipo de dato password:', typeof password);
      // Muestra un mensaje de error o realiza acciones adicionales en caso de credenciales incorrectas
    }
  } catch (error) {
    console.error('Error al obtener el usuario', error);
    // Muestra un mensaje de error o realiza acciones adicionales en caso de error de solicitud
  }
}


 

  return (
    <form onSubmit={handleSubmit}>
    <Grid container justifyContent="center" alignItems="center" height="80vh" >
    <Box component={Paper} elevation={11}  sx={{ width: 250, maxWidth: '100%', height: 350,textAlign: 'center', p:2}}
            autoComplete="off"
        >
    
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb:4,mt:2 }}>
            <img src="./logo.png" className='logo'  href='/' />
          </Box>
    <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
          <InputLabel htmlFor="CI">Usuario</InputLabel>
          <OutlinedInput
          type="int"
            id="CI"
            name="CI"
            value={CI}
            onChange={handleCIChange}
            error={errorLogin}
            required
            label="Cédula"
            
          />
        </FormControl>       
      
          <FormControl sx={{ mb: 1 }} variant="outlined">
          <TextField
  fullWidth
  id="password"
  name="password"
  label="Contraseña"
  type={showPassword ? 'text' : 'password'}
  value={password}
  onChange={handlePasswordChange}
  autoComplete="current-password"
  sx={{ mb: 2 }}
  variant="outlined"
  helperText={errorLogin ? 'Usuario y/o contraseña incorrectos, verifique' : ''}
  error={errorLogin}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  }}
/>
        </FormControl>
      
      <Button
      fullWidth
      variant="contained"
      type="submit"
      sx={{bgcolor:'black'}}
               >
                Ingresar
            </Button>
        {/* <button type="submit">Iniciar sesión</button> */}
         
    
    </Box>
    </Grid>
    </form>
  );
};

export default LoginForm;
