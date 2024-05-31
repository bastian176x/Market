import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Sidebar from "../../../../components/Navbar/Navbar";
import ProductList from "./ProductList"; // Importa el componente ProductList


function Dashboard() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({ name: "", imageUrl: "", userName: "", price: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setItems([...items, currentItem]);
    setCurrentItem({ name: "", imageUrl: "", userName: "", price: "" });
  };


  const handleEdit = (index) => {
    setCurrentItem(items[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filteredItems = items.filter((_, i) => i !== index);
    setItems(filteredItems);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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
          <Typography variant="h2">Explorar</Typography>
          
          <Box sx={{ mt: 4, width: '100%' }}>
            <Typography variant="h4">Lista de Productos</Typography>
            <ProductList items={items} handleEdit={handleEdit} handleDelete={handleDelete} />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;