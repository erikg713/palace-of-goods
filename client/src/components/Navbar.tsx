import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#333" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Palace of Goods
        </Typography>

        <Button color="inherit" component={Link} to="/">Home</Button>

        {user ? (
          <>
            <Button color="inherit" component={Link} to="/cart">Cart</Button>
            <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
            <Avatar 
              src={user.profile_pic ? `https://your-backend-url.com${user.profile_pic}` : "/default-avatar.png"} 
              alt="Profile" 
              sx={{ marginLeft: 1, width: 32, height: 32 }}
            />
            <Button color="inherit" onClick={logout} sx={{ marginLeft: 2 }}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/signup">Signup</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PiAuth from "./PiAuth";

const Navbar: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav>
      <h1>Palace of Goods</h1>
      {user ? <p>Welcome, {user.username}!</p> : <PiAuth />}
    </nav>
  );
};

export default Navbar;
