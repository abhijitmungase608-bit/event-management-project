import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, Ticket, Users, FileBarChart, ArrowLeft, Shield } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Event Management', path: '/admin/events', icon: Calendar },
    { label: 'Booking Management', path: '/admin/bookings', icon: Ticket },
    { label: 'User Directory', path: '/admin/users', icon: Users },
    { label: 'Reports & Export', path: '/admin/reports', icon: FileBarChart },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen flex flex-col justify-between p-4 sticky top-0 text-slate-100 flex-shrink-0">
      <div className="space-y-6">
        
        {/* Admin Header Badge */}
        <div className="flex items-center gap-3 px-2 py-3 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/30 text-violet-400 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">Admin Control</h2>
            <span className="text-[10px] text-violet-400 font-mono">EventSphere Portal</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Back to main site */}
      <div className="pt-4 border-t border-slate-800">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white px-3 py-2.5 rounded-xl hover:bg-slate-800/60 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Admin to Main Site</span>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;

