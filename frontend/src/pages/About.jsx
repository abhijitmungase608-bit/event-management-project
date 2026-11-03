import React, { useState } from 'react';
import { Calendar, MapPin, Phone, Mail, MessageSquare, Sparkles, Image as ImageIcon, Award, Users, X } from 'lucide-react';
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

  const targetPhone = '917559200988';

  return (
    <div className="bg-white text-slate-900 min-h-screen py-8 sm:py-12 px-3 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
      
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-200 inline-flex items-center gap-1.5 text-center">
          <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
          वाहेगाव व छत्रपती संभाजीनगर येथील नामांकित डेकोरेटर्स
        </span>
        <h1 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-serif leading-tight">
          Creating Unforgettable <span className="gradient-text-gold">Decor & Event Experiences</span>
        </h1>
        <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-medium">
          Welcome to <strong>APG Event Decorators (ए.पी.जी. इव्हेंट डेकोरेटर्स, वाहेगाव)</strong> — your trusted specialists in royal wedding mandaps, stage lighting, floral arrangements, and complete celebration decor across वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar.
        </p>
      </div>

      {/* Services Showcase Cards */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">Our Event Services & Expertise</h2>
          <p className="text-slate-600 text-xs mt-1 font-medium">We plan, organize, and manage events of all scales with precision</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl space-y-3 border border-slate-200 shadow-md hover:shadow-lg transition-all">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Award className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900">Corporate Conferences & Summits</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Professional venue booking, audio-visual stage setups, guest registration, and seamless execution for business leadership summits and tech expos.
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl space-y-3 border border-slate-200 shadow-md hover:shadow-lg transition-all">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900">Music Concerts & Live Shows</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Large scale ticketing, artist management, crowd control security, sound acoustics, and direct WhatsApp booking confirmation.
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl space-y-3 border border-slate-200 shadow-md hover:shadow-lg transition-all">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900">Weddings & Private Celebrations</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Custom theme decor, catering management, guest reception, and complete event coordination tailored for royal weddings and milestone anniversaries.
            </p>
          </div>
        </div>
      </div>

      {/* EVENT PHOTO GALLERY SECTION */}
      <div className="space-y-6 sm:space-y-8 bg-slate-50 border border-slate-200 p-4 sm:p-8 rounded-2xl sm:rounded-3xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] sm:text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Live Event Highlights
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold font-serif text-slate-900">Event Photo Gallery</h2>
          </div>

          <Link
            to="/gallery"
            className="w-full sm:w-auto text-center bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold uppercase tracking-wider text-xs px-5 py-2.5 rounded-xl shadow-md transition-all touch-manipulation"
          >
            View Full Gallery
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {galleryPhotos.map((photo) => (
            <div 
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-slate-200 bg-white shadow-md hover:shadow-xl transition-all duration-300 transform active:scale-98"
            >
              <div className="h-48 sm:h-56 w-full overflow-hidden">
                <img 
                  src={photo.image} 
                  alt={photo.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-4 sm:p-5 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-slate-950/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full w-fit mb-1 border border-amber-400/30">
                  {photo.category}
                </span>
                <h4 className="text-sm sm:text-base font-bold font-serif text-white">
                  {photo.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl max-w-2xl w-full p-4 sm:p-6 relative text-slate-900 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 sm:p-2.5 rounded-full transition-colors active:scale-95 touch-manipulation"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="rounded-xl sm:rounded-2xl overflow-hidden h-52 sm:h-72 w-full mt-2">
              <img src={selectedPhoto.image} alt={selectedPhoto.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">{selectedPhoto.category}</span>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900 mt-2">{selectedPhoto.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">{selectedPhoto.description}</p>
            </div>
            <div className="pt-2 flex justify-end">
              <a
                href={`https://wa.me/${targetPhone}?text=${encodeURIComponent(`Hi APG Event Decorators, I saw the ${selectedPhoto.title} photo in your gallery and want to inquire about booking a similar event decor!`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto justify-center bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 text-xs shadow-md transition-all touch-manipulation"
              >
                <MessageSquare className="w-4 h-4" />
                Inquire on WhatsApp (+91 7559200988)
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Contact & Location Details Footer Card */}
      <div className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 via-white to-amber-50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 leading-tight">Planning Event Decor in वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar?</h3>
          <p className="text-xs text-slate-600 max-w-md font-medium">
            Get instant decor estimates and event bookings directly on WhatsApp with APG Decorators.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 text-xs text-slate-700 font-semibold pt-2">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" /> वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" /> +91 7559200988 / 9763213440 / 9763822037</span>
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" /> APG123@gmail.com</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <a
            href={`https://wa.me/${targetPhone}?text=${encodeURIComponent('Hi APG Event Decorators, I would like to book/plan an event in वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar.')}`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold py-3 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs transition-all touch-manipulation"
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp (+91 7559200988)
          </a>

          <Link
            to="/gallery"
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold py-3 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs transition-all touch-manipulation"
          >
            View Gallery
          </Link>
        </div>
      </div>

    </div>
  );
};

export default About;
