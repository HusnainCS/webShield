import { Link } from 'react-router-dom';
import SignupForm from '../components/auth/SignupFrom';
import { FaShieldAlt } from 'react-icons/fa';

const Signup = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-6">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-cyber-grid bg-[size:50px_50px] opacity-10"></div>

      {/* Signup Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-secondary/80 backdrop-blur-md cyber-border rounded-lg p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <FaShieldAlt className="text-primary text-6xl cyber-glow" />
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-primary to-green-300 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Join webShield and start securing websites
          </p>

          {/* Signup Form */}
          <SignupForm />

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;