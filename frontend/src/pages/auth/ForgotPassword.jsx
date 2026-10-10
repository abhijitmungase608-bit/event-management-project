import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Info, ArrowLeft, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Password reset instructions generated!');
  };

  return (
    <div className="min-h-[75vh] bg-slate-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 space-y-6 border border-slate-200 shadow-xl">
        
        <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors font-medium">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
        </Link>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Reset Password</h2>
          <p className="text-xs text-slate-500">Enter your registered email address</p>
        </div>

        {/* Informational Note */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold block text-amber-900">Academic Service Note:</span>
            <span className="text-amber-800">
              In this environment, email dispatch is disabled to avoid committing SMTP credentials. In production, an encrypted password reset token is emailed to the user.
            </span>
          </div>
        </div>

        {submitted ? (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-3">
            <p className="text-sm text-emerald-600 font-semibold">Reset Request Received</p>
            <p className="text-xs text-slate-600">
              If an account with email <b>{email}</b> exists, a password reset link has been prepared.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs text-violet-600 hover:underline font-semibold"
            >
              Try another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2 text-sm transition-all"
            >
              <Send className="w-4 h-4" />
              Request Password Reset
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

