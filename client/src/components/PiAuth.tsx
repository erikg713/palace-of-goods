import { useAuth } from "../context/AuthContext";

const PiAuth = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <h2>Welcome, {user.username}!</h2>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={login}>Login with Pi</button>
      )}
    </div>
  );
};

export default PiAuth;
