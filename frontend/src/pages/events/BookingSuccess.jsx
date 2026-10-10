import React, { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import WhatsAppDraftModal from '../../components/common/WhatsAppDraftModal';
import { CheckCircle2, Ticket, Calendar, MapPin, MessageSquare, Copy, Check, ArrowRight, Sparkles, QrCode } from 'lucide-react';
import toast from 'react-hot-toast';

const BookingSuccess = () => {
  const location = useLocation();
  const booking = location.state?.booking;
  const event = location.state?.event;

  const [copied, setCopied] = useState(false);
  const [waModalOpen, setWaModalOpen] = useState(false);

  if (!booking) {
    return <Navigate to="/events" replace />;
  }

  const handleCopyDetails = () => {
    const text = `EventSphere Booking Confirmation\nReference: ${booking.bookingReference}\nEvent: ${booking.eventTitle}\nDate: ${booking.eventDate}\nVenue: ${booking.eventVenue}\nTickets: ${booking.numberOfTickets}\nTotal Amount: ₹${booking.totalAmount}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Booking details copied!');
    setTimeout(() => setCopied(false), 3000);
  };

  const draftData = {
    rawText: booking.whatsappFormattedText || `Hello, my booking reference is ${booking.bookingReference} for ${booking.eventTitle}.`,
    clickToChatUrl: booking.whatsappUrl || 'https://wa.me/919876543210',
    recipientPhone: '919876543210',
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 animate-slideUp">
      
      {/* Top Banner */}
      <div className="glass-card-glow p-8 sm:p-10 rounded-3xl text-center space-y-4 border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 via-slate-950 to-slate-950 relative overflow-hidden">
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl border border-emerald-500/40 animate-bounce-slow">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Booking <span className="gradient-text-emerald">Confirmed!</span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          Your tickets have been reserved successfully in MongoDB. Present your reference code at the venue entry.
        </p>

        <div className="inline-block bg-slate-900/90 border border-slate-700/80 rounded-2xl px-6 py-3 shadow-inner">
          <span className="text-[11px] text-slate-400 block uppercase tracking-widest font-semibold">Booking Reference</span>
          <span className="text-2xl font-mono font-extrabold text-indigo-400 tracking-wider">
            {booking.bookingReference}
          </span>
        </div>
      </div>

      {/* Event Ticket Pass Card Design */}
      <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden relative shadow-2xl">
        
        {/* Pass Top Banner */}
        <div className="bg-gradient-to-r from-indigo-900/60 to-purple-900/60 p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Official Event Ticket Pass</h3>
              <span className="text-[10px] text-indigo-300 font-mono">EventSphere Verified Entry</span>
            </div>
          </div>
          <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
            {booking.status}
          </span>
        </div>

        {/* Pass Body Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          {/* Left Thumbnail */}
          <div className="sm:col-span-1 space-y-3">
            {booking.eventCoverImage ? (
              <img
                src={booking.eventCoverImage}
                alt={booking.eventTitle}
                className="w-full h-36 rounded-2xl object-cover border border-slate-800"
              />
            ) : (
              <div className="w-full h-36 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 text-xs">
                No Image
              </div>
            )}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-1">
              <QrCode className="w-8 h-8 text-indigo-400 mx-auto" />
              <span className="text-[9px] font-mono text-slate-500 block uppercase">Scan for Entry</span>
            </div>
          </div>

          {/* Right Pass Details */}
          <div className="sm:col-span-2 space-y-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Event Title</span>
              <h4 className="text-base font-bold text-white">{booking.eventTitle}</h4>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Attendee</span>
                <span className="text-white font-medium">{booking.attendeeName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Contact Email</span>
                <span className="text-white font-medium truncate block">{booking.attendeeEmail}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Date & Time</span>
                <span className="text-white font-medium">{booking.eventDate} @ {booking.eventTime}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Venue</span>
                <span className="text-white font-medium truncate block">{booking.eventVenue}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Tickets</span>
                <span className="text-sm font-bold text-white">{booking.numberOfTickets} Ticket(s)</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Total Paid / Due</span>
                <span className="text-lg font-extrabold text-emerald-400">₹{booking.totalAmount}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => setWaModalOpen(true)}
          className="gradient-btn-emerald text-white font-semibold py-3.5 px-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 text-sm transition-all"
        >
          <MessageSquare className="w-4 h-4" />
          Prepare WhatsApp Confirmation
        </button>

        <button
          onClick={handleCopyDetails}
          className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 px-4 rounded-2xl border border-slate-700 flex items-center justify-center gap-2 text-sm transition-all"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Details Copied!' : 'Copy Booking Details'}
        </button>
      </div>

      <div className="flex items-center justify-between pt-4 text-xs font-semibold">
        <Link to="/my-bookings" className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
          <span>View My Bookings History</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link to="/events" className="text-slate-400 hover:text-white">
          Back to Events
        </Link>
      </div>

      {/* WhatsApp Modal */}
      <WhatsAppDraftModal
        isOpen={waModalOpen}
        onClose={() => setWaModalOpen(false)}
        draftData={draftData}
      />
    </div>
  );
};

export default BookingSuccess;
