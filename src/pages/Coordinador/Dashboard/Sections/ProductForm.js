import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

function ProductForm({ onSubmit }) {
  const [currentItem, setCurrentItem] = useState({ name: "", imageUrl: "", userName: "", price: "" });

  const handleChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(currentItem);
    setCurrentItem({ name: "", imageUrl: "", userName: "", price: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Nombre del producto"
        value={currentItem.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="imageUrl"
        label="URL de la imagen"
        value={currentItem.imageUrl}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="userName"
        label="Nombre de usuario"
        value={currentItem.userName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="price"
        label="Precio"
        value={currentItem.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">Agregar Producto</Button>
    </form>
  );
}

export default ProductForm;