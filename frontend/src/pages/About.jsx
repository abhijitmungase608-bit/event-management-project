import React, { useState } from 'react';
import { Calendar, MapPin, Phone, Mail, MessageSquare, Sparkles, Image as ImageIcon, CheckCircle, Award, Users, Star, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const galleryPhotos = [
  {
    id: 1,
    title: 'Grand Concert & Music Festival',
    category: 'Music & Concerts',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80',
    description: 'Live DJ performance and laser show with thousands of energetic attendees.'
  },
  {
    id: 2,
    title: 'Global Tech & AI Summit',
    category: 'Corporate & Tech',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
    description: 'Annual keynote convention featuring keynote speakers and technology exhibition.'
  },
  {
    id: 3,
    title: 'Royal Destination Wedding Celebration',
    category: 'Weddings & Private Events',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    description: 'Luxury decor, floral stage management, and gourmet dining experience.'
  },
  {
    id: 4,
    title: 'Fashion & Luxury Lifestyle Expo',
    category: 'Exhibitions & Expos',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
    description: 'Designer showcase, runway fashion walk, and lifestyle product displays.'
  },
  {
    id: 5,
    title: 'Photography & Creative Masterclass',
    category: 'Workshops',
    image: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&w=1000&q=80',
    description: 'Hands-on interactive training sessions with industry experts.'
  },
  {
    id: 6,
    title: 'Cultural & Performing Arts Night',
    category: 'Cultural Events',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1000&q=80',
    description: 'Traditional dance recitals, folk musical acts, and heritage art stalls.'
  }
];

const About = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Music & Concerts', 'Corporate & Tech', 'Weddings & Private Events', 'Exhibitions & Expos', 'Workshops', 'Cultural Events'];

  const filteredPhotos = filterCategory === 'All' 
    ? galleryPhotos 
    : galleryPhotos.filter(p => p.category === filterCategory);

  const targetPhone = '919307189068';
  const targetEmail = 'agaleashwini24@gmail.com';

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
      
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Ahilyanagar's Premier Event Management Platform
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Creating Unforgettable <span className="gradient-text">Event Experiences</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Welcome to <strong>EventSphere</strong> — your one-stop solution for discovering, hosting, and booking top-tier events in Ahilyanagar, India. From corporate conventions to grand wedding galas and live concerts, we make event management effortless.
        </p>
      </div>

      {/* Services Showcase Cards */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Our Event Services & Expertise</h2>
          <p className="text-slate-400 text-xs mt-1">We plan, organize, and manage events of all scales with precision</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-3xl space-y-3 border border-slate-800 hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Corporate Conferences & Summits</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Professional venue booking, audio-visual stage setups, guest registration, and seamless execution for business leadership summits and tech expos.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl space-y-3 border border-slate-800 hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Music Concerts & Live Shows</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Large scale ticketing, artist management, crowd control security, sound acoustics, and direct WhatsApp booking confirmation.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl space-y-3 border border-slate-800 hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Weddings & Private Celebrations</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Custom theme decor, catering management, guest reception, and complete event coordination tailored for royal weddings and milestone anniversaries.
            </p>
          </div>
        </div>
      </div>

      {/* EVENT PHOTO GALLERY SECTION */}
      <div className="space-y-8 bg-slate-900/60 border border-slate-800 p-8 sm:p-10 rounded-3xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4" /> Live Event Highlights
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Event Photo Gallery</h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`text-xs px-3.5 py-1.5 rounded-full transition-all font-semibold ${
                  filterCategory === cat
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div 
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-slate-800 bg-slate-950 shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-56 w-full overflow-hidden">
                <img 
                  src={photo.image} 
                  alt={photo.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full w-fit mb-1 border border-emerald-500/30">
                  {photo.category}
                </span>
                <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {photo.title}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                  {photo.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="glass-card bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 relative text-white space-y-4 shadow-2xl">
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="rounded-2xl overflow-hidden h-72 w-full">
              <img src={selectedPhoto.image} alt={selectedPhoto.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase text-emerald-400">{selectedPhoto.category}</span>
              <h3 className="text-xl font-bold text-white mt-1">{selectedPhoto.title}</h3>
              <p className="text-sm text-slate-300 mt-2">{selectedPhoto.description}</p>
            </div>
            <div className="pt-2 flex justify-end">
              <a
                href={`https://wa.me/${targetPhone}?text=${encodeURIComponent(`Hi EventSphere, I saw the ${selectedPhoto.title} photo in your gallery and want to inquire about booking a similar event!`)}`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-5 rounded-xl flex items-center gap-2 text-xs shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                Inquire on WhatsApp (+91 9307189068)
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Contact & Location Details Footer Card */}
      <div className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-bold text-white">Planning an Event in Ahilyanagar?</h3>
          <p className="text-xs text-slate-300 max-w-md">
            Get instant ticket bookings and organizer support directly on WhatsApp or Email.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-300 pt-2">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-emerald-400" /> Ahilyanagar, India</span>
            <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-emerald-400" /> +91 9307189068</span>
            <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-purple-400" /> agaleashwini24@gmail.com</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <a
            href={`https://wa.me/${targetPhone}?text=${encodeURIComponent('Hi EventSphere, I would like to book/host an event in Ahilyanagar.')}`}
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp (+91 9307189068)
          </a>

          <Link
            to="/events"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs transition-all"
          >
            Explore Events
          </Link>
        </div>
      </div>

    </div>
  );
};

export default About;
