import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import EventCard from '../components/common/EventCard';
import LoadingSkeleton from '../components/common/LoadingSkeleton';
import { Heart, Gift, Briefcase, Sparkles, GraduationCap, Home as HomeIcon, Crown, ArrowRight, MapPin, Phone, MessageSquare, CheckCircle2, Star, Calendar, Image as ImageIcon } from 'lucide-react';

const eventCategories = [
  {
    id: 'wedding',
    title: 'Wedding',
    subtitle: 'Destination Marriages, Mandap & Sangeet',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    icon: Heart,
    color: 'emerald'
  },
  {
    id: 'birthday',
    title: 'Birthday',
    subtitle: 'Theme Parties & Milestone Birthdays',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    icon: Gift,
    color: 'amber'
  },
  {
    id: 'corporate',
    title: 'Corporate',
    subtitle: 'Conventions, Award Galas & Expos',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    icon: Briefcase,
    color: 'indigo'
  },
  {
    id: 'engagement',
    title: 'Engagement',
    subtitle: 'Ring Ceremony & Floral Stages',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
    icon: Sparkles,
    color: 'rose'
  },
  {
    id: 'college',
    title: 'College Events',
    subtitle: 'Youth Fests, Concerts & Annual Days',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    icon: GraduationCap,
    color: 'purple'
  },
  {
    id: 'family',
    title: 'Family Functions',
    subtitle: 'Anniversaries, Housewarming & Pujas',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
    icon: HomeIcon,
    color: 'cyan'
  }
];

const sampleGallery = [
  {
    title: 'Royal Destination Mandap Setup',
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Milestone Theme Birthday Bash',
    category: 'Birthday',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Global Corporate Tech Summit 2026',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Fairytale Engagement Ring Ceremony',
    category: 'Engagement',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Inter-College Youth Rock Concert',
    category: 'College Events',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Golden Jubilee Family Reunion Feast',
    category: 'Family Functions',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80'
  }
];

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const targetPhone = '919307189068';

  useEffect(() => {
    fetchFeaturedEvents();
  }, []);

  const fetchFeaturedEvents = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get('/api/events');
      if (res.data.success) {
        setEvents(res.data.data.slice(0, 6));
      }
    } catch (err) {
      console.error('Error fetching featured events:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 bg-slate-950 text-slate-100 min-h-screen">
      
      {/* LUXURY HERO BANNER SECTION (Directly inspired by Reference Image) */}
      <section className="relative h-[85vh] sm:h-[90vh] flex items-center justify-center overflow-hidden border-b border-slate-800">
        
        {/* Background Image with Dark Vignette Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=90"
            alt="Royal Wedding & Event Banner"
            className="w-full h-full object-cover scale-105 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
        </div>

        {/* Central Framed Luxury Card (Matching Image Layout) */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-md border border-amber-500/40 px-5 py-1.5 rounded-full text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Crown className="w-4 h-4 text-amber-400" />
            Royal Events • Ahilyanagar, India
          </div>

          {/* White Bordered Box (As shown in reference image) */}
          <div className="border-2 border-white/80 p-8 sm:p-14 bg-slate-950/50 backdrop-blur-md rounded-2xl shadow-2xl space-y-6 transform hover:scale-[1.01] transition-transform duration-500">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-wide leading-tight">
              We will plan every detail of <span className="text-amber-300 italic">your dream event!</span>
            </h1>

            <p className="text-slate-200 text-xs sm:text-base font-sans max-w-xl mx-auto leading-relaxed">
              Weddings • Birthdays • Corporate Galas • Engagements • College Fests • Family Functions
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${targetPhone}?text=${encodeURIComponent('Hi Royal Events, I would like to plan my upcoming event with you in Ahilyanagar.')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-slate-950 hover:bg-amber-500 hover:text-slate-950 text-white font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-xl border border-white/80 shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                PLAN MY EVENT (WhatsApp)
              </a>

              <Link
                to="/gallery"
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-xl shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                VIEW OUR PORTFOLIO
              </Link>
            </div>
          </div>

          {/* Subheading below frame (Matching reference image) */}
          <h2 className="text-lg sm:text-xl font-serif text-slate-200 tracking-wider">
            International Luxury Wedding & Event Planners
          </h2>
        </div>
      </section>

      {/* REQUIRED 6 EVENT CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20">
            Tailored Event Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-wide">
            Our Royal Event <span className="gradient-text-gold">Categories</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            Explore our specialized event management services designed for every occasion in Ahilyanagar
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventCategories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={cat.id}
                className="group relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/80 shadow-xl hover:border-amber-500/40 transition-all duration-500 transform hover:-translate-y-2 flex flex-col justify-between"
              >
                <div className="h-60 w-full overflow-hidden relative">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-slate-950/80 border border-slate-800 p-2.5 rounded-2xl text-amber-400 shadow-md">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold font-serif text-white group-hover:text-amber-300 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-sans">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <Link
                      to={`/services#${cat.id}`}
                      className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
                    >
                      <span>Explore {cat.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={`https://wa.me/${targetPhone}?text=${encodeURIComponent(`Hi Royal Events, I am interested in booking a ${cat.title} event in Ahilyanagar.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* EVENT PHOTO GALLERY PREVIEW SECTION */}
      <section className="bg-slate-900/60 border-y border-slate-800 py-16 px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Visual Highlights
            </span>
            <h2 className="text-3xl font-bold font-serif text-white">Event Photo Portfolio</h2>
            <p className="text-xs text-slate-400">Glimpse of real organized celebrations in Ahilyanagar</p>
          </div>

          <Link
            to="/gallery"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2"
          >
            <ImageIcon className="w-4 h-4" />
            View Full Photo Gallery
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleGallery.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl"
            >
              <div className="h-56 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-5 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-500/20 px-2.5 py-0.5 rounded-full w-fit mb-1 border border-amber-500/30">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-white font-serif">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED UPCOMING EVENTS FROM BACKEND */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Book Tickets Online</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">Featured Upcoming Events</h2>
          </div>
          <Link
            to="/events"
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>Explore All Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <LoadingSkeleton count={3} />
        ) : events.length === 0 ? (
          <div className="glass-card p-12 text-center text-slate-400 space-y-3">
            <Calendar className="w-10 h-10 text-slate-600 mx-auto" />
            <p>No featured events scheduled right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* DIRECT WHATSAPP INQUIRY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Direct Contact & Booking
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
              Ready to Host Your Event in Ahilyanagar?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Connect directly with Royal Events team on WhatsApp for custom decor estimates, venue bookings, and instant reservations.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-300 pt-2">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-amber-400" /> Ahilyanagar, India</span>
              <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-emerald-400" /> +91 9307189068</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
            <a
              href={`https://wa.me/${targetPhone}?text=${encodeURIComponent('Hi Royal Events, I would like to inquire about booking/planning an event in Ahilyanagar.')}`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-xl flex items-center justify-center gap-2 text-xs transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Chat on WhatsApp (+91 9307189068)
            </a>

            <Link
              to="/contact"
              className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold py-3.5 px-6 rounded-xl shadow-xl flex items-center justify-center gap-2 text-xs transition-all"
            >
              Send Message
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
