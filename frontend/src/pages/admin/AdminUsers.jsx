import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import AdminSidebar from '../../components/layout/AdminSidebar';
import { Users, Mail, Phone, Calendar, ShieldCheck, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get('/api/admin/users');
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load users:', err);
      toast.error('Failed to fetch user directory');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-x-hidden">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Registered Users</h1>
          <p className="text-xs text-slate-400 mt-1">Directory of all registered attendee and administrator accounts</p>
        </div>

        {/* User Table */}
        <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Account Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-semibold text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-500/30">
                          {u.fullName ? u.fullName.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <span>{u.fullName}</span>
                          <span className="block text-[10px] text-slate-500 font-mono">ID: {u.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{u.email}</td>
                    <td className="p-4">{u.phone || 'N/A'}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full font-semibold text-[10px] uppercase ${
                        u.role === 'ROLE_ADMIN'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/30'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-semibold text-[10px]">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
};

export default AdminUsers;
