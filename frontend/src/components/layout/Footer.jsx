import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

const Footer = () => {
  const targetPhone = '917559200988';

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200/90 pt-10 sm:pt-16 pb-10 sm:pb-14 safe-area-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-10 sm:mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 col-span-1 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 active:scale-95 transition-transform touch-manipulation">
              <img 
                src="/logo.png" 
                alt="APG Event Decorators Logo" 
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover shadow-md border-2 border-amber-500/90 bg-black flex-shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-serif font-extrabold text-slate-900 tracking-wider">
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
            <h4 className="text-slate-900 text-xs font-bold mb-3 sm:mb-4 uppercase tracking-widest font-serif">Quick Navigation</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/" className="hover:text-amber-600 transition-colors py-0.5 inline-block">Home Page</Link></li>
              <li><Link to="/about" className="hover:text-amber-600 transition-colors py-0.5 inline-block">About APG Decorators</Link></li>
              <li><Link to="/services" className="hover:text-amber-600 transition-colors py-0.5 inline-block">Our Event Services</Link></li>
              <li><Link to="/gallery" className="hover:text-amber-600 transition-colors py-0.5 inline-block">Photo Gallery & Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-amber-600 transition-colors py-0.5 inline-block">Contact Support</Link></li>
              <li><Link to="/login" className="text-amber-700 hover:text-amber-800 transition-colors font-bold py-0.5 inline-block">Admin Portal / Login</Link></li>
            </ul>
          </div>

          {/* Event Categories */}
          <div>
            <h4 className="text-slate-900 text-xs font-bold mb-3 sm:mb-4 uppercase tracking-widest font-serif">Event Categories</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/services#wedding" className="hover:text-amber-600 transition-colors py-0.5 inline-block">Wedding & Mandap Decoration</Link></li>
              <li><Link to="/services#birthday" className="hover:text-amber-600 transition-colors py-0.5 inline-block">Birthday Party Celebrations</Link></li>
              <li><Link to="/services#corporate" className="hover:text-amber-600 transition-colors py-0.5 inline-block">Corporate & Stage Setup</Link></li>
              <li><Link to="/services#engagement" className="hover:text-amber-600 transition-colors py-0.5 inline-block">Ring Ceremony & Engagement</Link></li>
              <li><Link to="/services#college" className="hover:text-amber-600 transition-colors py-0.5 inline-block">College Cultural Events</Link></li>
              <li><Link to="/services#family" className="hover:text-amber-600 transition-colors py-0.5 inline-block">Family Functions & Anniversaries</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-slate-900 text-xs font-bold mb-3 sm:mb-4 uppercase tracking-widest font-serif">Contact & Office</h4>
            <ul className="space-y-3 text-xs font-medium">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-800 font-semibold break-words">वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar, Maharashtra</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <a href={`https://wa.me/${targetPhone}`} target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline font-bold active:scale-95 touch-manipulation inline-block">
                    +91 7559200988
                  </a>
                  <span className="text-slate-600 font-semibold mt-0.5">9763213440 / 9763822037</span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <a href="mailto:APG123@gmail.com" className="hover:text-amber-600 transition-colors break-all">
                  APG123@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium gap-3 sm:gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} APG Event Decorators, Vahegaon (ए.पी.जी. इव्हेंट डेकोरेटर्स). All rights reserved.</p>
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <Link to="/login" className="hover:text-amber-600 transition-colors py-1">
              Admin Login
            </Link>
            <span className="text-slate-300">|</span>
            <a
              href={`https://wa.me/${targetPhone}`}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-700 hover:underline flex items-center gap-1 font-bold py-1 active:scale-95 touch-manipulation"
            >
              <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" />
              WhatsApp: +91 7559200988
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
