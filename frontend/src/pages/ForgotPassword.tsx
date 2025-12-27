import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { HiMail, HiShieldCheck } from 'react-icons/hi';
import { validateEmail } from '../utils/validation';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    // Simulate API call (implement backend later)
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="page-container min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
      
      <div className="relative w-full max-w-md">
        <div className="card p-8">
          
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center cyber-glow">
              <HiShieldCheck className="w-10 h-10 text-black" />
            </div>
          </div>

          {! success ? (
            <>
              {/* Title */}
              <h2 className="text-3xl font-bold text-center mb-2">
                <span className="text-gradient">Forgot Password</span>
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                Enter your email to reset your password
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  icon={<HiMail className="w-5 h-5" />}
                  error={error}
                  required
                />

                <Button type="submit" variant="primary" isLoading={loading} className="w-full">
                  Send Reset Link
                </Button>
              </form>

              {/* Back to login */}
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-6">
                Remember your password? {' '}
                <Link to="/login" className="text-primary hover:text-primary-dark font-semibold">
                  Login
                </Link>
              </p>
            </>
          ) : (
            <>
              {/* Success message */}
              <div className="text-center">
                <div className="text-6xl mb-4">📧</div>
                <h2 className="text-2xl font-bold mb-2 text-gradient">Check Your Email</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  We've sent a password reset link to <span className="font-semibold">{email}</span>
                </p>
                <Link to="/login">
                  <Button variant="primary" className="w-full">
                    Back to Login
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}