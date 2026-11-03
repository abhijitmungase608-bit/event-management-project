import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Crown, Menu, X, Phone, Mail, MapPin, MessageSquare, Globe, UserCheck, Shield } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang } = useLanguage();
  const { user, isAdmin } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { label: lang === 'mr' ? 'मुख्यपृष्ठ' : 'HOME', path: '/' },
    { label: lang === 'mr' ? 'आमच्याबद्दल' : 'ABOUT', path: '/about' },
    { label: lang === 'mr' ? 'सेवा' : 'SERVICES', path: '/services' },
    { label: lang === 'mr' ? 'गॅलरी' : 'GALLERY', path: '/gallery' },
    { label: lang === 'mr' ? 'संपर्क' : 'CONTACT', path: '/contact' },
  ];

  const targetPhone = '917559200988';
  const altPhone1 = '9763213440';
  const altPhone2 = '9763822037';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-all text-slate-900">
      
      {/* Top Utility Contact Bar */}
      <div className="bg-slate-100 border-b border-slate-200 text-[10px] sm:text-[11px] py-1 px-3 sm:px-4 text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2">
          <div className="flex items-center gap-1.5 text-slate-700 font-semibold text-center sm:text-left">
            <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span className="truncate max-w-[280px] xs:max-w-[340px] sm:max-w-none">वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 font-medium flex-wrap justify-center text-[10px] sm:text-[11px]">
            <a 
              href={`https://wa.me/${targetPhone}`}
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 hover:text-amber-600 text-slate-900 font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>+91 7559200988 / 9763213440 / 9763822037</span>
            </a>
            <span className="text-slate-300 hidden md:inline">|</span>
            <a 
              href="mailto:APG123@gmail.com" 
              className="hidden md:flex items-center gap-1.5 hover:text-amber-600 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-600" />
              <span>APG123@gmail.com</span>
            </a>
            <span className="text-slate-300 hidden md:inline">|</span>
            {isAdmin ? (
              <Link 
                to="/admin/manage-images" 
                className="hidden md:flex items-center gap-1 text-amber-700 hover:text-amber-800 font-bold bg-amber-100/70 px-2 py-0.5 rounded-lg border border-amber-300"
              >
                <Shield className="w-3 h-3 text-amber-600" />
                <span>Admin Panel</span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="hidden md:flex items-center gap-1 text-slate-700 hover:text-amber-700 font-bold transition-colors"
              >
                <Shield className="w-3 h-3 text-amber-600" />
                <span>Admin Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main White Header Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo (APG Event Decorators) */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group max-w-[70%] sm:max-w-none">
            <img 
              src="/logo.png" 
              alt="APG Event Decorators Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shadow-md border-2 border-amber-500/90 group-hover:scale-105 group-hover:border-amber-400 transition-transform duration-300 bg-black flex-shrink-0"
            />
            <div className="flex flex-col truncate">
              <span className="text-sm sm:text-lg lg:text-xl font-serif font-black tracking-wider text-slate-900 flex items-center gap-1 leading-tight truncate">
                <span className="text-amber-600 font-black">APG</span> EVENT DECORATORS
              </span>
              <span className="text-[10px] sm:text-xs text-amber-700 font-bold tracking-tight truncate">
                ए.पी.जी. इव्हेंट डेकोरेटर्स, वाहेगाव
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

          {/* Language Toggle & Direct WhatsApp CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 border border-slate-300 rounded-xl p-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setLang('mr')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  lang === 'mr'
                    ? 'bg-amber-500 text-slate-950 shadow-sm font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                मराठी
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  lang === 'en'
                    ? 'bg-amber-500 text-slate-950 shadow-sm font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>

            <a
              href={`https://wa.me/${targetPhone}?text=${encodeURIComponent('Hi APG Event Decorators, I would like to book an event/decor setup in वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar.')}`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              {lang === 'mr' ? 'व्हाट्सॲप बुकिंग' : 'Book on WhatsApp'}
            </a>
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
          {/* Mobile Drawer Language Switcher */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase">भाषा / Language</span>
            <div className="flex items-center bg-slate-100 border border-slate-300 rounded-xl p-0.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => setLang('mr')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  lang === 'mr' ? 'bg-amber-500 text-slate-950 font-extrabold shadow-xs' : 'text-slate-600'
                }`}
              >
                मराठी
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  lang === 'en' ? 'bg-amber-500 text-slate-950 font-extrabold shadow-xs' : 'text-slate-600'
                }`}
              >
                English
              </button>
            </div>
          </div>

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

          <Link
            to={isAdmin ? "/admin/manage-images" : "/login"}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-amber-700 bg-amber-50 hover:bg-amber-100 text-xs font-bold uppercase tracking-wider border border-amber-200"
          >
            {isAdmin ? 'Admin Panel' : 'Admin Login'}
          </Link>

          <div className="pt-4 border-t border-slate-200">
            <a
              href={`https://wa.me/${targetPhone}?text=${encodeURIComponent('Hi APG Event Decorators, I would like to book an event/decor setup in वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar.')}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-3 rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              Book on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
