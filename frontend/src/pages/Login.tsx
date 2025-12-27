import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { HiMail, HiLockClosed, HiShieldCheck } from 'react-icons/hi';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password:  '',
  });

  // Error state
  const [error, setError] = useState('');
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e. target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (error) setError('');
  };

  // Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError('');

    try {
      await login(formData. email, formData.password);
      navigate('/dashboard');
    } catch (err:  any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container min-h-screen flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
      
      <div className="relative w-full max-w-md">
        <div className="card p-8">
          
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center cyber-glow">
              <HiShieldCheck className="w-10 h-10 text-black" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-center mb-2">
            <span className="text-gradient">Welcome Back</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Login to access your security dashboard
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email field */}
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              icon={<HiMail className="w-5 h-5" />}
              required
            />

            {/* Password field */}
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData. password}
              onChange={handleChange}
              placeholder="Enter your password"
              icon={<HiLockClosed className="w-5 h-5" />}
              required
            />

            {/* Forgot password link */}
            <div className="text-right -mt-4">
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary hover:text-primary-dark transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Error message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}

            {/* Submit button */}
            <Button type="submit" variant="primary" isLoading={isLoading} className="w-full">
              Login
            </Button>
          </form>

          {/* Signup link */}
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-6">
            Don't have an account? {' '}
            <Link to="/signup" className="text-primary hover:text-primary-dark font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}