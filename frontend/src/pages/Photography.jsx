import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, Video, Sparkles, MessageSquare, Phone, MapPin, 
  Calendar, Check, ChevronLeft, ChevronRight, Copy, Heart, 
  Eye, X, ArrowRight, ShieldCheck, Film, Award, Users 
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const carouselImages = [
  {
    id: 1,
    src: '/photography/DSC01961.jpg',
    title: 'Royal Mandap & Sacred Pheras',
    category: 'Wedding',
    desc: 'Classical rituals captured with golden warmth and sacred elegance.'
  },
  {
    id: 2,
    src: '/photography/DSC01985.jpg',
    title: 'Timeless Bridal Elegance',
    category: 'Wedding',
    desc: 'Authentic emotion, jewelry details, and radiant bridal glow.'
  },
  {
    id: 3,
    src: '/photography/DSC02584.JPG',
    title: 'Golden Hour Pre-Wedding Romance',
    category: 'Pre-Wedding',
    desc: 'Cinematic sunset tones and dreamy couple portraits.'
  },
  {
    id: 4,
    src: '/photography/DSC07314_copy.jpg',
    title: 'Intimate Vows & Floral Stages',
    category: 'Wedding',
    desc: 'Luxury mandap decor framed in exquisite detail.'
  },
  {
    id: 5,
    src: '/photography/DSC07319_copy.jpg',
    title: 'Grand Couple Grand Entry',
    category: 'Wedding',
    desc: 'Stage lights, cold fire sparkles, and unforgettable entrance walks.'
  }
];

const allGalleryPhotos = [
  {
    id: 1,
    src: '/photography/DSC01961.jpg',
    caption: 'Sacred pheras & royal ceremonies captured with classical elegance.',
    category: 'Wedding',
    aspect: 'portrait'
  },
  {
    id: 2,
    src: '/photography/DSC01985.jpg',
    caption: 'Timeless bridal glow and emotion in pure natural light.',
    category: 'Wedding',
    aspect: 'portrait'
  },
  {
    id: 3,
    src: '/photography/DSC02584.JPG',
    caption: 'Dreamy golden hour romance and cinematic compositions.',
    category: 'Pre-Wedding',
    aspect: 'landscape'
  },
  {
    id: 4,
    src: '/photography/DSC02691.JPG',
    caption: 'Colors, authentic smiles, and energetic festive rituals.',
    category: 'Wedding',
    aspect: 'landscape'
  },
  {
    id: 5,
    src: '/photography/DSC07290_copy.jpg',
    caption: 'Grand aerial perspectives capturing the full venue architecture.',
    category: 'Wedding',
    aspect: 'landscape'
  },
  {
    id: 6,
    src: '/photography/DSC07314_copy.jpg',
    caption: 'Intimate vows and royal mandap florals crafted to perfection.',
    category: 'Wedding',
    aspect: 'portrait'
  },
  {
    id: 7,
    src: '/photography/DSC07319_copy.jpg',
    caption: 'Stunning couple entry with modern stage lights and sparkle.',
    category: 'Wedding',
    aspect: 'portrait'
  },
  {
    id: 8,
    src: '/photography/DSC07330_copy.jpg',
    caption: 'Magazine-grade posing and bespoke editorial color tones.',
    category: 'Pre-Wedding',
    aspect: 'portrait'
  },
  {
    id: 9,
    src: '/photography/DSC07363_copy.jpg',
    caption: 'High-octane dance performances and heartfelt family moments.',
    category: 'Wedding',
    aspect: 'landscape'
  },
  {
    id: 10,
    src: '/photography/DSC07631_copy.jpg',
    caption: 'Breathtaking backdrops across Pune, Ahilyanagar & beyond.',
    category: 'Pre-Wedding',
    aspect: 'portrait'
  },
  {
    id: 11,
    src: '/photography/DSC07674_copy.jpg',
    caption: 'Generational blessings captured with emotional depth.',
    category: 'Wedding',
    aspect: 'landscape'
  }
];

