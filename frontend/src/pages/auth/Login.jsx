import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/manage-images';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login(email, password);
      toast.success(`Welcome ${user.fullName}! Logged in successfully.`);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-slate-50 flex items-center justify-center py-8 sm:py-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-5 sm:space-y-6 border border-slate-200 shadow-2xl">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <img 
            src="/logo.png" 
            alt="APG Event Decorators" 
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full mx-auto border-2 border-amber-500 shadow-md bg-black object-cover"
          />
          <h2 className="text-xl sm:text-2xl font-black font-serif text-slate-900 tracking-tight">
            Admin Login
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Sign in to access admin panel and manage website images
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="apg123@gmail.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 active:scale-95 text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all disabled:opacity-50 touch-manipulation"
          >
            <span>{loading ? 'Verifying...' : 'Sign In as Admin'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center">
          <Link to="/" className="text-xs text-amber-700 hover:underline font-semibold py-1 inline-block">
            ← Return to Website
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
