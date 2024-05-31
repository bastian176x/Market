import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from './Images/Google.png';
import { useNavigate } from "react-router-dom";

import BackgroundLocal from "./Images/logo.png";
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
export default function SignInSide() {
  const navigate = useNavigate();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);

  const closeFailureModal = () => {
    setIsFailureModalOpen(false);
  };

  const [inputs, setInputs] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    name_us:"",
    contraseña: "",
    conf_contraseña: "",
    df: "",
    agno: "",
    dia: "",
    mes: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/", inputs);
      if (res.status === 200) {
        setIsSuccessModalOpen(true);
      }
    } catch (err) {
      setIsFailureModalOpen(true);
    }
  };
  const handleLogin = () => {
    navigate("/login"); // Redirigir a la ruta de registro
  };
  
  return (
    <ThemeProvider theme={defaultTheme}>


      <Grid container component="main" sx={{ backgroundColor: "#043C5C", justifyContent: "center", }}>
    
        
        <CssBaseline />
      
        
        <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square sx={{ width: "80%",
          height: "90%",
          borderRadius: "15px", backgroundColor: "rgba(255,255,255,0.3)", justifyContent: "center", }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${BackgroundLocal})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        />
            <Dialog open={isSuccessModalOpen} onClose={closeSuccessModal}>
              <DialogContent>
                <Typography variant="h6">¡Usuario registrado!</Typography>
                <Typography variant="body1">
                  Has registrado correctamente a {inputs.nombre_completo}.
                </Typography>
              </DialogContent>
            </Dialog>
            <Dialog open={isFailureModalOpen} onClose={closeFailureModal}>
              <DialogContent>
                <Typography variant="h6">Usuario no registrado</Typography>
                <Typography variant="body1">
                  El usuario {inputs.nombre_completo} ya está registrado, o
                  ocurrió un error.
                </Typography>
              </DialogContent>
            </Dialog>

            <Typography component="h1" variant="h4" sx={{mb: "10px", color: "#FFFFFF"}}>
              Crear Cuenta 
            </Typography>
            <Typography component="h2" variant="h5" sx={{color: "#FFFFFF"}}>
              Ingrese sus datos 
            </Typography>
            <Typography component="h4" variant="h7" sx={{color: "#FFFFFF"}}>
              Ya tienes cuenta? 
               <Button variant="text" onClick={handleLogin} sx={{color:"#12707F"}}>iniciar sesion</Button>
            </Typography>

           

            
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt:  1 ,color: "#FFFFFF"}}
            >
              <TextField
                margin="normal"
                required
                id="nombres"
                label="Nombres"
                name="nombres"
                autoComplete="username"
                autoFocus
                sx={{'& .MuiInputBase-input': {
                  color: "#FFFFFF", // Color del texto ingresado
                },
                '& .MuiInputLabel-root': {
                  color: "#FFFFFF", // Color del label cuando no está enfocado
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: "#FFFFFF", // Color del label cuando está enfocado
                },
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: "#FFFFFF", // Color del borde cuando no está enfocado
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: "#FFFFFF", // Color del borde cuando está enfocado
                },}}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                name="apellido"
                label="Apellidos"
                type="apellidos"
                id="apellidos"
                sx={{'& .MuiInputBase-input': {
                  color: "#FFFFFF", // Color del texto ingresado
                },
                '& .MuiInputLabel-root': {
                  color: "#FFFFFF", // Color del label cuando no está enfocado
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: "#FFFFFF", // Color del label cuando está enfocado
                },
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: "#FFFFFF", // Color del borde cuando no está enfocado
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: "#FFFFFF", // Color del borde cuando está enfocado
                },}}
                onChange={handleChange}
              />
                <TextField
                margin="normal"
                required
                fullWidth
                name="name_us"
                label="Nombre de usuario"
                type="name_us"
                id="name_us"
                sx={{'& .MuiInputBase-input': {
                  color: "#FFFFFF", // Color del texto ingresado
                },
                '& .MuiInputLabel-root': {
                  color: "#FFFFFF", // Color del label cuando no está enfocado
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: "#FFFFFF", // Color del label cuando está enfocado
                },
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: "#FFFFFF", // Color del borde cuando no está enfocado
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: "#FFFFFF", // Color del borde cuando está enfocado
                },}}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="correo"
                label="Ingrese su correo"
                type="text"
                id="correo"
                sx={{'& .MuiInputBase-input': {
                  color: "#FFFFFF", // Color del texto ingresado
                },
                '& .MuiInputLabel-root': {
                  color: "#FFFFFF", // Color del label cuando no está enfocado
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: "#FFFFFF", // Color del label cuando está enfocado
                },
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: "#FFFFFF", // Color del borde cuando no está enfocado
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: "#FFFFFF", // Color del borde cuando está enfocado
                },}}
                onChange={handleChange}
              />
             <TextField
              margin="normal"
              required
              fullWidth
              name="contraseña"
              label = "Crear Contraseña"
              type = "password"
              id = "contraseña"
              sx={{'& .MuiInputBase-input': {
                color: "#FFFFFF", // Color del texto ingresado
              },
              '& .MuiInputLabel-root': {
                color: "#FFFFFF", // Color del label cuando no está enfocado
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: "#FFFFFF", // Color del label cuando está enfocado
              },
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                borderColor: "#FFFFFF", // Color del borde cuando no está enfocado
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: "#FFFFFF", // Color del borde cuando está enfocado
              },}}
              onChange={handleChange}
              />
              <TextField
              margin="normal"
              required
              fullWidth
              name="conf_contraseña:"
              label = "Confimar Contraseña"
              type="password"
              id="conf_contraseña"
              sx={{'& .MuiInputBase-input': {
                color: "#FFFFFF", // Color del texto ingresado
              },
              '& .MuiInputLabel-root': {
                color: "#FFFFFF", // Color del label cuando no está enfocado
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: "#FFFFFF", // Color del label cuando está enfocado
              },
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                borderColor: "#FFFFFF", // Color del borde cuando no está enfocado
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: "#FFFFFF", // Color del borde cuando está enfocado
              },}}
              onChange={handleChange}
              />

              <Box>
              <Typography component="h3" variant="h6" sx={{mb: "2px"}}>
              Año de nacimiento:
            </Typography>
                <Grid container spacing={2}>
                  {" "}
                  {/* Wrapper Grid container */}
              
                  <Grid item xs={4}>
                    {" "}
                    {/* Second Grid item */}
                    <InputLabel id="mes"></InputLabel>
                    <Select
                      labelId="mes"
                      id="mes"
                      label="mes"
                      name="mes"
                      value={inputs.categoria}
                      onChange={handleChange}
                      fullWidth
                      sx={{ mt: 2 ,'& .MuiInputBase-input': {
                        color: "#FFFFFF", // Color del texto ingresado
                      },
                      '& .MuiInputLabel-root': {
                        color: "#FFFFFF", // Color del label cuando no está enfocado
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: "#FFFFFF", // Color del label cuando está enfocado
                      },
                      '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#FFFFFF", // Color del borde cuando no está enfocado
                      },
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#FFFFFF", // Color del borde cuando está enfocado
                      },}}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Enero"}>Enero</MenuItem>
                      <MenuItem value={"Febrero"}>Febrero</MenuItem>
                      <MenuItem value={"Marzo"}>Marzo</MenuItem>
                      <MenuItem value={"Abril"}>Abril</MenuItem>
                      <MenuItem value={"Mayo"}>Mayo</MenuItem>
                      <MenuItem value={"Junio"}>Junio</MenuItem>
                      <MenuItem value={"Julio"}>Julio</MenuItem>
                      <MenuItem value={"Agosto"}>Agosto</MenuItem>
                      <MenuItem value={"Septiembre"}>Septiembre</MenuItem>
                      <MenuItem value={"Octubre"}>Octubre</MenuItem>
                      <MenuItem value={"Noviembre"}>Noviembre</MenuItem>
                      <MenuItem value={"Diciembre"}>Diciembre</MenuItem>
                    </Select>
                     </Grid>
              <Grid item xs={4}>
              <TextField
                margin="normal"
                required
                name="dia"
                label="Día"
                type="text"
                id="dia"
                sx={{'& .MuiInputBase-input': {
                  color: "#FFFFFF", // Color del texto ingresado
                },
                '& .MuiInputLabel-root': {
                  color: "#FFFFFF", // Color del label cuando no está enfocado
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: "#FFFFFF", // Color del label cuando está enfocado
                },
                '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                  borderColor: "#FFFFFF", // Color del borde cuando no está enfocado
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: "#FFFFFF", // Color del borde cuando está enfocado
                },}}
                onChange={handleChange}
              />
              </Grid>
              <Grid item xs={4}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="agno"
                      label="Año"
                      type="text"
                      id="agno"
                      sx={{'& .MuiInputBase-input': {
                        color: "#FFFFFF", // Color del texto ingresado
                      },
                      '& .MuiInputLabel-root': {
                        color: "#FFFFFF", // Color del label cuando no está enfocado
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: "#FFFFFF", // Color del label cuando está enfocado
                      },
                      '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#FFFFFF", // Color del borde cuando no está enfocado
                      },
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: "#FFFFFF", // Color del borde cuando está enfocado
                      },}}
                      onChange={handleChange}
                    />
                  </Grid>   
                </Grid>
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mb: 2,borderRadius: "20px"}}
              >
                Registrarse
              </Button>
              <Button
              type="submit"
                fullWidth
                variant= "contained"
                startIcon={<img src={GoogleIcon} alt="Google Icon" style={{ width: '24px', height: '24px' }} />}
                sx={{ backgroundColor: '#ffffff', color: '#000000', borderRadius: "20px",'&:hover': { backgroundColor: '#ffffff'} }}
              >
                Ingresar por Cuneta de google
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
