import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl btn-violet flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                Event<span className="gradient-text-violet">Sphere</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              The premier platform for discovering, booking, and managing world-class conferences, cultural festivals, exhibitions, and workshops.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 text-sm font-bold mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/events" className="hover:text-violet-600 transition-colors">Explore All Events</Link></li>
              <li><Link to="/about" className="hover:text-violet-600 transition-colors">About Platform</Link></li>
              <li><Link to="/contact" className="hover:text-violet-600 transition-colors">Contact Support</Link></li>
              <li><Link to="/login" className="hover:text-violet-600 transition-colors">User Sign In</Link></li>
            </ul>
          </div>

          {/* Event Categories */}
          <div>
            <h4 className="text-slate-900 text-sm font-bold mb-4 uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/events?category=Technology" className="hover:text-violet-600 transition-colors">Technology & AI</Link></li>
              <li><Link to="/events?category=Music" className="hover:text-violet-600 transition-colors">Music & Festivals</Link></li>
              <li><Link to="/events?category=Exhibition" className="hover:text-violet-600 transition-colors">Exhibitions & Expos</Link></li>
              <li><Link to="/events?category=Workshop" className="hover:text-violet-600 transition-colors">Workshops & Masterclasses</Link></li>
              <li><Link to="/events?category=Business" className="hover:text-violet-600 transition-colors">Business & Networking</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-slate-900 text-sm font-bold mb-4 uppercase tracking-wider">Contact & Support</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-violet-600 flex-shrink-0" />
                <span>Ahilyanagar, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-violet-600 flex-shrink-0" />
                <span>+91 9307189068</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-violet-600 flex-shrink-0" />
                <span>agaleashwini24@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} EventSphere Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
