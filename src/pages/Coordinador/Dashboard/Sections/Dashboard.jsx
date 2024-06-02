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
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#E3FFFE", mt: 2 }}>
        <Sidebar />
        
          <Typography variant="h2" sx={{textAlign:"center"}}>Bienvenidos a MarketPlaceUV!</Typography>
          <Typography variant="body1" sx={{textAlign:"center"}}>Aquí encontrarás productos de estudiantes de la Universidad Valparaíso, tanto 
          de la sede central como de la sede de Santiago</Typography>
          
          
          <Box sx={{ mt: 4, width: '100%' }}>
            <Typography variant="h4">Productos publicados</Typography>
            <ProductList items={items} handleEdit={handleEdit} handleDelete={handleDelete} />
          </Box>
        
      </Box>
    </>
  );
}

export default Dashboard;