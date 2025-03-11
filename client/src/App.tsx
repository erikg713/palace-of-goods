import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import PrivateAdminRoute from "./components/PrivateAdminRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import AdminOrders from "./pages/AdminOrders";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/AdminDashboard";
import PiAuth from "./components/PiAuth";
import PiPayment from "./components/PiPayment";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="/admin/orders" element={<PrivateAdminRoute><AdminOrders /></PrivateAdminRoute>} />

          {/* Pi Network DApp Inside Dashboard */}
          <Route path="/dashboard/pi" element={
            <PrivateRoute>
              <div>
                <h1>Pi Network DApp</h1>
                <PiAuth />
                <PiPayment />
              </div>
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
