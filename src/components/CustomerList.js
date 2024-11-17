import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerList = () => {
  const [customers, setCustomers] = useState([
    { _id: "1", name: "John Doe", email: "john.doe@example.com" },
    { _id: "2", name: "Jane Smith", email: "jane.smith@example.com" },
    { _id: "3", name: "Samuel Johnson", email: "samuel.johnson@example.com" },
    { _id: "4", name: "Emily Davis", email: "emily.davis@example.com" },
  ]);
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "" });
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/customers`);
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    // Uncomment the next line to enable API fetching
    //fetchCustomers();
  }, [API_URL]);

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email) {
      alert("Please fill in both name and email.");
      return;
    }

    const newCustomerData = {
      ...newCustomer,
      _id: (customers.length + 1).toString(), // Generate a unique ID for demo purposes
    };

    setCustomers((prevCustomers) => [...prevCustomers, newCustomerData]);
    setNewCustomer({ name: "", email: "" }); // Clear the form
  };

  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#f4f6f8",
      minHeight: "100vh",
      fontFamily: "'Arial', sans-serif",
    },
    header: {
      fontSize: "2rem",
      marginBottom: "20px",
      color: "#333",
      textAlign: "center",
    },
    form: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "20px",
      gap: "10px",
    },
    input: {
      padding: "10px",
      fontSize: "1rem",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    button: {
      padding: "10px 20px",
      fontSize: "1rem",
      borderRadius: "5px",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    listContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
    },
    card: {
      backgroundColor: "#fff",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      padding: "15px",
      borderRadius: "10px",
      border: "1px solid #e0e0e0",
      transition: "transform 0.2s",
    },
    cardHover: {
      transform: "scale(1.02)",
    },
    cardTitle: {
      fontSize: "1.2rem",
      marginBottom: "10px",
      color: "#333",
      fontWeight: "bold",
    },
    cardText: {
      fontSize: "1rem",
      color: "#555",
    },
    emptyMessage: {
      textAlign: "center",
      fontSize: "1.2rem",
      color: "#777",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Customer List</h1>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={newCustomer.name}
          onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={newCustomer.email}
          onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
          style={styles.input}
        />
        <button
          style={styles.button}
          onClick={handleAddCustomer}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
        >
          Add Customer
        </button>
      </div>
      {customers.length === 0 ? (
        <p style={styles.emptyMessage}>No customers available.</p>
      ) : (
        <div style={styles.listContainer}>
          {customers.map((customer) => (
            <div
              key={customer._id}
              style={styles.card}
              onMouseOver={(e) => (e.currentTarget.style.transform = styles.cardHover.transform)}
              onMouseOut={(e) => (e.currentTarget.style.transform = "none")}
            >
              <div style={styles.cardTitle}>{customer.name}</div>
              <div style={styles.cardText}>{customer.email}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerList;
