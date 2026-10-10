import React from 'react';
import { Calendar, ShieldCheck, Cpu, Database, Server, Smartphone, Layers } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
          About EventSphere Platform
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Enterprise Event Management & <span className="gradient-text">Booking Architecture</span>
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          EventSphere is a high-performance, full-stack event management and booking ecosystem designed for seamless user experiences, real-time ticket availability enforcement, and administrative analytics.
        </p>
      </div>

      {/* Tech Stack Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl space-y-3 border border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Java Spring Boot 3 Backend</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            REST API core built with Java 21 LTS, Spring Security, JWT stateless authorization, BCrypt password hashing, and Jakarta validation rules.
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-3 border border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">MongoDB Data Store</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Document-oriented database storing users, events, and bookings with optimized indexes for fast searches, unique references, and filtering.
          </p>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-3 border border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">React & Tailwind CSS Frontend</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Single Page Application compiled with Vite, featuring dark navy aesthetics, Recharts dashboards, Axios interceptors, and responsive layouts.
          </p>
        </div>
      </div>

      {/* Key Highlights */}
      <div className="glass-card p-8 sm:p-10 rounded-3xl space-y-6">
        <h2 className="text-2xl font-bold text-white">Core System Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            <ShieldCheck className="w-5 h-5 text-indigo-400 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white">Role-Based Access Control</h4>
              <p className="text-slate-400 mt-1">Strict separation between public visitors, registered attendees, and system administrators.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            <Smartphone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-white">WhatsApp Click-to-Chat Drafts</h4>
              <p className="text-slate-400 mt-1">Automated `wa.me` message drafting for instant customer and organizer confirmation links.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
