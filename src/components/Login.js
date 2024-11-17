// components/Login.js
import React from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User:", result.user);
      navigate("/dashboard"); // Redirect after login
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f4f6f8",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      fontSize: "2rem",
      marginBottom: "20px",
      color: "#333",
    },
    button: {
      padding: "10px 20px",
      fontSize: "1rem",
      backgroundColor: "#4285F4",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#3367D6",
    },
    footer: {
      marginTop: "20px",
      fontSize: "0.9rem",
      color: "#777",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to Xeno CRM</h1>
      <button
        style={styles.button}
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        onClick={handleGoogleLogin}
      >
        Sign in with Google
      </button>
      <div style={styles.footer}>
        <p>By signing in, you agree to our terms and conditions.</p>
      </div>
    </div>
  );
};

export default Login;
