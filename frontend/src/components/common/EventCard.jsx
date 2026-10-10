import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Ticket, ArrowRight, Sparkles, Flame } from 'lucide-react';

const EventCard = ({ event }) => {
  const isSoldOut = event.availableSeats <= 0;
  const capacityPercent = event.capacity ? Math.min(100, Math.round(((event.capacity - event.availableSeats) / event.capacity) * 100)) : 0;
  const isFillingFast = !isSoldOut && event.availableSeats > 0 && event.availableSeats <= Math.max(5, Math.round(event.capacity * 0.2));

  return (
    <div className="event-card rounded-3xl overflow-hidden flex flex-col justify-between group relative">
      <div>
        {/* Cover Image & Badges */}
        <div className="relative h-52 overflow-hidden bg-slate-100">
          <img
            src={event.coverImage || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80'}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />
          
          {/* Category Pill */}
          <span className="absolute top-3.5 left-3.5 bg-white/95 text-violet-700 text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-md border border-slate-200/80 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-violet-600" />
            {event.category}
          </span>

          {/* Price Badge */}
          <span className="absolute top-3.5 right-3.5 bg-slate-900/90 text-emerald-400 text-xs font-extrabold px-3.5 py-1 rounded-full backdrop-blur-md shadow-md">
            ₹{event.price ? event.price.toLocaleString('en-IN') : '0'}
          </span>

          {/* Filling Fast Badge */}
          {isFillingFast && (
            <span className="absolute bottom-3.5 left-3.5 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md shadow-md flex items-center gap-1 uppercase tracking-wider">
              <Flame className="w-3 h-3 text-slate-950" />
              Filling Fast
            </span>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-3">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-600 transition-colors line-clamp-1 leading-snug">
            {event.title}
          </h3>

          <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-violet-600 flex-shrink-0" />
              <span className="font-semibold text-slate-700">{event.eventDate} {event.startTime && `• ${event.startTime}`}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />
              <span className="truncate text-slate-600">{event.venue}, {event.city}</span>
            </div>
          </div>

          {/* Capacity Progress Bar */}
          <div className="pt-2 space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-500 font-medium">Availability</span>
              <span className={isSoldOut ? 'text-red-600 font-bold' : isFillingFast ? 'text-amber-600 font-bold' : 'text-emerald-600 font-bold'}>
                {isSoldOut ? 'Sold Out' : `${event.availableSeats} seats left`}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200/60">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isSoldOut
                    ? 'bg-red-500'
                    : isFillingFast
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${capacityPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-6 pt-0 mt-2">
        <Link
          to={`/events/${event.id}`}
          className={`w-full font-semibold py-3 px-4 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 text-xs tracking-wide ${
            isSoldOut
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              : 'btn-violet text-white group-hover:shadow-violet-500/30'
          }`}
        >
          <span>{isSoldOut ? 'Event Sold Out' : 'View Details & Book'}</span>
          {!isSoldOut && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
