import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AudienceSegmentForm from "./components/AudienceSegmentForm";
import CampaignHistory from "./components/CampaignHistory";
import MessageDashboard from "./components/MessageDashboard";
import CustomerList from "./components/CustomerList"; // New functionality: View customers
import OrderList from "./components/OrderList"; // New functionality: View orders
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MessageDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/segments"
          element={
            <ProtectedRoute>
              <AudienceSegmentForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/campaigns"
          element={
            <ProtectedRoute>
              <CampaignHistory />
            </ProtectedRoute>
          }
        />

        {/* New Functionality: Customers Route */}
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <CustomerList />
            </ProtectedRoute>
          }
        />

        {/* New Functionality: Orders Route */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
