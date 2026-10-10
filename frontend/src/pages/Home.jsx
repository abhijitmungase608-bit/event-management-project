import React from 'react';
import { Link } from 'react-router-dom';
import { mockEventsData } from '../data/mockEvents';
import EventCard from '../components/common/EventCard';
import { Heart, Gift, Briefcase, Sparkles, GraduationCap, Home as HomeIcon, Crown, ArrowRight, MapPin, Phone, MessageSquare, Image as ImageIcon } from 'lucide-react';

const eventCategories = [
  {
    id: 'wedding',
    title: 'Wedding',
    subtitle: 'Destination Marriages, Mandap & Sangeet',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    icon: Heart
  },
  {
    id: 'birthday',
    title: 'Birthday',
    subtitle: 'Theme Parties & Milestone Birthdays',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    icon: Gift
  },
  {
    id: 'corporate',
    title: 'Corporate',
    subtitle: 'Conventions, Award Galas & Expos',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    icon: Briefcase
  },
  {
    id: 'engagement',
    title: 'Engagement',
    subtitle: 'Ring Ceremony & Floral Stages',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
    icon: Sparkles
  },
  {
    id: 'college',
    title: 'College Events',
    subtitle: 'Youth Fests, Concerts & Annual Days',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    icon: GraduationCap
  },
  {
    id: 'family',
    title: 'Family Functions',
    subtitle: 'Anniversaries, Housewarming & Pujas',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
    icon: HomeIcon
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
  const events = mockEventsData.slice(0, 6);
  const targetPhone = '919307189068';

  return (
    <div className="space-y-16 bg-white text-slate-900 min-h-screen">
      
      {/* LUXURY HERO BANNER SECTION (Text directly over background image WITHOUT white card box) */}
      <section className="relative min-h-[85vh] py-20 flex items-center justify-center overflow-hidden">
        
        {/* Background Image with Vignette Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=90"
            alt="Royal Wedding & Event Venue Background"
            className="w-full h-full object-cover scale-105 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-slate-950/50" />
        </div>

        {/* Text & Buttons Directly Over Image (NO WHITE CARD BOX) */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-6 my-auto text-white">
          
          <div className="inline-flex items-center gap-2 bg-slate-950/60 backdrop-blur-md border border-amber-400/40 px-5 py-2 rounded-full text-amber-300 text-xs font-bold uppercase tracking-widest shadow-lg">
            <Crown className="w-4 h-4 text-amber-400" />
            ROYAL EVENTS • AHILYANAGAR, INDIA
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-wide leading-tight drop-shadow-2xl">
            We will plan every detail of <span className="text-amber-400 italic">your dream event!</span>
          </h1>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-semibold text-amber-200 tracking-wider drop-shadow-lg">
            International Luxury Wedding & Event Planners in Ahilyanagar
          </h2>

          <p className="text-slate-200 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed font-medium tracking-wide drop-shadow-md">
            Weddings • Birthdays • Corporate Galas • Engagements • College Fests • Family Functions
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/${targetPhone}?text=${encodeURIComponent('Hi Royal Events, I would like to plan my upcoming event with you in Ahilyanagar.')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 border border-emerald-400/30"
            >
              <MessageSquare className="w-4 h-4" />
              PLAN MY EVENT (WHATSAPP)
            </a>

            <Link
              to="/gallery"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              VIEW OUR PORTFOLIO
            </Link>
          </div>
        </div>
      </section>

      {/* REQUIRED 6 EVENT CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-4 py-1.5 rounded-full border border-amber-200">
            Tailored Event Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-wide">
            Our Royal Event <span className="gradient-text-gold">Categories</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto font-medium">
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
                className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-lg hover:shadow-2xl hover:border-amber-400 transition-all duration-500 transform hover:-translate-y-2 flex flex-col justify-between"
              >
                <div className="h-60 w-full overflow-hidden relative">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md border border-slate-200 p-2.5 rounded-2xl text-amber-700 shadow-md">
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold font-serif text-slate-900 group-hover:text-amber-700 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 font-sans">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to={`/services#${cat.id}`}
                      className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5"
                    >
                      <span>Explore {cat.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={`https://wa.me/${targetPhone}?text=${encodeURIComponent(`Hi Royal Events, I am interested in booking a ${cat.title} event in Ahilyanagar.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1"
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

      {/* EVENT PHOTO GALLERY PREVIEW SECTION (Clean Cards: Photo + Name Only) */}
      <section className="bg-slate-50 border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
              Visual Highlights
            </span>
            <h2 className="text-3xl font-bold font-serif text-slate-900">Event Photo Portfolio</h2>
            <p className="text-xs text-slate-600 font-medium">Glimpse of real organized celebrations in Ahilyanagar</p>
          </div>

          <Link
            to="/gallery"
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <ImageIcon className="w-4 h-4" />
            View Full Photo Gallery
          </Link>
        </div>

        {/* Gallery Grid (Clean: Only Event Name over Photo) */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleGallery.map((item, index) => (
            <Link
              key={index}
              to="/gallery"
              className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-64 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase text-amber-300 bg-slate-950/60 backdrop-blur-xs px-3 py-1 rounded-full w-fit mb-1 border border-amber-400/30">
                  {item.category}
                </span>
                <h4 className="text-base font-bold text-white font-serif group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED UPCOMING EVENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">Book Tickets Online</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">Featured Upcoming Events</h2>
          </div>
          <Link
            to="/events"
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
          >
            <span>Explore All Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* DIRECT WHATSAPP INQUIRY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="p-8 sm:p-12 rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 via-white to-amber-50 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
              Direct Contact & Booking
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
              Ready to Host Your Event in Ahilyanagar?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-medium">
              Connect directly with Royal Events team on WhatsApp for custom decor estimates, venue bookings, and instant reservations.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-700 font-semibold pt-2">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-amber-700" /> Ahilyanagar, India</span>
              <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-emerald-700" /> +91 9307189068</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
            <a
              href={`https://wa.me/${targetPhone}?text=${encodeURIComponent('Hi Royal Events, I would like to inquire about booking/planning an event in Ahilyanagar.')}`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Chat on WhatsApp (+91 9307189068)
            </a>

            <Link
              to="/contact"
              className="bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold py-3.5 px-6 rounded-xl shadow-sm flex items-center justify-center gap-2 text-xs transition-all"
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
