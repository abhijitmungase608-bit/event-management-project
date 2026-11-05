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
    { label: lang === 'mr' ? 'फोटोग्राफी' : 'PHOTOGRAPHY', path: '/photography' },
    { label: lang === 'mr' ? 'संपर्क' : 'CONTACT', path: '/contact' },
  ];

  const targetPhone = '917559200988';
  const altPhone1 = '9763213440';
  const altPhone2 = '9763822037';

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-all text-slate-900">
      
      {/* Main White Header Bar */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo (APG Event Decorators) */}
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0 mr-3 xl:mr-6">
            <img 
              src="/logo.png" 
              alt="APG Event Decorators Logo" 
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shadow-md border-2 border-amber-500/90 group-hover:scale-105 group-hover:border-amber-400 transition-transform duration-300 bg-black flex-shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-xs sm:text-base xl:text-lg font-serif font-black tracking-wide text-slate-900 flex items-center gap-1 leading-tight whitespace-nowrap">
                <span className="text-amber-600 font-black">APG</span> EVENT DECORATORS
              </span>
              <span className="text-[9px] sm:text-[11px] text-amber-700 font-bold tracking-tight whitespace-nowrap">
                ए.पी.जी. इव्हेंट डेकोरेटर्स, वाहेगाव
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-3.5 xl:gap-5 2xl:gap-6 flex-shrink-0">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[11px] xl:text-xs font-bold tracking-wide uppercase transition-all py-1 whitespace-nowrap ${
                    active ? 'text-amber-600 font-black border-b-2 border-amber-600' : 'text-slate-700 hover:text-amber-600'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Language Toggle & Actions */}
          <div className="hidden md:flex items-center gap-2 xl:gap-3 flex-shrink-0">
            {isAdmin ? (
              <Link 
                to="/admin/manage-images" 
                className="flex items-center gap-1 text-amber-800 font-bold bg-amber-100 hover:bg-amber-200 px-2.5 py-1.5 rounded-lg border border-amber-300 text-[11px] transition-colors whitespace-nowrap"
                title="Admin Dashboard"
              >
                <Shield className="w-3 h-3 text-amber-600 flex-shrink-0" />
                <span className="hidden xl:inline">Admin Panel</span>
                <span className="xl:hidden">Admin</span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-semibold px-2 py-1 text-[11px] transition-colors whitespace-nowrap"
                title="Admin Login"
              >
                <Shield className="w-3 h-3 text-slate-500 flex-shrink-0" />
                <span>Admin</span>
              </Link>
            )}

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 border border-slate-300 rounded-lg p-0.5 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setLang('mr')}
                className={`px-2 py-0.5 rounded-md transition-all ${
                  lang === 'mr'
                    ? 'bg-amber-500 text-slate-950 shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                मराठी
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded-md transition-all ${
                  lang === 'en'
                    ? 'bg-amber-500 text-slate-950 shadow-xs font-extrabold'
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
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider text-[11px] xl:text-xs px-3.5 xl:px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{lang === 'mr' ? 'व्हाट्सॲप' : 'WhatsApp'}</span>
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
