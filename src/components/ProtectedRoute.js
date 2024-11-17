import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });
    return unsubscribe; // Cleanup subscription
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loader while checking authentication
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
