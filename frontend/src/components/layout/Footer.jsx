import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

const Footer = () => {
  const targetPhone = '919763213440';

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200/90 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="APG Event Decorators Logo" 
                className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-amber-500/90 bg-black flex-shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-xl font-serif font-extrabold text-slate-900 tracking-wider">
                  <span className="text-amber-600">APG</span> EVENTS
                </span>
                <span className="text-[10px] uppercase tracking-wide text-amber-700 font-bold -mt-0.5">
                  ए.पी.जी. इव्हेंट डेकोरेटर्स
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              वाहेगाव व छत्रपती संभाजीनगर येथील नामांकित इव्हेंट डेकोरेटर्स. Specializing in Royal Mandaps, Weddings, Birthdays, Corporate Events, Engagements, and Family Celebrations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 text-xs font-bold mb-4 uppercase tracking-widest font-serif">Quick Navigation</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/" className="hover:text-amber-600 transition-colors">Home Page</Link></li>
              <li><Link to="/about" className="hover:text-amber-600 transition-colors">About APG Decorators</Link></li>
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
              <li><Link to="/services#wedding" className="hover:text-amber-600 transition-colors">Wedding & Mandap Decoration</Link></li>
              <li><Link to="/services#birthday" className="hover:text-amber-600 transition-colors">Birthday Party Celebrations</Link></li>
              <li><Link to="/services#corporate" className="hover:text-amber-600 transition-colors">Corporate & Stage Setup</Link></li>
              <li><Link to="/services#engagement" className="hover:text-amber-600 transition-colors">Ring Ceremony & Engagement</Link></li>
              <li><Link to="/services#college" className="hover:text-amber-600 transition-colors">College Cultural Events</Link></li>
              <li><Link to="/services#family" className="hover:text-amber-600 transition-colors">Family Functions & Anniversaries</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-slate-900 text-xs font-bold mb-4 uppercase tracking-widest font-serif">Contact & Office</h4>
            <ul className="space-y-3 text-xs font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-800 font-semibold">वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar, Maharashtra</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <a href={`https://wa.me/${targetPhone}`} target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline font-bold">
                    +91 9763213440
                  </a>
                  <span className="text-slate-600 font-semibold">9763822037 / 7559200988</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <a href="mailto:APG123@gmail.com" className="hover:text-amber-600 transition-colors">
                  APG123@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium gap-4">
          <p>© {new Date().getFullYear()} APG Event Decorators, Vahegaon (ए.पी.जी. इव्हेंट डेकोरेटर्स). All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${targetPhone}`}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-700 hover:underline flex items-center gap-1 font-bold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp: +91 9763213440
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
