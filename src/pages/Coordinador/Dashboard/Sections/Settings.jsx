import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Sidebar from "../../../../components/Navbar/Navbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login"); // Redirigir a la ruta de registro
  };

  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, flex: 1 }}>
          <h1>Ajustes y estadísticas</h1>
          <Typography paragraph>Panel de control y estadísticas</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 3,
            borderTop: "1px solid #ddd", // Añadir una línea superior para separar visualmente
          }}
        >
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{
              backgroundColor: "#12707F",
              padding: "1.5rem",
              fontSize: "0.8rem",
              borderRadius: "25px",
              width: "50%",
              "&:hover": {
                backgroundColor: "#12707F",
              },
            }}
          >
            salir
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Settings;