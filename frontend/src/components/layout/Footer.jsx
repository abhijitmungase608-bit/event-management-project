import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

const Footer = () => {
  const targetPhone = '919307189068';

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200/90 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 p-0.5 shadow-sm">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center border border-amber-200">
                  <Crown className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold text-slate-900 tracking-wider">
                  ROYAL <span className="text-amber-600">EVENTS</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold -mt-1">
                  Event & Wedding Planner
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              International & Luxury Event Planners in Ahilyanagar. Specializing in Weddings, Birthdays, Corporate Galas, Engagements, College Fests, and Family Functions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 text-xs font-bold mb-4 uppercase tracking-widest font-serif">Quick Navigation</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/" className="hover:text-amber-600 transition-colors">Home Page</Link></li>
              <li><Link to="/about" className="hover:text-amber-600 transition-colors">About Royal Events</Link></li>
              <li><Link to="/services" className="hover:text-amber-600 transition-colors">Our Event Services</Link></li>
              <li><Link to="/gallery" className="hover:text-amber-600 transition-colors">Photo Gallery & Portfolio</Link></li>
              <li><Link to="/events" className="hover:text-amber-600 transition-colors">Explore All Events</Link></li>
              <li><Link to="/contact" className="hover:text-amber-600 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Event Categories */}
          <div>
            <h4 className="text-slate-900 text-xs font-bold mb-4 uppercase tracking-widest font-serif">Event Categories</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/services#wedding" className="hover:text-amber-600 transition-colors">Wedding & Destination Marriages</Link></li>
              <li><Link to="/services#birthday" className="hover:text-amber-600 transition-colors">Birthday Party Celebrations</Link></li>
              <li><Link to="/services#corporate" className="hover:text-amber-600 transition-colors">Corporate & Business Events</Link></li>
              <li><Link to="/services#engagement" className="hover:text-amber-600 transition-colors">Ring Ceremony & Engagement</Link></li>
              <li><Link to="/services#college" className="hover:text-amber-600 transition-colors">College Cultural Events</Link></li>
              <li><Link to="/services#family" className="hover:text-amber-600 transition-colors">Family Functions & Anniversaries</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-slate-900 text-xs font-bold mb-4 uppercase tracking-widest font-serif">Contact & Support</h4>
            <ul className="space-y-3 text-xs font-medium">
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span className="text-slate-800 font-semibold">Ahilyanagar, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <a href={`https://wa.me/${targetPhone}`} target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline font-bold">
                  +91 9307189068
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <a href="mailto:agaleashwini24@gmail.com" className="hover:text-amber-600 transition-colors">
                  agaleashwini24@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium gap-4">
          <p>© {new Date().getFullYear()} Royal Events. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${targetPhone}`}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-700 hover:underline flex items-center gap-1 font-bold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp: +91 9307189068
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
