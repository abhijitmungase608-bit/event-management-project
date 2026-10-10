import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Crown, LogOut, LayoutDashboard, Ticket, Menu, X, Phone, Mail, MapPin } from 'lucide-react';

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

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT', path: '/about' },
    { label: 'SERVICES', path: '/services' },
    { label: 'GALLERY', path: '/gallery' },
    { label: 'EXPLORE EVENTS', path: '/events' },
    { label: 'CONTACT', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-all text-slate-900">
      
      {/* Top Utility Contact Bar */}
      <div className="bg-slate-100 border-b border-slate-200 text-[11px] py-1.5 px-4 text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span>Ahilyanagar, India</span>
          </div>

          <div className="flex items-center gap-4 font-medium">
            <a 
              href="https://wa.me/919307189068" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1.5 hover:text-amber-600 text-slate-800 font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>+91 9307189068</span>
            </a>
            <span className="text-slate-300">|</span>
            <a 
              href="mailto:agaleashwini24@gmail.com" 
              className="flex items-center gap-1.5 hover:text-amber-600 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-600" />
              <span>agaleashwini24@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main White Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo (Royal Events Emblem) */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center border border-amber-200">
                <Crown className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold tracking-wider text-slate-900 flex items-center gap-1">
                ROYAL <span className="text-amber-600">EVENTS</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold -mt-1">
                Event & Wedding Planner
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs font-bold tracking-wider uppercase transition-all py-1 ${
                    active ? 'text-amber-600 font-extrabold' : 'text-slate-700 hover:text-amber-600'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="block h-0.5 bg-amber-600 rounded-full mt-0.5" />
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
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 transition-all shadow-xs"
                  >
                    <LayoutDashboard className="w-4 h-4 text-amber-600" />
                    Admin Panel
                  </Link>
                )}
                
                <Link
                  to="/my-bookings"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200 transition-all shadow-xs"
                >
                  <Ticket className="w-4 h-4 text-amber-600" />
                  My Bookings
                </Link>

                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200 transition-all shadow-xs"
                  title="Profile"
                >
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-bold border border-amber-300">
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
                  className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-amber-600 px-3 py-2 rounded-xl transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold uppercase tracking-wider text-xs px-5 py-2.5 rounded-xl shadow-md shadow-amber-500/20 transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-800 bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-slate-800 hover:bg-slate-100 hover:text-amber-600 text-xs font-bold uppercase tracking-wider"
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <div className="pt-4 border-t border-slate-200 space-y-2">
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-amber-800 bg-amber-50 font-bold text-xs border border-amber-200"
                >
                  Admin Panel
                </Link>
              )}
              <Link
                to="/my-bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-slate-800 hover:bg-slate-100 text-xs font-bold uppercase"
              >
                My Bookings
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-slate-800 hover:bg-slate-100 text-xs font-bold uppercase"
              >
                My Profile ({user.fullName})
              </Link>
              <button
                onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                className="w-full text-left px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 text-xs font-bold uppercase"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-3 rounded-xl text-slate-800 bg-slate-100 border border-slate-200 font-bold text-xs uppercase"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-3 rounded-xl text-slate-950 bg-amber-500 font-bold text-xs uppercase shadow-md shadow-amber-500/20"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
