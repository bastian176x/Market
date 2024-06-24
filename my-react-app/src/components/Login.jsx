import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoAzul from "../assets/logoazul.png"; // Importa la imagen correctamente
import appFirebase from "../credenciales";
import "./estilo.css"; // Asegúrate de que los estilos se aplican correctamente

const auth = getAuth(appFirebase);
const database = getDatabase(appFirebase);

const Login = () => {
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();

  const funcAuthentication = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const password = e.target.password.value;

    if (register) {
      try {
        await createUserWithEmailAndPassword(auth, correo, password);
        navigate("/home"); // Redirigir a Home después del registro
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, correo, password);
        navigate("/home"); // Redirigir a Home después del inicio de sesión
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const name = user.displayName;
        const email = user.email;
        const photoUrl = user.photoURL;

        set(ref(database, `users/${user.uid}`), {
          name: name,
          email: email,
          photoUrl: photoUrl,
        })
          .then(() => {
            console.log("Data saved successfully!");
            navigate("/home"); // Redirigir a Home después del inicio de sesión con Google
          })
          .catch((error) => {
            console.error("Failed to save data", error);
          });
      })
      .catch((error) => {
        console.error("Error with Google sign in", error);
      });
  };

  return (
    <div className="container">
      <div className="welcome-banner">
        <img src={logoAzul} alt="Universidad de Valparaíso" />
        <h1>Bienvenido a marketplace UV</h1>
      </div>
      <div className="form-container">
        <form onSubmit={funcAuthentication}>
          <input type="text" placeholder="Ingresar email" id="email" />
          <input
            type="password"
            placeholder="Ingresar contraseña"
            id="password"
          />
          <button type="submit">
            {register ? "Regístrate" : "Inicia sesión"}
          </button>
          <div className="toggle-form">
            {register ? "Si ya tienes cuenta" : "No tienes cuenta"}
            <button type="button" onClick={() => setRegister(!register)}>
              {register ? "Inicia sesión" : "Regístrate"}
            </button>
          </div>
          <button
            type="button"
            className="google-signin-btn"
            onClick={signInWithGoogle}
          >
            Login con Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;