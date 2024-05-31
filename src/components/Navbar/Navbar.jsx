import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import logo from "./image/logo.png"
import { Avatar } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import NotificationsIcon from "@mui/icons-material/Notifications";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


const AppBar = styled(MuiAppBar)(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: '100%',
  zIndex: theme.zIndex.drawer + 1,
}));

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));




export default function ButtonAppBar() {
  const navigate = useNavigate();


  return (
    <Box sx={{ display: 'flex',  }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ backgroundColor:"#043C5C"}}>
        <Toolbar>
          <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1 , display: 'flex', alignItems: 'center'}}>
            
          <Box
            component="img"
            src={logo} // Usa la imagen importada
            alt="Logo"
            
            sx={{ mr: 5, width: 120, height: 60 }} // Ajusta el tamaño de la imagen
          />
          MARKETPLACE UV
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Buscar..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: 1,
              marginRight: 2,
              width: '30%', // Ajusta el ancho del campo de texto
            }}
          />
          <Button
            color="inherit"
            onClick={() => navigate("/coord/practicas")}
          >
            Home
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/coord/practicas/agregarProct")}
          >
            agregar producto
          </Button>
          <Button
            color="inherit"
            startIcon={<NotificationsIcon />}
            onClick={() => navigate("/coord/practicas/cartas")}
          >
          </Button>
       
          <Button
            color="inherit"
            startIcon={<Avatar />}
            onClick={() => navigate("/coord/practicas/settings")}
          >
          </Button>
        </Toolbar>
      </AppBar>
      <Main>
       
      </Main>
    </Box>
  );
}