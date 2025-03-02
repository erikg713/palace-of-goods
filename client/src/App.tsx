import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";

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

// Components
import Navbar from "./components/Navbar";
import PiAuth from "./components/PiAuth";
import PiPayment from "./components/PiPayment";

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

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
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><AdminOrders /></ProtectedRoute>} />

          {/* Pi Network DApp Section Inside Dashboard */}
          <Route path="/dashboard/pi" element={
            <ProtectedRoute>
              <div>
                <h1>Pi Network DApp</h1>
                <PiAuth />
                <PiPayment />
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
