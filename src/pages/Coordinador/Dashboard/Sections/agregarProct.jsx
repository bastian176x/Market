import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Sidebar from "../../../../components/Navbar/Navbar";
import ProductList from "./ProductList"; // Importa el componente ProductList
import ProductForm from "./ProductForm"; // Importa el componente ProductForm

function AddProductPage() {
  const [items, setItems] = useState([]);

  const handleAdd = (newItem) => {
    setItems([...items, newItem]);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh",  }}>
        <Sidebar />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", 
            alignItems: "center",
          }}
        >
          <Typography variant="h2">Agregar Producto</Typography>
          <ProductForm onSubmit={handleAdd} />
          {/* Renderiza ProductList para mostrar la lista de productos */}
          <Box mt={4} width="100%">
            <Typography variant="h4">Lista de Productos</Typography>
            <ProductList items={items} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AddProductPage;
