import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success('Thank you! Your message has been sent to EventSphere support.');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSending(false);
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Get in Touch with <span className="gradient-text">EventSphere</span>
        </h1>
        <p className="text-slate-400 text-sm">
          Have questions regarding event hosting, ticket bookings, or administrative support? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Contact Info Sidebar */}
        <div className="space-y-6 md:col-span-1">
          <div className="glass-card p-6 rounded-3xl space-y-4 border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-2">Contact Details</h3>
            
            <div className="flex items-start gap-3 text-xs">
              <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block">Headquarters</span>
                <span className="text-slate-200 font-medium">Tech Park Tower, Bengaluru, KA, India</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs">
              <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block">Phone Helpline</span>
                <span className="text-slate-200 font-medium">+91 98765 43210</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs">
              <Mail className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 block">Email Support</span>
                <span className="text-slate-200 font-medium">support@eventsphere.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-2">
          <div className="glass-card p-8 rounded-3xl space-y-6 border border-slate-800">
            <h3 className="text-xl font-bold text-white">Send Us a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
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
                    placeholder="name@domain.com"
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
                  placeholder="e.g. Event Inquiry or Technical Support"
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

              <button
                type="submit"
                disabled={sending}
                className="gradient-btn text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 text-sm disabled:opacity-50 transition-all"
              >
                <Send className="w-4 h-4" />
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
