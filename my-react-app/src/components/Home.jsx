import React, { useState, useEffect } from "react";
import appFirebase from "../credenciales";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, push, set, onValue, remove, update } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import Notifications from "./Notifications";
import Chat from "./Chat";
import logo from "../assets/logo.png";
import "./Home.css";
import "./chat.css";

const database = getDatabase(appFirebase);
const auth = getAuth(appFirebase);
const storage = getStorage(appFirebase);

const Home = () => {
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [file, setFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [editProductImageUrl, setEditProductImageUrl] = useState("");
  const [filter, setFilter] = useState("");

  const user = auth.currentUser;

  const handleInputChange1 = (e) => {
    setInputValue1(e.target.value);
  };

  const handleInputChange2 = (e) => {
    setInputValue2(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const saveData = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }

    const newDocRef = push(ref(database, "products"));
    const storageReference = storageRef(storage, `products/${newDocRef.key}/${file.name}`);

    uploadBytes(storageReference, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        set(newDocRef, {
          productName: inputValue1,
          productDescription: inputValue2,
          imageUrl: downloadURL,
          userId: user.uid,
          status: "pending"
        }).then(() => {
          alert("Data saved successfully");
          fetchProducts();
        }).catch((error) => {
          alert("Error: " + error.message);
        });
      });
    }).catch((error) => {
      alert("Error uploading image: " + error.message);
    });
  };

  const updateProduct = async () => {
    const productRef = ref(database, `products/${editProductId}`);
    let imageUrl = editProductImageUrl;

    if (file) {
      const storageReference = storageRef(storage, `products/${editProductId}/${file.name}`);
      const snapshot = await uploadBytes(storageReference, file);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    update(productRef, {
      productName: inputValue1,
      productDescription: inputValue2,
      imageUrl: imageUrl
    }).then(() => {
      alert("Product updated successfully");
      fetchProducts();
      setIsEditing(false);
      setEditProductId(null);
      setInputValue1("");
      setInputValue2("");
      setFile(null);
      setEditProductImageUrl("");
    }).catch((error) => {
      alert("Error: " + error.message);
    });
  };

  const fetchProducts = () => {
    const productsRef = ref(database, "products");
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const productList = [];
      for (let id in data) {
        if (data[id].status === "approved") {
          productList.push({ id, ...data[id] });
        }
      }
      setProducts(productList);
    });
  };

  const deleteProduct = (id) => {
    const productRef = ref(database, `products/${id}`);
    remove(productRef).then(() => {
      alert("Product deleted successfully");
      fetchProducts();
    }).catch((error) => {
      alert("Error: " + error.message);
    });
  };

  const editProduct = (product) => {
    setIsEditing(true);
    setEditProductId(product.id);
    setInputValue1(product.productName);
    setInputValue2(product.productDescription);
    setEditProductImageUrl(product.imageUrl);
  };

  const filterProducts = (products, filter) => {
    return products.filter((product) =>
      product.productName.toLowerCase().includes(filter.toLowerCase())
    );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <nav>
        <img src={logo} alt="Logo" className="nav-logo" />
        <h1>MARKETPLACE UV</h1>
        <Notifications userId={user.uid} />
        <button onClick={() => signOut(auth)}>Logout</button>
      </nav>
      
      <div className="container">
        
        <form>
          <label htmlFor="file-upload" className="custom-file-upload">
            Seleccionar Producto(s)
          </label>
          <input
            type="text"
            value={inputValue1}
            onChange={handleInputChange1}
            placeholder="Product Name"
          />
          <input
            type="text"
            value={inputValue2}
            onChange={handleInputChange2}
            placeholder="Product Description"
          />
          <input type="file" onChange={handleFileChange} />
          {isEditing ? (
            <button type="button" onClick={updateProduct}>
              Update Product
            </button>
          ) : (
            <button type="button" onClick={saveData}>
              Save data
            </button>
          )}
        </form>
      </div>
     
      <Chat />
      <div className="product-section">
        <h2>Product List</h2>
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filtrar productos"
          className="filter-input"
        />
        <div className="product-list">
          {filterProducts(products, filter).map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {product.imageUrl && (
                  <img src={product.imageUrl} alt={product.productName} />
                )}
              </div>
              <div className="product-info">
                <div className="product-name">{product.productName}</div>
                <div className="product-description">
                  {product.productDescription}
                </div>
                <div className="product-actions">
                  <button
                    className="edit-btn"
                    onClick={() => editProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;