import React, { useState } from 'react';
import { Sparkles, MessageSquare, X, MapPin, Eye } from 'lucide-react';

const galleryItems = [
  // Wedding
  {
    id: 1,
    title: 'Royal Destination Mandap & Floral Setup',
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    description: 'Grand outdoor wedding ceremony with royal mandap decor, pink & white roses, luxury aisle seating, and traditional mandap stage setup.',
    location: 'Ahilyanagar, India'
  },
  {
    id: 2,
    title: 'Grand Palace Sangeet & Reception Night',
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    description: 'Bespoke stage lighting, chandelier arrangements, live acoustic performance, and royal banquet feast for wedding reception.',
    location: 'Ahilyanagar, India'
  },
  {
    id: 3,
    title: 'Luxury Beachside Sunset Wedding',
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    description: 'Elegant seaside wedding mandap setup with draped white canopy, floral arches, and sunset ocean view.',
    location: 'Ahilyanagar, India'
  },

  // Birthday
  {
    id: 4,
    title: 'Grand 1st Birthday Theme Party',
    category: 'Birthday',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    description: 'Pastel balloon arches, custom cake tables, magic shows, photobooths, and interactive fun zone for kids.',
    location: 'Ahilyanagar, India'
  },
  {
    id: 5,
    title: 'Milestone 25th Silver Birthday Gala',
    category: 'Birthday',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
    description: 'Neon rooftop party setup with DJ console, sparkling mocktail bar, theme lighting, and photobooth.',
    location: 'Ahilyanagar, India'
  },

  // Corporate
  {
    id: 6,
    title: 'Global Tech & Leadership Summit 2026',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    description: 'Annual corporate convention featuring LED video walls, keynote stages, delegate registration, and VIP lounges.',
    location: 'Ahilyanagar, India'
  },
  {
    id: 7,
    title: 'Corporate Annual Award & Gala Dinner',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    description: 'Black-tie gala dinner with trophy distribution, live orchestration, gourmet dining, and speeches.',
    location: 'Ahilyanagar, India'
  },

  // Engagement
  {
    id: 8,
    title: 'Romantic Ring Ceremony & Floral Stage',
    category: 'Engagement',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    description: 'Fairytale ring exchange setup with fairy lights, floral arches, personalized signboards, and acoustic violin music.',
    location: 'Ahilyanagar, India'
  },
  {
    id: 9,
    title: 'Royal Engagement Cocktail Party',
    category: 'Engagement',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    description: 'Glamorous evening engagement celebration with ambient lighting, dance floor, DJ, and signature drinks.',
    location: 'Ahilyanagar, India'
  },

  // College Events
  {
    id: 10,
    title: 'Annual College Cultural Youth Fest',
    category: 'College Events',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    description: 'Inter-college rock band competition, dance battles, fashion walks, food stalls, and celebrity guest star night.',
    location: 'Ahilyanagar, India'
  },
  {
    id: 11,
    title: 'College Tech Expo & Hackathon Summit',
    category: 'College Events',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=80',
    description: 'Project exhibitions, robotic arena, coding hackathons, guest lectures, and student award ceremonies.',
    location: 'Ahilyanagar, India'
  },

  // Family Functions
  {
    id: 12,
    title: 'Grand 50th Wedding Anniversary Gala',
    category: 'Family Functions',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
    description: 'Golden jubliee celebration with family slideshows, traditional feast, floral garlands, and memory photo booths.',
    location: 'Ahilyanagar, India'
  },
  {
    id: 13,
    title: 'Traditional Baby Shower & Naming Ceremony',
    category: 'Family Functions',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
    description: 'Warm floral traditional decor, marigold garlands, puja arrangements, and family feast management.',
    location: 'Ahilyanagar, India'
  }
];

const categories = ['All', 'Wedding', 'Birthday', 'Corporate', 'Engagement', 'College Events', 'Family Functions'];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const targetPhone = '919307189068';

  return (
    <div className="bg-white text-slate-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 space-y-12 animate-fadeIn">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4 animate-slideDown">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-4 py-1.5 rounded-full border border-amber-200 inline-flex items-center gap-1.5 animate-float">
          <Sparkles className="w-3.5 h-3.5" />
          Royal Events Event Portfolio & Photo Gallery
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-serif">
          Our Royal Event <span className="gradient-text-gold">Photo Gallery</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
          Click any photo below to view complete details, full size view, and direct WhatsApp booking inquiry.
        </p>
      </div>

      {/* Category Filter Bar */}
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 animate-slideUp">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 ${
              activeCategory === cat
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photos Grid with Zoom & Fade Animations */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setSelectedPhoto(item)}
            className="group relative rounded-3xl overflow-hidden cursor-pointer border border-slate-200 bg-white shadow-md hover:shadow-2xl hover:border-amber-400 transition-all duration-500 transform hover:-translate-y-2 animate-zoomIn"
            style={{ animationDelay: `${idx * 0.08}s` }}
          >
            <div className="h-64 sm:h-72 w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </div>
            
            {/* Clean Overlay: Only Badge & Title */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent p-6 flex flex-col justify-end">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-slate-950/70 backdrop-blur-xs px-3 py-1 rounded-full border border-amber-400/30">
                  {item.category}
                </span>
                <span className="text-[10px] text-slate-300 flex items-center gap-1 font-semibold">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  {item.location}
                </span>
              </div>
              
              <h3 className="text-base sm:text-lg font-bold text-white font-serif group-hover:text-amber-300 transition-colors leading-snug">
                {item.title}
              </h3>

              <div className="pt-2 mt-2 border-t border-white/20 flex items-center justify-between text-xs text-amber-300 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> Click to view full details
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Lightbox Modal with Zoom Animation */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative text-slate-900 space-y-5 shadow-2xl animate-zoomIn">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-5 right-5 bg-slate-100 hover:bg-slate-200 text-slate-700 p-2.5 rounded-full transition-colors hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-2xl overflow-hidden h-80 sm:h-96 w-full shadow-md">
              <img src={selectedPhoto.image} alt={selectedPhoto.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                  {selectedPhoto.category}
                </span>
                <span className="text-xs text-slate-600 flex items-center gap-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" /> {selectedPhoto.location}
                </span>
              </div>
              <h3 className="text-2xl font-bold font-serif text-slate-900">{selectedPhoto.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium pt-1 border-t border-slate-100">{selectedPhoto.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-600 font-semibold">
                Want a similar setup for your event in Ahilyanagar?
              </span>
              <a
                href={`https://wa.me/${targetPhone}?text=${encodeURIComponent(`Hi Royal Events, I am interested in booking a ${selectedPhoto.category} event like: ${selectedPhoto.title}`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs hover:scale-105 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Book This Event Type on WhatsApp (+91 9307189068)
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Gallery;
