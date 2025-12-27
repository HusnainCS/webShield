import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { HiSun, HiMoon, HiMenu, HiX } from 'react-icons/hi';
import { useState } from 'react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '#services' },
    { name:  'About', path: '#about' },
    { name: 'Contact', path: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-md border-b border-light-border dark:border-dark-border">
      <div className="content-wrapper">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center cyber-glow">
              <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2. 166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gradient">WebShield</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-4">
            
            {/* Theme toggle button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-light-bg dark:bg-dark-bg hover:bg-primary/10 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <HiMoon className="w-5 h-5 text-gray-700 dark: text-gray-300" />
              ) : (
                <HiSun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* Auth buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login">
                <button className="btn-secondary px-5 py-2">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="btn-primary px-5 py-2">
                  Sign Up
                </button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(! mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-primary/10"
            >
              {mobileMenuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md: hidden py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-3 border-t border-light-border dark:border-dark-border">
              <Link to="/login">
                <button className="btn-secondary w-full">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn-primary w-full">Sign Up</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}