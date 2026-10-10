import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import WhatsAppDraftModal from '../../components/common/WhatsAppDraftModal';
import { Ticket, Calendar, MapPin, MessageSquare, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Cancellation modal state
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelling, setCancelling] = useState(false);

  // WhatsApp draft modal state
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [waDraftData, setWaDraftData] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, [page]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get('/api/bookings/my', {
        params: { page, size: 8 },
      });
      if (res.data.success) {
        setBookings(res.data.data.content);
        setTotalPages(res.data.data.totalPages);
      }
    } catch (err) {
      console.error('Failed to load user bookings:', err);
      toast.error('Failed to load your bookings history');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCancelModal = (booking) => {
    setSelectedBooking(booking);
    setCancelReason('');
    setCancelModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedBooking) return;
    setCancelling(true);
    try {
      const res = await axiosClient.post(`/api/bookings/${selectedBooking.id}/cancel`, null, {
        params: { reason: cancelReason || 'Cancelled by user' },
      });
      if (res.data.success) {
        toast.success('Booking cancelled successfully');
        setCancelModalOpen(false);
        fetchBookings();
      }
    } catch (err) {
      console.error('Cancel booking error:', err);
      toast.error(err.response?.data?.message || 'Failed to cancel booking');
    } finally {
      setCancelling(false);
    }
  };

  const handleOpenWhatsAppDraft = async (bookingId) => {
    try {
      const res = await axiosClient.get(`/api/bookings/${bookingId}/whatsapp-draft`, {
        params: { destination: 'ORGANIZER' },
      });
      if (res.data.success) {
        setWaDraftData(res.data.data);
        setWaModalOpen(true);
      }
    } catch (err) {
      console.error('WhatsApp draft error:', err);
      toast.error('Failed to generate WhatsApp message');
    }
  };

  return (
    <div className="bg-slate-50 min-h-[85vh] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            My <span className="text-violet-600">Bookings</span>
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Manage your upcoming event tickets, view references, and draft WhatsApp confirmations.
          </p>
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-pulse h-32"></div>
            ))}
          </div>
        ) : bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div key={b.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                {/* Left Details */}
                <div className="space-y-2 flex-grow">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-violet-700 bg-violet-50 px-3 py-1 rounded-lg border border-violet-200">
                      {b.bookingReference}
                    </span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${
                      b.status === 'CONFIRMED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : b.status === 'PENDING'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {b.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{b.eventTitle}</h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-violet-600" />
                      <span>{b.eventDate} @ {b.eventTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span>{b.eventVenue}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Ticket className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{b.numberOfTickets} Ticket(s)</span>
                    </div>
                  </div>

                  {b.cancellationReason && (
                    <p className="text-xs text-rose-600 italic pt-1">
                      Reason: {b.cancellationReason}
                    </p>
                  )}
                </div>

                {/* Right Price & Actions */}
                <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between gap-3 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                    <span className="text-xs text-slate-500 block">Total Amount</span>
                    <span className="text-xl font-extrabold text-slate-900">₹{b.totalAmount}</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleOpenWhatsAppDraft(b.id)}
                      className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      WhatsApp
                    </button>

                    {b.status !== 'CANCELLED' && (
                      <button
                        onClick={() => handleOpenCancelModal(b)}
                        className="bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-16 text-center rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <Ticket className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900">No Bookings Found</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              You haven't placed any event bookings yet. Discover upcoming events and book your tickets!
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 disabled:opacity-40 hover:bg-slate-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs text-slate-600 font-medium">Page {page + 1} of {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              disabled={page >= totalPages - 1}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 disabled:opacity-40 hover:bg-slate-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Cancellation Confirmation Modal */}
        {cancelModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-600" /> Cancel Booking
              </h3>
              <p className="text-xs text-slate-600">
                Are you sure you want to cancel booking reference <b className="text-slate-900">{selectedBooking?.bookingReference}</b>? This will release reserved seats back to the event capacity.
              </p>

              <div>
                <label className="block text-xs text-slate-700 font-semibold mb-1">Reason for Cancellation (Optional)</label>
                <input
                  type="text"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="e.g. Schedule change"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setCancelModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  Keep Booking
                </button>
                <button
                  onClick={handleConfirmCancel}
                  disabled={cancelling}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-50"
                >
                  {cancelling ? 'Cancelling...' : 'Confirm Cancellation'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp Modal */}
        <WhatsAppDraftModal
          isOpen={waModalOpen}
          onClose={() => setWaModalOpen(false)}
          draftData={waDraftData}
        />
      </div>
    </div>
  );
};

export default MyBookings;

