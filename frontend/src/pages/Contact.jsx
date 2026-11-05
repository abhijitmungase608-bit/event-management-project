import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const targetPhone = '917559200988';
  const targetEmail = 'APG123@gmail.com';

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    const waText = `👋 *New Inquiry on APG Event Decorators (ए.पी.जी. इव्हेंट डेकोरेटर्स)*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📌 *Subject:* ${subject}\n💬 *Message:* ${message}\n📍 *Location:* वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar`;
    const encodedWaText = encodeURIComponent(waText);
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedWaText}`;

    setTimeout(() => {
      toast.success('Redirecting to WhatsApp to send message directly to +91 7559200988!');
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setSending(false);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 600);
  };

  const handleDirectEmail = () => {
    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(subject || 'APG Event Decorators Inquiry')}&body=${encodeURIComponent(message || 'Hello APG Event Decorators Team,')}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen py-8 sm:py-12 px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
      
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 tracking-tight">
          Get in Touch with <span className="gradient-text-gold">APG Event Decorators</span>
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm font-medium">
          ए.पी.जी. इव्हेंट डेकोरेटर्स, वाहेगाव — Mandap decor, stage lighting, floral arrangements & event bookings in वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Contact Info Sidebar */}
        <div className="space-y-6 md:col-span-1">
          <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl space-y-5 border border-slate-200 shadow-md">
            <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 mb-2">Contact Details</h3>
            
            <div className="flex items-start gap-3 text-xs">
              <MapPin className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 block font-semibold">Location / Address</span>
                <span className="text-slate-900 font-bold">वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar, Maharashtra</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs">
              <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 block font-semibold">Phone Helpline / WhatsApp</span>
                <a 
                  href={`https://wa.me/${targetPhone}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-emerald-700 hover:underline font-bold flex items-center gap-1 mt-0.5"
                >
                  +91 7559200988
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-slate-700 font-semibold block mt-1">
                  9763213440 / 9763822037
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs">
              <Mail className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 block font-semibold">Email Support</span>
                <a 
                  href={`mailto:${targetEmail}`}
                  className="text-amber-800 hover:underline font-bold block mt-0.5 break-all"
                >
                  APG123@gmail.com
                </a>
              </div>
            </div>

            {/* Quick WhatsApp Action Button */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <a
                href={`https://wa.me/${targetPhone}?text=${encodeURIComponent('Hi APG Event Decorators, I would like to inquire about event decor setups in वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar.')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs transition-all touch-manipulation"
              >
                <MessageSquare className="w-4 h-4" />
                Chat Directly on WhatsApp
              </a>

              <button
                type="button"
                onClick={handleDirectEmail}
                className="w-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-bold py-3 px-4 rounded-xl border border-slate-300 flex items-center justify-center gap-2 text-xs transition-all touch-manipulation"
              >
                <Mail className="w-4 h-4 text-amber-700" />
                Send Email directly
              </button>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-2">
          <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl space-y-5 sm:space-y-6 border border-slate-200 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900">
                Send Us a Direct Message
              </h3>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200 w-fit">
                Direct WhatsApp & Mail
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="APG123@gmail.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Wedding Decor Inquiry / Birthday Event Booking"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message</label>
                <textarea
                  rows="4"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your detailed inquiry here..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 sm:p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold py-3 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm disabled:opacity-50 transition-all touch-manipulation"
                >
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  <span>{sending ? 'Redirecting to WhatsApp...' : 'Submit to WhatsApp (+91 7559200988)'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
