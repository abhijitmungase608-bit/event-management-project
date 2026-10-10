import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import AdminSidebar from '../../components/layout/AdminSidebar';
import WhatsAppDraftModal from '../../components/common/WhatsAppDraftModal';
import { Ticket, Search, Filter, MessageSquare, Edit3, FileBarChart, ChevronLeft, ChevronRight, X } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Status update modal state
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newStatus, setNewStatus] = useState('CONFIRMED');
  const [cancellationReason, setCancellationReason] = useState('');
  const [updating, setUpdating] = useState(false);

  // WhatsApp draft modal state
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [waDraftData, setWaDraftData] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, [statusFilter, page]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get('/api/admin/bookings', {
        params: { status: statusFilter, page, size: 10 },
      });
      if (res.data.success) {
        setBookings(res.data.data.content);
        setTotalPages(res.data.data.totalPages);
      }
    } catch (err) {
      console.error('Failed to load admin bookings:', err);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenStatusModal = (booking) => {
    setSelectedBooking(booking);
    setNewStatus(booking.status);
    setCancellationReason(booking.cancellationReason || '');
    setUpdateModalOpen(true);
  };

  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBooking) return;
    setUpdating(true);
    try {
      const res = await axiosClient.patch(`/api/admin/bookings/${selectedBooking.id}/status`, {
        status: newStatus,
        cancellationReason,
      });
      if (res.data.success) {
        toast.success('Booking status updated!');
        setUpdateModalOpen(false);
        fetchBookings();
      }
    } catch (err) {
      console.error('Status update error:', err);
      toast.error(err.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleWhatsAppAction = async (bookingId, destination) => {
    try {
      const res = await axiosClient.get(`/api/bookings/${bookingId}/whatsapp-draft`, {
        params: { destination },
      });
      if (res.data.success) {
        setWaDraftData(res.data.data);
        setWaModalOpen(true);
      }
    } catch (err) {
      console.error('WhatsApp draft error:', err);
      toast.error('Failed to draft WhatsApp message');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-x-hidden">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Booking Management</h1>
            <p className="text-xs text-slate-400 mt-1">Review attendee reservations, update status, and draft WhatsApp messages</p>
          </div>

          <a
            href="http://localhost:8080/api/admin/reports/bookings.csv"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-btn text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2"
          >
            <FileBarChart className="w-4 h-4" />
            Download Bookings CSV
          </a>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
          <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-indigo-400" /> Filter Status:
          </span>
          {['ALL', 'CONFIRMED', 'PENDING', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => { setStatusFilter(st); setPage(0); }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-4">Reference</th>
                  <th className="p-4">Attendee Details</th>
                  <th className="p-4">Event Title</th>
                  <th className="p-4">Tickets</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-indigo-400">{b.bookingReference}</td>
                    <td className="p-4 font-medium text-white">
                      <div>
                        <span>{b.attendeeName}</span>
                        <span className="block text-[11px] text-slate-400">{b.attendeeEmail}</span>
                        <span className="block text-[10px] text-slate-500">{b.attendeePhone}</span>
                      </div>
                    </td>
                    <td className="p-4 max-w-xs truncate">{b.eventTitle}</td>
                    <td className="p-4">{b.numberOfTickets} Ticket(s)</td>
                    <td className="p-4 font-bold text-white">₹{b.totalAmount}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full font-semibold text-[10px] uppercase ${
                        b.status === 'CONFIRMED'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : b.status === 'PENDING'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-red-500/10 text-red-400 border border-red-500/30'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleWhatsAppAction(b.id, 'ATTENDEE')}
                        className="p-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 transition-colors"
                        title="Draft Customer WhatsApp Confirmation"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenStatusModal(b)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        title="Change Status"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Status Modal */}
        {updateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="glass-card bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white">Update Booking Status</h3>
                <button onClick={() => setUpdateModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleStatusSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Booking Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="PENDING">PENDING</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>

                {newStatus === 'CANCELLED' && (
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Cancellation Reason</label>
                    <input
                      type="text"
                      value={cancellationReason}
                      onChange={(e) => setCancellationReason(e.target.value)}
                      placeholder="e.g. Organizer cancelled or refund issued"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setUpdateModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="gradient-btn text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg disabled:opacity-50"
                  >
                    {updating ? 'Updating...' : 'Save Status'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* WhatsApp Modal */}
        <WhatsAppDraftModal
          isOpen={waModalOpen}
          onClose={() => setWaModalOpen(false)}
          draftData={waDraftData}
        />
      </main>
    </div>
  );
};

export default AdminBookings;
