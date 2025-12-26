import { Link, useNavigate } from 'react-router-dom';
import { FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-secondary/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <FaShieldAlt className="text-primary text-3xl group-hover:cyber-glow-strong transition-all" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-green-300 bg-clip-text text-transparent">
              webShield
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            <Link
              to="/about-tools"
              className="text-gray-300 hover:text-primary transition-colors duration-300"
            >
              About Tools
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover: text-primary transition-colors duration-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover: text-primary transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-primary text-black font-semibold rounded-md hover:cyber-glow-strong transition-all duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;