import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Palace of Goods
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          Cart
        </Button>
        <Button color="inherit" component={Link} to="/dashboard">
  Dashboard
</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@mui/material";

const Navbar = ({ user }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Palace of Goods
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {user && (
          <>
            <Button color="inherit" component={Link} to="/dashboard">
              Dashboard
            </Button>
            <Avatar src={`https://your-backend-url.com${user.profile_pic}`} alt="Profile" />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Palace of Goods
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
            <Avatar src={`https://your-backend-url.com${user.profile_pic}`} alt="Profile" />
            <Button color="inherit" onClick={logout}>Logout</Button>
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
