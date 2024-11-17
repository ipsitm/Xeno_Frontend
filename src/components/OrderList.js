// src/components/OrderList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/orders`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [API_URL]);

  return (
    <div>
      <h1>Order List</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Order ID: {order._id}, Amount: {order.amount}, Date:{" "}
            {new Date(order.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
