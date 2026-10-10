import React from 'react';
import AdminSidebar from '../../components/layout/AdminSidebar';
import { FileBarChart, Download, CheckCircle, Database, ShieldCheck } from 'lucide-react';

const AdminReports = () => {
  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-x-hidden">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">System Reports & CSV Export</h1>
          <p className="text-xs text-slate-400 mt-1">Export transactional booking logs, attendee summaries, and financial estimates</p>
        </div>

        {/* Export Module Card */}
        <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <FileBarChart className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Full System Bookings Report (.CSV)</h2>
              <p className="text-xs text-slate-400">Includes booking reference, event details, attendee contacts, tickets, total amount, and timestamps</p>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
            <h4 className="font-semibold text-white">CSV Fields Included:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-400">
              <span>• Booking Reference</span>
              <span>• Event Title</span>
              <span>• Attendee Name</span>
              <span>• Attendee Email</span>
              <span>• Attendee Phone</span>
              <span>• Ticket Quantity</span>
              <span>• Total Amount (INR)</span>
              <span>• Status & Timestamps</span>
            </div>
          </div>

          <a
            href="http://localhost:8080/api/admin/reports/bookings.csv"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-btn text-white text-sm font-semibold px-6 py-3.5 rounded-xl shadow-xl shadow-indigo-500/20 inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Complete CSV Report
          </a>
        </div>

      </main>
    </div>
  );
};

export default AdminReports;
