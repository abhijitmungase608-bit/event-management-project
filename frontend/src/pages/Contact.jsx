import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const targetPhone = '919307189068';
  const targetEmail = 'agaleashwini24@gmail.com';

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    const waText = `👋 *New Inquiry on EventSphere*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📌 *Subject:* ${subject}\n💬 *Message:* ${message}`;
    const encodedWaText = encodeURIComponent(waText);
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedWaText}`;

    setTimeout(() => {
      toast.success('Redirecting to WhatsApp to send message directly to +91 9307189068!');
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setSending(false);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 600);
  };

  const handleDirectEmail = () => {
    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(subject || 'EventSphere Inquiry')}&body=${encodeURIComponent(message || 'Hello EventSphere Team,')}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Get in Touch with <span className="gradient-text">EventSphere</span>
        </h1>
        <p className="text-slate-400 text-sm">
          Have questions regarding event hosting, ticket bookings, or administrative support? We are here to help in Ahilyanagar, India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Contact Info Sidebar */}
        <div className="space-y-6 md:col-span-1">
          <div className="glass-card p-6 rounded-3xl space-y-5 border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-2">Contact Details</h3>
            
            <div className="flex items-start gap-3 text-xs">
              <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block font-semibold">Headquarters Location</span>
                <span className="text-slate-200 font-medium">Ahilyanagar, India</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs">
              <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block font-semibold">Phone Helpline / WhatsApp</span>
                <a 
                  href={`https://wa.me/${targetPhone}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline font-bold flex items-center gap-1 mt-0.5"
                >
                  +91 9307189068
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs">
              <Mail className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block font-semibold">Email Support</span>
                <a 
                  href={`mailto:${targetEmail}`}
                  className="text-purple-400 hover:underline font-bold block mt-0.5 break-all"
                >
                  agaleashwini24@gmail.com
                </a>
              </div>
            </div>

            {/* Quick WhatsApp Action Button */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <a
                href={`https://wa.me/${targetPhone}?text=${encodeURIComponent('Hi EventSphere, I would like to inquire about event management & bookings.')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Chat Directly on WhatsApp
              </a>

              <button
                type="button"
                onClick={handleDirectEmail}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2.5 px-4 rounded-xl border border-slate-700 flex items-center justify-center gap-2 text-xs transition-all"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                Send Email directly
              </button>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-2">
          <div className="glass-card p-8 rounded-3xl space-y-6 border border-slate-800">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              Send Us a Direct Message
              <span className="text-xs font-normal text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Direct WhatsApp & Mail
              </span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="agaleashwini24@gmail.com"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Event Ticket Inquiry / Booking Support"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
                <textarea
                  rows="4"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your detailed inquiry here..."
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 text-sm disabled:opacity-50 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  {sending ? 'Redirecting to WhatsApp...' : 'Submit to WhatsApp (+91 9307189068)'}
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
