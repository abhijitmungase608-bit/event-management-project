import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import AdminSidebar from '../../components/layout/AdminSidebar';
import { Calendar, Ticket, Users, DollarSign, CheckCircle2, Clock, XCircle, FileBarChart } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import toast from 'react-hot-toast';

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#6366f1', '#a855f7'];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get('/api/admin/dashboard');
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load admin stats:', err);
      toast.error('Failed to load admin dashboard analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-900">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-x-hidden">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Admin Dashboard</h1>
            <p className="text-xs text-slate-400 mt-1">Real-time overview of events, bookings, revenue estimates, and user registrations</p>
          </div>
          <a
            href="http://localhost:8080/api/admin/reports/bookings.csv"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-btn text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 self-start sm:self-auto"
          >
            <FileBarChart className="w-4 h-4" />
            Export CSV Report
          </a>
        </div>

        {/* 8 Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="glass-card p-5 rounded-2xl space-y-2 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Events</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-white">{stats?.totalEvents || 0}</p>
            <p className="text-[11px] text-indigo-400 font-medium">{stats?.publishedEvents || 0} Currently Published</p>
          </div>

          <div className="glass-card p-5 rounded-2xl space-y-2 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Bookings</span>
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Ticket className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-white">{stats?.totalBookings || 0}</p>
            <p className="text-[11px] text-emerald-400 font-medium">{stats?.confirmedBookings || 0} Confirmed</p>
          </div>

          <div className="glass-card p-5 rounded-2xl space-y-2 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Revenue Estimate</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-emerald-400">
              ₹{stats?.estimatedRevenue ? stats.estimatedRevenue.toLocaleString('en-IN') : 0}
            </p>
            <p className="text-[11px] text-slate-400">From eligible confirmed bookings</p>
          </div>

          <div className="glass-card p-5 rounded-2xl space-y-2 border border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Registered Users</span>
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-3xl font-extrabold text-white">{stats?.registeredUsers || 0}</p>
            <p className="text-[11px] text-slate-400">User accounts in system</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Monthly Bookings Area Chart */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 lg:col-span-2 space-y-4">
            <h3 className="text-base font-bold text-white">Monthly Booking Trends</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats?.monthlyBookings || []}>
                  <defs>
                    <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="bookings" stroke="#6366f1" fillOpacity={1} fill="url(#colorBookings)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Booking Status Pie Chart */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Status Distribution</h3>
            <div className="h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats?.statusDistribution || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {(stats?.statusDistribution || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Categories Bar Chart */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">Events Count by Category</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.categoryDistribution || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="category" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                <Bar dataKey="eventCount" fill="#a855f7" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;
