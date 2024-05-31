import React, { useState, useEffect } from "react";
import Sidebar from "../../../../components/Navbar/Navbar";
import Tablapostulaciones from "./Tables/Solicitudes";
import Tablaevaluaciones from "./Tables/Tablaevaluaciones";
import { Box, Card, CardContent, CardMedia, CardActions, Typography, IconButton, Button } from "@mui/material";
import { Favorite, FavoriteBorder, Chat, Delete, Edit } from "@mui/icons-material";

function ProductList({ items, handleEdit, handleDelete }) {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: 2, 
      backgroundColor: "rgba(255,255,255,0.3)", 
      p: 2, // Padding inside the container
      borderRadius: 1 // Rounded corners
    }}>
      {items.map((item, index) => (
        <Card key={index} sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image={item.imageUrl}
            alt={item.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Usuario: {item.userName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Precio: {item.price}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={() => { /* Manejar favoritos */ }}>
              {item.isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <Button>Hablar con el Vendedor</Button>
            <IconButton onClick={() => handleEdit(index)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDelete(index)}>
              <Delete />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

export default ProductList;