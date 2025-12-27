import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { HiSun, HiMoon, HiMenu, HiX, HiUser, HiLogout } from 'react-icons/hi';
import { useState } from 'react';

export default function AuthNavbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-md border-b border-light-border dark:border-dark-border">
      <div className="content-wrapper">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center cyber-glow">
              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2. 166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gradient">WebShield</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/dashboard" 
              className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/scan/start" 
              className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
            >
              Start Scan
            </Link>
            <Link 
              to="/history" 
              className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
            >
              History
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-4">
            
            {/* Theme toggle button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-light-bg dark:bg-dark-bg hover:bg-primary/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <HiMoon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <HiSun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* Profile dropdown - FIXED */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover: bg-light-bg dark:hover:bg-dark-bg transition-colors"
              >
                {/* Avatar circle with first letter */}
                <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-bold text-sm">
                    {user?.username. charAt(0).toUpperCase()}
                  </span>
                </div>
                
                {/* Username text - FIXED COLOR */}
                <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                  {user?.username}
                </span>
                
                {/* Dropdown arrow - FIXED COLOR */}
                <svg 
                  className={`w-4 h-4 text-gray-900 dark:text-gray-300 transition-transform ${profileMenuOpen ?  'rotate-180' : ''}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Dropdown menu */}
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 card p-2 shadow-xl">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition-colors text-gray-900 dark:text-gray-300"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    <HiUser className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
                  >
                    <HiLogout className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(! mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-primary/10"
            >
              {mobileMenuOpen ? (
                <HiX className="w-6 h-6 text-gray-900 dark:text-gray-300" />
              ) : (
                <HiMenu className="w-6 h-6 text-gray-900 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-light-border dark:border-dark-border">
            {/* User info in mobile */}
            <div className="flex items-center gap-3 px-2 py-2 mb-3 border-b border-light-border dark:border-dark-border">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-black font-bold">
                  {user?.username. charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{user?.username}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
              </div>
            </div>
            
            <Link
              to="/dashboard"
              className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/scan/start"
              className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Start Scan
            </Link>
            <Link
              to="/history"
              className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              History
            </Link>
            <Link
              to="/profile"
              className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left py-2 text-red-500 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}