import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockEventsData } from '../../data/mockEvents';
import { Calendar, MapPin, Ticket, User, MessageSquare, AlertCircle, ShieldCheck, ArrowLeft, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const EventDetails = () => {
  const { id } = useParams();
  const event = mockEventsData.find((e) => e.id === id) || mockEventsData[0];

  const [tickets, setTickets] = useState(1);
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');
  const [attendeePhone, setAttendeePhone] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  const targetPhone = '919307189068';

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (tickets < 1) {
      toast.error('Please select at least 1 ticket');
      return;
    }

    setBookingLoading(true);

    const bookingRef = `RE-${Math.floor(100000 + Math.random() * 900000)}`;
    const totalPrice = event.price ? event.price * tickets : 0;

    const waText = `🎉 *Royal Events Booking Request*\n\n📋 *Reference:* ${bookingRef}\n📅 *Event:* ${event.title}\n🗓️ *Date:* ${event.eventDate} @ ${event.startTime}\n📍 *Venue:* ${event.venue}, ${event.city}\n🎟️ *Tickets:* ${tickets}\n💰 *Total Amount:* ₹${totalPrice.toLocaleString('en-IN')}\n\n👤 *Attendee Name:* ${attendeeName}\n📞 *Phone:* ${attendeePhone}\n📧 *Email:* ${attendeeEmail}\n📍 *Location:* Ahilyanagar, India`;

    const encodedText = encodeURIComponent(waText);
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedText}`;

    setTimeout(() => {
      toast.success('Redirecting to WhatsApp to complete your booking directly with +91 9307189068!');
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setBookingLoading(false);
    }, 500);
  };

  const handleWhatsAppInquiry = () => {
    const inquiryText = `Hi Royal Events, I have an inquiry about the event: *${event.title}* on ${event.eventDate} in Ahilyanagar.`;
    window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(inquiryText)}`, '_blank', 'noopener,noreferrer');
  };

  const isSoldOut = event.availableSeats <= 0;
  const totalPrice = event.price ? event.price * tickets : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-white text-slate-900 min-h-screen">
      
      {/* Back button */}
      <Link to="/events" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-amber-700 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Events</span>
      </Link>

      {/* Hero Banner Card */}
      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-lg relative">
        <div className="h-72 sm:h-96 w-full relative">
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <span className="bg-amber-500 text-slate-950 text-xs font-bold px-3.5 py-1 rounded-full shadow-md uppercase tracking-wider">
              {event.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-serif leading-tight">
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
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold">Date & Time</p>
                <p className="text-sm font-bold text-slate-900">
                  {event.eventDate} {event.startTime && `@ ${event.startTime}`}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
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

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
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

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-semibold">Organizer</p>
                <p className="text-sm font-bold text-slate-900 truncate">
                  {event.organizerName || 'Royal Events'}
                </p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold font-serif text-slate-900">About This Event</h2>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line font-medium">
              {event.description}
            </p>
          </div>

          {/* WhatsApp Inquiry Button */}
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-sm font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-600" /> Have Questions for Royal Events?
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Connect directly on WhatsApp with our team for custom decor estimates & venue details.
              </p>
            </div>
            <button
              onClick={handleWhatsAppInquiry}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2 flex-shrink-0 transition-colors"
            >
              Ask on WhatsApp (+91 9307189068)
            </button>
          </div>
        </div>

        {/* Right Column: Direct WhatsApp Booking Form Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6 sticky top-28">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">Ticket Price</span>
              <div className="text-right">
                <span className="text-2xl font-extrabold font-serif text-slate-900">
                  ₹{event.price ? event.price.toLocaleString('en-IN') : '0'}
                </span>
                <span className="text-xs text-slate-500 block">/ ticket</span>
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
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Attendee Name</label>
                    <input
                      type="text"
                      required
                      value={attendeeName}
                      onChange={(e) => setAttendeeName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Attendee Email</label>
                    <input
                      type="email"
                      required
                      value={attendeeEmail}
                      onChange={(e) => setAttendeeEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                      placeholder="agaleashwini24@gmail.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Attendee Phone</label>
                    <input
                      type="tel"
                      required
                      value={attendeePhone}
                      onChange={(e) => setAttendeePhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                      placeholder="+91 9307189068"
                    />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-xs border border-slate-200 mt-4">
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>{tickets} Ticket(s) x ₹{event.price}</span>
                    <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 text-sm pt-2 border-t border-slate-200">
                    <span>Total Amount</span>
                    <span className="text-amber-800 font-extrabold font-serif">₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Submit Booking Button */}
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 disabled:opacity-50 transition-all text-xs uppercase tracking-wider"
                >
                  <MessageSquare className="w-4 h-4" />
                  {bookingLoading ? 'Redirecting...' : 'Book Directly on WhatsApp (+91 9307189068)'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
