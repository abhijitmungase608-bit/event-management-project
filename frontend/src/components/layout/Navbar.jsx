import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Calendar, User, LogOut, LayoutDashboard, Ticket, Menu, X, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl btn-violet flex items-center justify-center shadow-md shadow-violet-500/20 group-hover:scale-105 transition-transform duration-300">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1">
                Event<span className="gradient-text-violet">Sphere</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold -mt-1">
                Management & Booking
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Home', path: '/' },
              { label: 'Explore Events', path: '/events' },
              { label: 'About Us', path: '/about' },
              { label: 'Contact', path: '/contact' },
            ].map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-semibold transition-all relative py-1 ${
                    active ? 'text-violet-600 font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-all shadow-xs"
                  >
                    <LayoutDashboard className="w-4 h-4 text-amber-600" />
                    Admin Panel
                  </Link>
                )}
                
                <Link
                  to="/my-bookings"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-all shadow-xs"
                >
                  <Ticket className="w-4 h-4 text-violet-600" />
                  My Bookings
                </Link>

                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-all shadow-xs"
                  title="Profile"
                >
                  <div className="w-5 h-5 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-[10px] font-bold border border-violet-200">
                    {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span>{user.fullName ? user.fullName.split(' ')[0] : 'Account'}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all border border-transparent"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-4 py-2 rounded-xl transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-violet text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-violet-500/20"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 text-sm font-semibold"
          >
            Home
          </Link>
          <Link
            to="/events"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 text-sm font-semibold"
          >
            Explore Events
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 text-sm font-semibold"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 text-sm font-semibold"
          >
            Contact
          </Link>

          {user ? (
            <div className="pt-4 border-t border-slate-200 space-y-2">
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-amber-800 bg-amber-50 font-bold text-sm border border-amber-200"
                >
                  Admin Panel
                </Link>
              )}
              <Link
                to="/my-bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 text-sm font-semibold"
              >
                My Bookings
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 text-sm font-semibold"
              >
                My Profile ({user.fullName})
              </Link>
              <button
                onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                className="w-full text-left px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 text-sm font-semibold"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-3 rounded-xl text-slate-700 bg-slate-100 border border-slate-200 font-semibold text-sm"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-3 rounded-xl text-white btn-violet font-semibold text-sm"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
