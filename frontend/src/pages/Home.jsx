import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import EventCard from '../components/common/EventCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import { Search, Calendar, ShieldCheck, Ticket, Sparkles, MapPin, Award, Users, ArrowRight, CheckCircle2, MessageSquare, Star, Play, ChevronRight } from 'lucide-react';

const categories = [
  { name: 'Technology', icon: '💻', count: '12+ Events', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Music', icon: '🎵', count: '15+ Events', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { name: 'Exhibition', icon: '🎨', count: '8+ Events', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { name: 'Workshop', icon: '📸', count: '10+ Events', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { name: 'Business', icon: '💼', count: '14+ Events', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { name: 'Culture', icon: '🎭', count: '9+ Events', color: 'from-rose-50 to-pink-50 text-rose-700 border-rose-200' },
];

const testimonials = [
  {
    name: 'Ananya Sharma',
    role: 'Event Director & Lead Organizer',
    rating: 5,
    comment: 'EventSphere made managing our 1,500 attendee Tech Summit seamless. The prefilled WhatsApp confirmation draft boosted attendee verification by over 40%!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Vikram Sengupta',
    role: 'Frequent Event Attendee',
    rating: 5,
    comment: 'Instant booking references and zero payment friction! Generating the prefilled WhatsApp message saved me so much time when coordinating with friends.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Priya Raman',
    role: 'Photography Masterclass Host',
    comment: 'The real-time seat availability tracking and instant cancellation handling prevented any overbooking issues for my high-demand photography masterclass.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
];

const steps = [
  {
    step: '1',
    title: 'Discover an Event',
    description: 'Browse curated concerts, conferences, and workshops filtered by category, location, and date.',
    icon: Search,
  },
  {
    step: '2',
    title: 'Reserve Your Tickets',
    description: 'Select ticket quantities with real-time seat availability checks and server-side pricing.',
    icon: Ticket,
  },
  {
    step: '3',
    title: 'Instant Confirmation',
    description: 'Receive your unique booking reference (ES-YYYYMM-XXXXXX) instantly on screen.',
    icon: CheckCircle2,
  },
  {
    step: '4',
    title: 'Prepare WhatsApp Draft',
    description: 'Generate prefilled WhatsApp click-to-chat messages to easily share or present details.',
    icon: MessageSquare,
  },
];

const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axiosClient.get('/api/events/featured');
        if (res.data.success) {
          setFeaturedEvents(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load featured events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/events');
    }
  };

  const filteredFeatured = activeCategoryFilter === 'All'
    ? featuredEvents
    : featuredEvents.filter(e => e.category.toLowerCase() === activeCategoryFilter.toLowerCase());

  return (
    <div className="space-y-20 pb-20 bg-slate-50 text-slate-900">
      
      {/* Hero Section */}
      <section className="pt-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Violet Accent Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 border border-violet-200 text-violet-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-violet-600" />
              YOUR NEXT EXPERIENCE STARTS HERE
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Discover Events.<br />
              <span className="gradient-text-violet">Create Unforgettable Memories.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Find concerts, festivals, conferences, workshops and unforgettable experiences happening around you. Discover your next great event with EventSphere.
            </p>

            {/* Clean White Search Card */}
            <form onSubmit={handleSearchSubmit} className="pt-2">
              <div className="bg-white p-2 rounded-2xl flex flex-col sm:flex-row items-center gap-2 shadow-lg border border-slate-200">
                <div className="flex items-center gap-3 px-4 py-3 w-full">
                  <Search className="w-5 h-5 text-violet-600 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search events, categories, or locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-sm w-full font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto btn-violet text-white text-sm font-semibold px-7 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 flex-shrink-0"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <Link
                to="/events"
                className="btn-violet text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-md flex items-center gap-2"
              >
                <span>Explore Events</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#how-it-works"
                className="btn-secondary-light text-sm px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <span>How It Works</span>
              </a>
            </div>

          </div>

          {/* Right Column: Tasteful Photography Collage */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 h-56">
                  <img
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80"
                    alt="Tech Summit"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 h-40">
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
                    alt="Exhibition"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 h-40">
                  <img
                    src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80"
                    alt="Music Festival"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 h-56">
                  <img
                    src="https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&w=600&q=80"
                    alt="Workshop"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Professional Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-xs">
            <p className="text-3xl font-extrabold text-slate-900">500+</p>
            <p className="text-xs text-slate-500 font-semibold mt-1">Events Listed</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-xs">
            <p className="text-3xl font-extrabold text-violet-600">50K+</p>
            <p className="text-xs text-slate-500 font-semibold mt-1">Tickets Reserved</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-xs">
            <p className="text-3xl font-extrabold text-emerald-600">100+</p>
            <p className="text-xs text-slate-500 font-semibold mt-1">Event Organizers</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-xs">
            <p className="text-3xl font-extrabold text-amber-500">4.8 / 5</p>
            <p className="text-xs text-slate-500 font-semibold mt-1">User Rating</p>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Discover Popular <span className="gradient-text-violet">Events</span></h2>
            <p className="text-slate-500 text-sm mt-1">Find experiences worth remembering.</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {['All', 'Technology', 'Music', 'Exhibition', 'Workshop', 'Business'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex-shrink-0 ${
                    activeCategoryFilter === cat
                      ? 'btn-violet text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <Link
              to="/events"
              className="text-xs font-bold text-violet-600 hover:text-violet-800 flex items-center gap-1 flex-shrink-0"
            >
              View All Events →
            </Link>
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton count={6} />
        ) : filteredFeatured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeatured.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 space-y-3">
            <p className="text-3xl">🔍</p>
            <p className="text-slate-700 font-semibold text-sm">No events found under category "{activeCategoryFilter}"</p>
            <button
              onClick={() => setActiveCategoryFilter('All')}
              className="text-xs text-violet-600 font-bold hover:underline"
            >
              Reset to All Events
            </button>
          </div>
        )}
      </section>

      {/* Browse by Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Browse by <span className="gradient-text-violet">Category</span></h2>
          <p className="text-slate-500 text-sm">Explore events tailored to your specific interest</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/events?category=${cat.name}`}
              className={`bg-white p-6 rounded-3xl text-center flex flex-col items-center justify-center gap-3 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-violet-300 transition-all group`}
            >
              <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
              <div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-violet-600 transition-colors">{cat.name}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How EventSphere Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-3 py-1 rounded-full border border-violet-200">
              BOOKING PROCESS
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">How EventSphere Works</h2>
            <p className="text-slate-500 text-sm">Reserve your ticket in four simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 relative group">
                  <span className="w-8 h-8 rounded-full bg-violet-600 text-white font-extrabold text-xs flex items-center justify-center">
                    {s.step}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WhatsApp Booking Information Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              <span>WhatsApp Click-to-Chat Draft Integration</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Seamless Mobile Communication</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              After placing a booking, EventSphere generates a prefilled WhatsApp message draft containing your booking reference, event date, venue, and ticket quantity. Clicking the draft link opens WhatsApp on your device so you can send details instantly to the organizer or your guests.
            </p>
          </div>
          <Link
            to="/events"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-6 py-3 rounded-xl shadow-md flex-shrink-0 transition-colors"
          >
            Try Booking an Event
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">What Users Say</h2>
          <p className="text-slate-500 text-sm">Trusted by event organizers and attendees</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl flex flex-col justify-between space-y-4 border border-slate-200/80 shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-600 text-xs italic leading-relaxed">"{t.comment}"</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                <div>
                  <h4 className="text-slate-900 text-xs font-bold">{t.name}</h4>
                  <p className="text-[11px] text-violet-600 font-semibold">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 leading-tight">
            Ready to Discover Your Next Experience?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Create an account on EventSphere to browse upcoming events, reserve tickets, or manage your event listings.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/register"
              className="btn-violet text-white text-sm font-semibold px-8 py-3.5 rounded-xl shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              to="/events"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold px-8 py-3.5 rounded-xl border border-slate-700 transition-colors"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
