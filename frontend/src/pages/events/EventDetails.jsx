import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { useAuth } from '../../context/AuthContext';
import WhatsAppDraftModal from '../../components/common/WhatsAppDraftModal';
import { Calendar, Clock, MapPin, Ticket, User, MessageSquare, AlertCircle, CheckCircle, ShieldCheck, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [tickets, setTickets] = useState(1);

  // Attendee Form details
  const [attendeeName, setAttendeeName] = useState(user?.fullName || '');
  const [attendeeEmail, setAttendeeEmail] = useState(user?.email || '');
  const [attendeePhone, setAttendeePhone] = useState(user?.phone || '');

  // WhatsApp Inquiry state
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [waDraftData, setWaDraftData] = useState(null);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  useEffect(() => {
    if (user) {
      setAttendeeName(user.fullName || '');
      setAttendeeEmail(user.email || '');
      setAttendeePhone(user.phone || '');
    }
  }, [user]);

  const fetchEventDetails = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`/api/events/${id}`);
      if (res.data.success) {
        setEvent(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching event details:', err);
      toast.error('Failed to load event details');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppInquiry = async () => {
    try {
      const res = await axiosClient.get(`/api/events/${id}/inquiry-whatsapp`);
      if (res.data.success) {
        setWaDraftData(res.data.data);
        setWaModalOpen(true);
      }
    } catch (err) {
      console.error('WhatsApp inquiry error:', err);
      toast.error('Failed to generate WhatsApp inquiry');
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please sign in to book event tickets');
      navigate('/login');
      return;
    }

    if (tickets < 1) {
      toast.error('Please select at least 1 ticket');
      return;
    }

    if (tickets > event.availableSeats) {
      toast.error(`Only ${event.availableSeats} tickets available`);
      return;
    }

    setBookingLoading(true);
    try {
      const res = await axiosClient.post('/api/bookings', {
        eventId: event.id,
        attendeeName,
        attendeeEmail,
        attendeePhone,
        numberOfTickets: tickets,
      });

      if (res.data.success) {
        toast.success('Booking created successfully!');
        navigate('/booking-success', { state: { booking: res.data.data, event } });
      }
    } catch (err) {
      console.error('Booking creation error:', err);
      toast.error(err.response?.data?.message || 'Failed to complete booking');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Event Not Found</h2>
        <p className="text-slate-500">The event you are looking for does not exist or has been removed.</p>
        <Link to="/events" className="inline-block btn-violet text-white px-6 py-2.5 rounded-xl font-semibold">
          Back to Events
        </Link>
      </div>
    );
  }

  const isSoldOut = event.availableSeats <= 0;
  const totalPrice = event.price ? event.price * tickets : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-slate-50 text-slate-900">
      
      {/* Back button */}
      <Link to="/events" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Events</span>
      </Link>

      {/* Hero Banner Card */}
      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md relative">
        <div className="h-72 sm:h-96 w-full relative">
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 space-y-3">
            <span className="bg-violet-600 text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-md">
              {event.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Grid: Details + Booking Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Event Metadata & Description */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold">Date & Time</p>
                <p className="text-sm font-bold text-slate-900">
                  {event.eventDate} {event.startTime && `@ ${event.startTime}`}
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold">Venue & City</p>
                <p className="text-sm font-bold text-slate-900 truncate">
                  {event.venue}, {event.city}
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold">Remaining Seats</p>
                <p className="text-sm font-bold text-slate-900">
                  {event.availableSeats} / {event.capacity} Total
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold">Organizer</p>
                <p className="text-sm font-bold text-slate-900 truncate">
                  {event.organizerName || 'EventSphere Host'}
                </p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900">About This Event</h2>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* WhatsApp Inquiry Button */}
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-sm font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-600" /> Have Questions for the Organizer?
              </h3>
              <p className="text-xs text-slate-600">
                Generate a prefilled WhatsApp inquiry message directly to the organizer.
              </p>
            </div>
            <button
              onClick={handleWhatsAppInquiry}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2 flex-shrink-0 transition-colors"
            >
              Ask on WhatsApp
            </button>
          </div>

          {/* Booking & Cancellation Rules */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 space-y-3 text-xs text-slate-600 shadow-xs">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-violet-600" /> Booking & Cancellation Policy
            </h3>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>Bookings are confirmed immediately upon submission with a unique booking reference.</li>
              <li>Free cancellation is permitted up to 24 hours prior to event start date.</li>
              <li>When cancelled, reserved seats are automatically released back to the event capacity.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Booking Form Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6 sticky top-28">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Ticket Price</span>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-slate-900">
                  ₹{event.price ? event.price.toLocaleString('en-IN') : '0'}
                </span>
                <span className="text-xs text-slate-400 block">/ ticket</span>
              </div>
            </div>

            {isSoldOut ? (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center space-y-2">
                <AlertCircle className="w-6 h-6 text-red-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-sm">Event Sold Out</h4>
                <p className="text-xs text-slate-500">All available capacity for this event has been reserved.</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                
                {/* Ticket Quantity */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Number of Tickets
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setTickets((t) => Math.max(1, t - 1))}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-lg flex items-center justify-center transition-colors border border-slate-200"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={event.availableSeats}
                      value={tickets}
                      onChange={(e) => setTickets(Math.max(1, Math.min(event.availableSeats, parseInt(e.target.value) || 1)))}
                      className="w-full text-center bg-slate-50 border border-slate-200 rounded-xl py-2 text-slate-900 font-bold text-sm focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setTickets((t) => Math.min(event.availableSeats, t + 1))}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-lg flex items-center justify-center transition-colors border border-slate-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Attendee Info Fields */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Attendee Name</label>
                    <input
                      type="text"
                      required
                      value={attendeeName}
                      onChange={(e) => setAttendeeName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-600"
                      placeholder="Full Name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Attendee Email</label>
                    <input
                      type="email"
                      required
                      value={attendeeEmail}
                      onChange={(e) => setAttendeeEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-600"
                      placeholder="email@domain.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Attendee Phone</label>
                    <input
                      type="tel"
                      required
                      value={attendeePhone}
                      onChange={(e) => setAttendeePhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-600"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-xs border border-slate-200 mt-4">
                  <div className="flex justify-between text-slate-600">
                    <span>{tickets} Ticket(s) x ₹{event.price}</span>
                    <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 text-sm pt-2 border-t border-slate-200">
                    <span>Total Amount</span>
                    <span className="text-violet-700 font-extrabold">₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Submit Booking Button */}
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full btn-violet text-white font-semibold py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 disabled:opacity-50 transition-all text-sm"
                >
                  {bookingLoading ? 'Reserving Tickets...' : 'Confirm & Create Booking'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* WhatsApp Modal */}
      <WhatsAppDraftModal
        isOpen={waModalOpen}
        onClose={() => setWaModalOpen(false)}
        draftData={waDraftData}
      />
    </div>
  );
};

export default EventDetails;
