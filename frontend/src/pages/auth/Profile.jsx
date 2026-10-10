import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mail, Phone, ShieldCheck, Ticket, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user, isAdmin } = useAuth();

  if (!user) return null;

  return (
    <div className="bg-slate-50 min-h-[85vh] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Profile Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-3xl bg-violet-600 text-white flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-violet-500/20">
            {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
          </div>

          <div className="space-y-1 text-center sm:text-left flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-2xl font-bold text-slate-900">{user.fullName}</h1>
              <span className={`inline-block text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${
                isAdmin ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-violet-100 text-violet-800 border border-violet-200'
              }`}>
                {isAdmin ? 'System Administrator' : 'Registered User'}
              </span>
            </div>
            <p className="text-xs text-slate-500">Account ID: <span className="font-mono text-slate-700">{user.id}</span></p>
          </div>

          <Link
            to="/my-bookings"
            className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all"
          >
            <Ticket className="w-4 h-4" />
            My Bookings
          </Link>
        </div>

        {/* Account Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Information</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-violet-600" />
                <span className="text-slate-800 font-medium">{user.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span className="text-slate-800 font-medium">{user.phone || 'Not provided'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Security & Status</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-slate-800 font-medium">Account Active & Verified</span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-violet-600" />
                <span className="text-slate-800 font-medium">Member Since: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '2026'}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;