const eventOptions = [
  'Haldi', 'Mehendi', 'Sangeet', 'Wedding', 
  'Reception', 'Engagement', 'Prewedding', 'Other'
];

const Photography = () => {
  const formRef = useRef(null);
  const targetPhone = '917559200988';
  const altPhones = '+91 7559200988 / 9763213440 / 9763822037';
  const emailContact = 'APG123@gmail.com';

  // 3D Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Form states
  const [groomName, setGroomName] = useState('');
  const [brideName, setBrideName] = useState('');
  const [phone, setPhone] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedEvents, setSelectedEvents] = useState(['Wedding', 'Reception']);
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('वाहेगाव / छत्रपती संभाजीनगर / पुणे');
  const [serviceType, setServiceType] = useState('Both'); // 'Photography', 'Films', 'Both'
  const [notes, setNotes] = useState('');

  // Auto advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const toggleEventTag = (eventTag) => {
    if (selectedEvents.includes(eventTag)) {
      setSelectedEvents(selectedEvents.filter((item) => item !== eventTag));
    } else {
      setSelectedEvents([...selectedEvents, eventTag]);
    }
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Build inquiry message
  const constructMessage = () => {
    return (
      `📸 *Wedding Photography & Cinematography Enquiry*\n` +
      `*APG Event Decorators & Media Team*\n\n` +
      `🤵 *Groom:* ${groomName || 'N/A'}\n` +
      `👰 *Bride:* ${brideName || 'N/A'}\n` +
      `📞 *Phone:* ${phone || 'Not provided'}\n` +
      `📅 *Dates:* ${startDate || 'TBD'} to ${endDate || 'TBD'}\n` +
      `🎉 *Events:* ${selectedEvents.length ? selectedEvents.join(', ') : 'All Events'}\n` +
      `🎬 *Service:* ${serviceType}\n` +
      `💰 *Estimated Budget:* ${budget || 'Flexible'}\n` +
      `📍 *Location:* ${location}\n` +
      (notes ? `💬 *Vision / Notes:* ${notes}\n` : '') +
      `\n📍 *Office:* वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar`
    );
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    if (!phone) {
      toast.error('Please enter your WhatsApp phone number');
      return;
    }
    const message = constructMessage();
    const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
    toast.success('Redirecting to WhatsApp to send your inquiry!');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyDetails = () => {
    const message = constructMessage();
    navigator.clipboard.writeText(message);
    toast.success('Enquiry details copied to clipboard!');
  };

  // Filtered gallery
  const filteredPhotos = filter === 'All' 
    ? allGalleryPhotos 
    : allGalleryPhotos.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-[#f7f3f0] text-[#2c2a28] font-sans overflow-x-hidden selection:bg-[#a07355]/20 selection:text-[#2c2a28]">
      
      {/* Decorative Warm Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#a07355]/15 via-[#b78c7a]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] bg-[#a07355]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 -right-20 w-[500px] h-[500px] bg-[#b78c7a]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 pt-10 sm:pt-16 pb-20 px-3 sm:px-6 md:px-12 max-w-7xl mx-auto space-y-16 sm:space-y-24">
        
        {/* =========================================================================
            1. HERO SECTION
           ========================================================================= */}
        <section className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-serif font-medium bg-[#a07355]/10 text-[#a07355] border border-[#a07355]/30">
              <Camera className="w-3.5 h-3.5" />
              Photography &amp; Cinematography
            </span>
            <span className="text-xs text-[#8c7e75] font-serif hidden xs:inline">•</span>
            <span className="text-[11px] sm:text-xs text-[#8c7e75] font-serif font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#a07355]" />
              वाहेगाव • Chha. Sambhajinagar • Pune, Maharashtra
            </span>
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-[#2c2a28] tracking-tight leading-tight">
            Capturing Life's <span className="text-[#a07355] italic font-serif">Grandest Moments</span> from Earth &amp; Sky
          </h1>

          <p className="text-xs sm:text-base text-[#6b5e55] font-serif max-w-2xl mx-auto leading-relaxed font-normal">
            Royal weddings, cinematic drone films, and editorial portraits — composed with the grandeur of Indian heritage and the precision of aerial craft.
          </p>

          <div className="flex flex-col xs:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={scrollToForm}
              className="w-full xs:w-auto px-6 py-3 bg-[#a07355] hover:bg-[#8c5e42] active:scale-95 text-white font-serif font-bold text-xs sm:text-sm rounded-full shadow-lg transition-all duration-300 hover:shadow-[#a07355]/25 hover:scale-[1.02] touch-manipulation"
            >
              Book Your Wedding Shoot
            </button>

            <a
              href={`https://wa.me/${targetPhone}?text=${encodeURIComponent('Hi APG Event Decorators & Media Team, I would like to inquire about wedding photography & cinematography shoots.')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full xs:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-serif font-bold text-xs sm:text-sm rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2 touch-manipulation"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct Inquiry</span>
            </a>
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE 3D FEATURED CAROUSEL
           ========================================================================= */}
        <section className="relative w-full max-w-5xl mx-auto">
          <div className="relative w-full h-[320px] sm:h-[430px] md:h-[500px] flex items-center justify-center perspective-[1200px]">
            {carouselImages.map((img, index) => {
              const diff = (index - currentIndex + carouselImages.length) % carouselImages.length;
              let styleClasses = "opacity-0 pointer-events-none scale-75";
              let zIdx = 0;

              if (diff === 0) {
                // Active Card in Center
                styleClasses = "opacity-100 scale-100 z-30 translate-x-0 ring-4 ring-[#a07355] ring-offset-4 ring-offset-[#f7f3f0] shadow-2xl";
                zIdx = 30;
              } else if (diff === 1 || diff === -(carouselImages.length - 1)) {
                // Right Card
                styleClasses = "opacity-60 scale-85 sm:scale-90 z-20 translate-x-[35%] sm:translate-x-[48%] md:translate-x-[55%] filter blur-[1px] hover:blur-0";
                zIdx = 20;
              } else if (diff === carouselImages.length - 1 || diff === -1) {
                // Left Card
                styleClasses = "opacity-60 scale-85 sm:scale-90 z-20 -translate-x-[35%] sm:-translate-x-[48%] md:-translate-x-[55%] filter blur-[1px] hover:blur-0";
                zIdx = 20;
              }

              return (
                <div
                  key={img.id}
                  onClick={() => setCurrentIndex(index)}
                  style={{ zIndex: zIdx }}
                  className={`absolute w-[220px] sm:w-[320px] md:w-[420px] aspect-[4/5] rounded-3xl overflow-hidden group select-none cursor-pointer transition-all duration-700 ease-out ${styleClasses}`}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2c2a28]/90 via-[#2c2a28]/25 to-transparent p-5 sm:p-6 flex flex-col justify-end text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#e8cbb6] bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full w-fit mb-1 border border-[#a07355]/40">
                      {img.category}
                    </span>
                    <h3 className="text-sm sm:text-lg font-serif font-bold text-white drop-shadow-md">
                      {img.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-white/80 line-clamp-2 mt-0.5 font-sans">
                      {img.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Navigation Arrows & Dots */}
          <div className="flex items-center justify-between mt-6 px-4 max-w-md mx-auto">
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#4a3f38] shadow-md hover:shadow-lg border border-[#ded3ca] flex items-center justify-center transition-all active:scale-95 touch-manipulation"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {carouselImages.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentIndex(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === dotIdx 
                      ? 'w-7 bg-[#a07355]' 
                      : 'w-2 bg-[#ded3ca] hover:bg-[#bfae9e]'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#4a3f38] shadow-md hover:shadow-lg border border-[#ded3ca] flex items-center justify-center transition-all active:scale-95 touch-manipulation"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* =========================================================================
            3. WEDDING ENQUIRY FORM
           ========================================================================= */}
        <section ref={formRef} className="max-w-3xl mx-auto w-full scroll-mt-24">
          <div className="bg-white/85 backdrop-blur-md border border-[#ded3ca] rounded-3xl p-5 sm:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Top decorative badge */}
            <div className="text-center space-y-2 mb-8">
              <span className="text-[11px] font-serif font-bold uppercase tracking-widest text-[#a07355] bg-[#a07355]/10 px-3 py-1 rounded-full border border-[#a07355]/20">
                Direct Booking &amp; Estimates
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2c2a28]">
                Wedding Enquiry Form
              </h2>
              <p className="text-xs sm:text-sm text-[#7a6b61] font-serif">
                Share your dates, vision, and special moments with us. We'll craft a personalized proposal and reach out immediately.
              </p>
            </div>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-5 sm:space-y-6">
              
              {/* Groom & Bride Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-serif font-medium text-[#4a3f38]">Groom Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul"
                    value={groomName}
                    onChange={(e) => setGroomName(e.target.value)}
                    className="w-full px-4 py-2.5 sm:py-3 bg-white border border-[#ded3ca] rounded-xl text-[#2c2a28] placeholder:text-[#a89c93] focus:outline-none focus:border-[#a07355] focus:ring-2 focus:ring-[#a07355]/20 text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-serif font-medium text-[#4a3f38]">Bride Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ananya"
                    value={brideName}
                    onChange={(e) => setBrideName(e.target.value)}
                    className="w-full px-4 py-2.5 sm:py-3 bg-white border border-[#ded3ca] rounded-xl text-[#2c2a28] placeholder:text-[#a89c93] focus:outline-none focus:border-[#a07355] focus:ring-2 focus:ring-[#a07355]/20 text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Phone with WhatsApp Indicator */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-serif font-medium text-[#4a3f38]">Phone Number *</label>
                  <span className="text-[11px] text-[#25D366] font-medium flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> WhatsApp Enabled
                  </span>
                </div>
                <input
                  type="tel"
                  required
                  placeholder="+91 7559200988"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 bg-white border border-[#ded3ca] rounded-xl text-[#2c2a28] placeholder:text-[#a89c93] focus:outline-none focus:border-[#a07355] focus:ring-2 focus:ring-[#a07355]/20 text-xs sm:text-sm"
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-serif font-medium text-[#4a3f38]">Event Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-2.5 sm:py-3 bg-white border border-[#ded3ca] rounded-xl text-[#2c2a28] focus:outline-none focus:border-[#a07355] text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-serif font-medium text-[#4a3f38]">Event End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-2.5 sm:py-3 bg-white border border-[#ded3ca] rounded-xl text-[#2c2a28] focus:outline-none focus:border-[#a07355] text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Select Events (Checkboxes / Pills) */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-serif font-medium text-[#4a3f38] block">
                  Select Your Events (Tick all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {eventOptions.map((opt) => {
                    const isChecked = selectedEvents.includes(opt);
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => toggleEventTag(opt)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-serif font-medium border transition-all active:scale-95 touch-manipulation flex items-center gap-1.5 ${
                          isChecked
                            ? 'bg-[#a07355] text-white border-[#a07355] shadow-xs'
                            : 'bg-white text-[#6b5e55] border-[#ded3ca] hover:border-[#a07355]/60'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-serif font-medium text-[#4a3f38]">Your Estimate Budget for Event</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹50,000 - ₹2,00,000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-2.5 sm:py-3 bg-white border border-[#ded3ca] rounded-xl text-[#2c2a28] placeholder:text-[#a89c93] focus:outline-none focus:border-[#a07355] text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-serif font-medium text-[#4a3f38]">Location of Event</label>
                  <input
                    type="text"
                    placeholder="e.g. वाहेगाव / छत्रपती संभाजीनगर / पुणे"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 sm:py-3 bg-white border border-[#ded3ca] rounded-xl text-[#2c2a28] placeholder:text-[#a89c93] focus:outline-none focus:border-[#a07355] text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Service Type Selection */}
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-serif font-medium text-[#4a3f38] block">
                  What service are you looking for?
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {['Photography', 'Films', 'Both'].map((st) => (
                    <button
                      type="button"
                      key={st}
                      onClick={() => setServiceType(st)}
                      className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-serif font-medium border text-center transition-all active:scale-95 touch-manipulation ${
                        serviceType === st
                          ? 'bg-[#a07355] text-white border-[#a07355] shadow-xs'
                          : 'bg-white text-[#6b5e55] border-[#ded3ca] hover:border-[#a07355]/60'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-serif font-medium text-[#4a3f38]">Tell us more about your wedding thoughts</label>
                <textarea
                  rows="3"
                  placeholder="Share details like drone requirements, traditional mandap coverage, venue, special surprises..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-4 bg-white border border-[#ded3ca] rounded-xl text-[#2c2a28] placeholder:text-[#a89c93] focus:outline-none focus:border-[#a07355] text-xs sm:text-sm"
                ></textarea>
              </div>

              {/* Actions: WhatsApp Submit & Copy */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-serif font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 touch-manipulation"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Submit Enquiry via WhatsApp</span>
                </button>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7a6b61] pt-1">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-[#a07355]" />
                    <span>Direct Helpline: <strong>+91 7559200988</strong></span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyDetails}
                    className="inline-flex items-center gap-1.5 text-[#a07355] hover:text-[#8c5e42] font-semibold hover:underline"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy details to clipboard</span>
                  </button>
                </div>
              </div>

            </form>
          </div>
        </section>

        {/* =========================================================================
            4. SELECTED WORKS & FEATURED GALLERY
           ========================================================================= */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <span className="text-[11px] font-serif font-bold uppercase tracking-widest text-[#a07355] bg-[#a07355]/10 px-3.5 py-1 rounded-full border border-[#a07355]/20">
              Selected Works
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#2c2a28]">
              Featured Gallery
            </h2>
            <p className="text-xs sm:text-sm text-[#7a6b61] font-serif max-w-xl mx-auto">
              Every frame curated with rich editorial color grading, real emotion, and timeless storytelling.
            </p>

            {/* Filter Tabs */}
            <div className="flex items-center justify-center gap-2 pt-2">
              {['All', 'Wedding', 'Pre-Wedding'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-serif font-bold transition-all active:scale-95 touch-manipulation ${
                    filter === tab
                      ? 'bg-[#a07355] text-white shadow-md'
                      : 'bg-white text-[#6b5e55] border border-[#ded3ca] hover:border-[#a07355]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative bg-white rounded-3xl overflow-hidden border border-[#ded3ca] shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between"
              >
                <div className="overflow-hidden aspect-[4/5] bg-slate-900 relative">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <span className="text-xs text-white font-serif flex items-center gap-1.5 bg-black/50 backdrop-blur-xs px-3 py-1.5 rounded-full">
                      <Eye className="w-3.5 h-3.5 text-[#e8cbb6]" />
                      Click to expand
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 bg-white space-y-1 border-t border-[#f0e8e2]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#a07355] bg-[#a07355]/10 px-2.5 py-0.5 rounded-full inline-block">
                    {photo.category}
                  </span>
                  <p className="text-xs sm:text-sm text-[#4a3f38] font-serif leading-snug font-medium line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            5. ABOUT THE PHOTOGRAPHER & TEAM
           ========================================================================= */}
        <section className="bg-white/85 border border-[#ded3ca] rounded-3xl p-6 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-52 sm:w-64 aspect-[4/5] rounded-3xl overflow-hidden ring-4 ring-[#a07355]/40 shadow-2xl">
                <img
                  src="/photography/DSC01961.jpg"
                  alt="Photography Team at APG"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c2a28]/80 to-transparent flex items-end p-4">
                  <span className="text-xs text-white font-serif font-bold">
                    APG Photography &amp; Films
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 space-y-4 text-center md:text-left">
              <span className="text-[11px] font-serif font-bold uppercase tracking-widest text-[#a07355] bg-[#a07355]/10 px-3 py-1 rounded-full border border-[#a07355]/20">
                Craft &amp; Experience
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2c2a28]">
                About the Photography Team
              </h2>
              <p className="text-xs sm:text-sm text-[#6b5e55] font-serif leading-relaxed">
                I am a passionate photographer and cinematographer based in Ahilyanagar, Pune &amp; Chh. Sambhajinagar. With over 4 years of experience capturing life's most precious occasions, I specialize in royal wedding photography, cinematic drone films, and timeless portraits.
              </p>
              
              <blockquote className="border-l-4 border-[#a07355] pl-4 py-1 italic text-xs sm:text-sm text-[#7a6b61] font-serif">
                "Every picture is a sacred heirloom of love. We blend state-of-the-art Sony cinema cameras and DJI drones with authentic Indian emotion."
              </blockquote>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#ded3ca]/70 max-w-md mx-auto md:mx-0">
                <div className="text-center p-3 rounded-2xl bg-[#f7f3f0] border border-[#ded3ca]">
                  <div className="text-lg sm:text-2xl font-serif font-black text-[#a07355]">250+</div>
                  <div className="text-[10px] sm:text-xs text-[#7a6b61] font-medium">Shoots Done</div>
                </div>
                <div className="text-center p-3 rounded-2xl bg-[#f7f3f0] border border-[#ded3ca]">
                  <div className="text-lg sm:text-2xl font-serif font-black text-[#a07355]">100%</div>
                  <div className="text-[10px] sm:text-xs text-[#7a6b61] font-medium">Smiles</div>
                </div>
                <div className="text-center p-3 rounded-2xl bg-[#f7f3f0] border border-[#ded3ca]">
                  <div className="text-lg sm:text-2xl font-serif font-black text-[#a07355]">4+</div>
                  <div className="text-[10px] sm:text-xs text-[#7a6b61] font-medium">Years Exp.</div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            6. CALL TO ACTION BANNER
           ========================================================================= */}
        <section className="bg-gradient-to-r from-[#2c2a28] via-[#3a3530] to-[#2c2a28] text-white p-8 sm:p-12 rounded-3xl shadow-2xl text-center space-y-4">
          <span className="text-[11px] font-serif font-bold uppercase tracking-widest text-[#e8cbb6] bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
            Let's Create Magic Together
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
            Ready to Capture Your Story?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-serif max-w-xl mx-auto">
            From grand royal weddings in Chh. Sambhajinagar &amp; Wahegaon to destination drone shoots across Maharashtra, let's preserve your most precious moments forever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              onClick={scrollToForm}
              className="w-full sm:w-auto px-6 py-3 bg-[#a07355] hover:bg-[#8c5e42] active:scale-95 text-white font-serif font-bold text-xs sm:text-sm rounded-full shadow-lg transition-all touch-manipulation"
            >
              Fill Booking Form
            </button>

            <a
              href={`https://wa.me/${targetPhone}?text=${encodeURIComponent('Hi APG Event Decorators, I would like to book wedding photography & cinematography!')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-serif font-bold text-xs sm:text-sm rounded-full shadow-lg transition-all flex items-center justify-center gap-2 touch-manipulation"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp (+91 7559200988)</span>
            </a>
          </div>
        </section>

      </div>

      {/* =========================================================================
          7. LIGHTBOX MODAL
         ========================================================================= */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative text-[#2c2a28]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors active:scale-95 touch-manipulation"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[65vh] w-full bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.caption}
                className="max-h-[65vh] w-full object-contain"
              />
            </div>

            <div className="p-5 sm:p-6 space-y-3 bg-[#f7f3f0]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#a07355] bg-[#a07355]/10 px-3 py-1 rounded-full border border-[#a07355]/20">
                  {selectedPhoto.category}
                </span>
                <span className="text-xs text-[#7a6b61] font-serif">
                  APG Photography Portfolio
                </span>
              </div>

              <p className="text-sm sm:text-base text-[#2c2a28] font-serif font-medium">
                {selectedPhoto.caption}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#ded3ca]">
                <span className="text-xs text-[#7a6b61]">
                  Helpline: <strong>+91 7559200988</strong>
                </span>

                <a
                  href={`https://wa.me/${targetPhone}?text=${encodeURIComponent(`Hi APG Photography Team, I saw this photo from your gallery ("${selectedPhoto.caption}") and want to inquire for our event!`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-serif font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all touch-manipulation"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Inquire About This Shoot</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Photography;

