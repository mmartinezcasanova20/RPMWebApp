import * as React from 'react';
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import { useAuth} from './AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




export default function Navbar() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();
  

  const handleButtonClick = () => {
    if (isAuthenticated) {
      logout();
      navigate('/');
      
    } 
    
  };
  console.log("authenticated:", isAuthenticated);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <>
    <Container sx={{mb:10}}>
      <AppBar position="fixed" sx={{bgcolor:'black'}}>
      <Container>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
          <Link to="/">
        <img className="logo" src="./logo.png" alt="Logo" />
      </Link>
          </Box>
          {isAuthenticated && (
                <>
                  <Button href='/servicios' sx={{
              color: "white",
              gap: 0.5,
              borderColor: 'black',
              borderStyle: 'solid',
              borderWidth: 2,
              borderRadius: 5,
              fontWeight: "bold",
              textTransform: 'none',
              '&:hover': {
                bgcolor: "black",
                borderColor: 'lime',
                borderStyle: 'solid',
                borderWidth: 2

              },
            }}>
              <SettingsOutlinedIcon />
                    Órdenes
                  </Button>
                  <Button href='/clientes' sx={{
              color: "white",
              gap: 0.5,
              borderColor: 'black',
              borderStyle: 'solid',
              borderWidth: 2,
              borderRadius: 5,
              fontWeight: "bold",
              textTransform: 'none',
              '&:hover': {
                bgcolor: "black",
                borderColor: 'lime',
                borderStyle: 'solid',
                borderWidth: 2

              },
            }}>
              <ContactPhoneOutlinedIcon />
                    Clientes
                  </Button>
                  <Button href='/listaGarantias' sx={{
              color: "white",
              gap: 0.5,
              borderColor: 'black',
              borderStyle: 'solid',
              borderWidth: 2,
              borderRadius: 5,
              fontWeight: "bold",
              textTransform: 'none',
              '&:hover': {
                bgcolor: "black",
                borderColor: 'lime',
                borderStyle: 'solid',
                borderWidth: 2

              },
            }}>
                  <SupportAgentOutlinedIcon />
                    Garantias
                  </Button>
                  <Button href='/empleados' sx={{
              color: "white",
              gap: 0.5,
              borderColor: 'black',
              borderStyle: 'solid',
              borderWidth: 2,
              borderRadius: 5,
              fontWeight: "bold",
              textTransform: 'none',
              '&:hover': {
                bgcolor: "black",
                borderColor: 'lime',
                borderStyle: 'solid',
                borderWidth: 2

              },
            }}>
                  <SupervisorAccountOutlinedIcon />
                    Técnicos
                  </Button>
                  <Button href='/tipoServicios' sx={{
              color: "white",
              gap: 0.5,
              borderColor: 'black',
              borderStyle: 'solid',
              borderWidth: 2,
              borderRadius: 5,
              fontWeight: "bold",
              textTransform: 'none',
              '&:hover': {
                bgcolor: "black",
                borderColor: 'lime',
                borderStyle: 'solid',
                borderWidth: 2

              },
            }}>
                  <ManageAccountsOutlinedIcon />
                    Servicios
                  </Button>
                  <Button href='/graficas' sx={{
              color: "white",
              gap: 0.5,
              borderColor: 'black',
              borderStyle: 'solid',
              borderWidth: 2,
              borderRadius: 5,
              fontWeight: "bold",
              textTransform: 'none',
              '&:hover': {
                bgcolor: "black",
                borderColor: 'lime',
                borderStyle: 'solid',
                borderWidth: 2

              },
            }}>
                  <BarChartOutlinedIcon />
                    Gráficas
                  </Button>
                  <Button
            sx={{
              color: "white",
              gap: 0.5,
              borderColor: 'black',
              borderStyle: 'solid',
              borderWidth: 2,
              borderRadius: 5,
              fontWeight: "bold",
              textTransform: 'none',
              '&:hover': {
                bgcolor: "black",
                borderColor: 'lime',
                borderStyle: 'solid',
                borderWidth: 2

              },
            }}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleButtonClick}>
            <AccountCircleOutlinedIcon />
            Cerrar Sesión
          </Button>        
                </>
              )}
              {!isAuthenticated && (
              <Button href='/login'
            sx={{
              color: "white",
              gap: 0.5,
              borderColor: 'black',
              borderStyle: 'solid',
              borderWidth: 2,
              borderRadius: 5,
              fontWeight: "bold",
              textTransform: 'none',
              '&:hover': {
                bgcolor: "black",
                borderColor: 'lime',
                borderStyle: 'solid',
                borderWidth: 2

              },
            }}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleButtonClick}>
            <AccountCircleOutlinedIcon />
            Ingresar
          </Button>
          )}       
        </Toolbar>
        </Container>
      </AppBar>
      </Container>
    </>
  )
}