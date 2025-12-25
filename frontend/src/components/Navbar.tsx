import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("loggedIn");

  const logout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <div className="flex gap-4 p-4 bg-gray-200">
      <Link to="/">Dashboard</Link>
      {!loggedIn && <Link to="/signup">Signup</Link>}
      {!loggedIn && <Link to="/login">Login</Link>}
      {loggedIn && <button onClick={logout}>Logout</button>}
    </div>
  );
};

export default Navbar;
