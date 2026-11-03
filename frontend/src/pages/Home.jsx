import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Phone, MessageSquare, Image as ImageIcon } from 'lucide-react';
import { getStoredServices, getStoredBanner, getStoredContact } from '../data/imageManager';
import { useLanguage } from '../context/LanguageContext';

const sampleGallery = [
  {
    titleMr: 'शाही मंडप व स्टेज सजावट',
    titleEn: 'Royal Destination Mandap Setup',
    categoryMr: 'लग्न समारंभ',
    categoryEn: 'Wedding',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
  },
  {
    titleMr: 'ग्रँड वाढदिवस थीम पार्टी',
    titleEn: 'Milestone Theme Birthday Bash',
    categoryMr: 'वाढदिवस समारंभ',
    categoryEn: 'Birthday',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80'
  },
  {
    titleMr: 'भव्य उद्घाटन व कॉर्पोरेट स्टेज',
    titleEn: 'Grand Inauguration & Corporate Stage',
    categoryMr: 'उद्घाटन सोहळा',
    categoryEn: 'Inauguration',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
  },
  {
    titleMr: 'हळदी / मेहंदी पारंपरिक झेंडू थीम',
    titleEn: 'Haldi Marigold Floral Decor',
    categoryMr: 'हळदी / मेहंदी',
    categoryEn: 'Haldi / Mehendi',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80'
  },
  {
    titleMr: 'पारंपरिक डोहाळे जेवण झोपाळा',
    titleEn: 'Traditional Dohale Jevan Floral Jhula',
    categoryMr: 'डोहाळे जेवण',
    categoryEn: 'Baby Shower',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
  },
  {
    titleMr: 'लक्झरी लग्न गाडी सजावट',
    titleEn: 'Royal Wedding Car Floral Decor',
    categoryMr: 'लग्न गाडी सजावट',
    categoryEn: 'Car Decor',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80'
  }
];

const Home = () => {
  const { lang } = useLanguage();
  const [banner, setBanner] = useState(getStoredBanner);
  const [services, setServices] = useState(getStoredServices);
  const [contact, setContact] = useState(getStoredContact);

  useEffect(() => {
    setBanner(getStoredBanner());
    setServices(getStoredServices());
    setContact(getStoredContact());
  }, []);

  const targetPhone = `91${contact.phone1 || '7559200988'}`;

  return (
    <div className="space-y-16 bg-white text-slate-900 min-h-screen animate-fadeIn">
      
      {/* VIBRANT MANDAP HERO BANNER SECTION WITH ANIMATIONS */}
      <section className="relative min-h-[85vh] py-20 flex items-center justify-center overflow-hidden">
        
        {/* Mandap Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={banner.heroImage || "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=2000&q=90"}
            alt="Beachside Outdoor Wedding Mandap Stage Background"
            className="w-full h-full object-cover scale-105 filter brightness-85 transition-transform duration-1000 ease-out hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/50 to-slate-950/40" />
        </div>

        {/* Text & Buttons Directly Over Image */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-4 sm:space-y-6 my-auto text-white">
          
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-slate-950/85 backdrop-blur-md border border-amber-400/60 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-amber-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-2xl animate-float">
            <img src="/logo.png" alt="APG Logo" className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-amber-400 bg-black flex-shrink-0" />
            <span className="truncate max-w-[260px] sm:max-w-none">{lang === 'mr' ? (banner.badgeMr || 'APG EVENT DECORATORS • वाहेगाव') : (banner.badgeEn || 'APG EVENT DECORATORS • WAHEGAON')}</span>
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-7xl font-serif font-bold tracking-wide leading-tight drop-shadow-2xl animate-slideUp px-2">
            {lang === 'mr' ? (
              <>{banner.titleMr || 'तुमच्या प्रत्येक सोहळ्याला देऊ शाही व देखणे रूप!'}</>
            ) : (
              <>{banner.titleEn || 'We will plan every detail of your dream event!'}</>
            )}
          </h1>

          <h2 className="text-base xs:text-lg sm:text-2xl lg:text-3xl font-serif font-semibold text-amber-200 tracking-wider drop-shadow-lg animate-slideUp px-2" style={{ animationDelay: '0.2s' }}>
            {lang === 'mr' ? (banner.subtitleMr || 'ए.पी.जी. इव्हेंट डेकोरेटर्स, वाहेगाव — Event & Wedding Decor Specialist') : (banner.subtitleEn || 'APG Event Decorators, Wahegaon — Event & Wedding Decor Specialist')}
          </h2>

          <p className="text-slate-200 text-xs sm:text-sm lg:text-base font-sans max-w-3xl mx-auto leading-relaxed font-medium tracking-wide drop-shadow-md animate-slideUp px-2" style={{ animationDelay: '0.3s' }}>
            {lang === 'mr' 
              ? (banner.overviewMr || 'वाढदिवस समारंभ • डोहाळे जेवण • लग्न समारंभ • उद्घाटन सोहळा • नामकरण सोहळा • लग्न गाडी सजावट • हळदी / मेहंदी समारंभ')
              : (banner.overviewEn || 'Birthdays • Dohale Jevan • Wedding Mandap • Inaugurations • Naming Ceremonies • Car Decor • Haldi / Mehendi')}
          </p>

          <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-slideUp w-full max-w-md sm:max-w-none mx-auto" style={{ animationDelay: '0.4s' }}>
            <a
              href={`https://wa.me/${targetPhone}?text=${encodeURIComponent(
                lang === 'mr'
                  ? 'नमस्कार APG इव्हेंट डेकोरेटर्स, मला आमच्या सोहळ्याच्या डेकोरेशनबद्दल चौकशी करायची आहे.'
                  : 'Hi APG Event Decorators, I would like to plan my upcoming event decor with you in वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold uppercase tracking-wider text-xs px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 border border-emerald-400/30 touch-manipulation"
            >
              <MessageSquare className="w-4 h-4 flex-shrink-0" />
              <span>{lang === 'mr' ? 'व्हाट्सॲपवर संपर्क करा' : 'PLAN MY EVENT (WHATSAPP)'}</span>
            </a>

            <Link
              to="/gallery"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold uppercase tracking-wider text-xs px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 touch-manipulation"
            >
              <ImageIcon className="w-4 h-4 flex-shrink-0" />
              <span>{lang === 'mr' ? 'फोटो गॅलरी पहा' : 'VIEW OUR PORTFOLIO'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE OUR SERVICES SECTION (MARATHI & ENGLISH) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-slideUp">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-4 py-1.5 rounded-full border border-amber-200">
            {lang === 'mr' ? 'आमची खास सेवा' : 'Tailored Event Services'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-wide">
            {lang === 'mr' ? (
              <>आमची <span className="gradient-text-gold">डेकोरेशन व इव्हेंट सेवा</span></>
            ) : (
              <>Our Royal Event <span className="gradient-text-gold">Services & Categories</span></>
            )}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto font-medium">
            {lang === 'mr'
              ? 'वाहेगाव, पैठण व छत्रपती संभाजीनगरमधील प्रत्येक शुभकार्यासाठी भव्य, देखणी व वेळेत पूर्ण होणारी डेकोरेशन सेवा.'
              : 'Explore our complete event decor solutions designed for every occasion in Wahegaon, Tal. Paithan, Dist. Chha. Sambhajinagar.'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, idx) => {
            const IconComponent = item.icon;
            const title = lang === 'mr' ? item.titleMr : item.titleEn;
            const subtitle = lang === 'mr' ? item.subtitleMr : item.subtitleEn;
            return (
              <div
                key={item.id}
                className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-lg hover:shadow-2xl hover:border-amber-400 transition-all duration-500 transform hover:-translate-y-2 flex flex-col justify-between"
              >
                <div className="h-60 w-full overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                  
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-slate-200 p-2.5 rounded-2xl text-amber-700 shadow-md group-hover:rotate-12 transition-transform duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[11px] font-bold text-amber-300 bg-slate-950/80 backdrop-blur-xs px-3 py-1 rounded-full border border-amber-400/40">
                      {subtitle}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-serif text-slate-900 group-hover:text-amber-700 transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 font-sans line-clamp-2">
                      {lang === 'mr' ? item.descriptionMr : item.descriptionEn}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to={`/services#${item.id}`}
                      className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                    >
                      <span>{lang === 'mr' ? 'सविस्तर पहा' : 'View Details'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={`https://wa.me/${targetPhone}?text=${encodeURIComponent(
                        lang === 'mr'
                          ? `नमस्कार APG इव्हेंट डेकोरेटर्स, मला ${title} सेवेसाठी बुकिंग / चौकशी करायची आहे.`
                          : `Hi APG Event Decorators, I am interested in booking: ${title}.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 hover:scale-105"
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
      <section className="bg-slate-50 border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-8 space-y-10 animate-fadeIn">
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
              {lang === 'mr' ? 'छायाचित्रे' : 'Visual Highlights'}
            </span>
            <h2 className="text-3xl font-bold font-serif text-slate-900">
              {lang === 'mr' ? 'इव्हेंट फोटो गॅलरी' : 'Event Photo Portfolio'}
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              {lang === 'mr'
                ? 'वाहेगाव व परिसरात आम्ही केलेल्या विविध डेकोरेशनची एक झलक'
                : 'Glimpse of real organized celebrations in वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar'}
            </p>
          </div>

          <Link
            to="/gallery"
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-xl shadow-md hover:scale-105 transition-all flex items-center gap-2"
          >
            <ImageIcon className="w-4 h-4" />
            {lang === 'mr' ? 'संपूर्ण गॅलरी पहा' : 'View Full Photo Gallery'}
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleGallery.map((item, index) => (
            <Link
              key={index}
              to="/gallery"
              className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-zoomIn"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="h-64 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={lang === 'mr' ? item.titleMr : item.titleEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase text-amber-300 bg-slate-950/60 backdrop-blur-xs px-3 py-1 rounded-full w-fit mb-1 border border-amber-400/30">
                  {lang === 'mr' ? item.categoryMr : item.categoryEn}
                </span>
                <h4 className="text-base font-bold text-white font-serif group-hover:text-amber-300 transition-colors">
                  {lang === 'mr' ? item.titleMr : item.titleEn}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* DIRECT WHATSAPP INQUIRY BANNER WITH PULSE GLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 animate-pulseGlow rounded-3xl">
        <div className="p-8 sm:p-12 rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 via-white to-amber-50 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
              {lang === 'mr' ? 'थेट संपर्क व बुकिंग' : 'Direct Contact & Booking'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
              {lang === 'mr'
                ? 'तुमच्या सोहळ्याच्या देखण्या डेकोरेशनसाठी आजच संपर्क करा!'
                : 'Ready to Decorate Your Event in वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-medium">
              {lang === 'mr'
                ? 'शाही मंडप, फुलांची सजावट, रोषणाई, डोहाळे जेवण, वाढदिवस व सर्व सोहळ्यांसाठी थेट व्हॉट्सॲपवर संपर्क करा.'
                : 'Connect directly with APG Event Decorators (ए.पी.जी. इव्हेंट डेकोरेटर्स, वाहेगाव) on WhatsApp for royal mandap, lighting, flower decor, and event setups.'}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-700 font-semibold pt-2">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-amber-700" /> {lang === 'mr' ? contact.addressMr : contact.addressEn}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-emerald-700" /> +91 {contact.phone1} / {contact.phone2} / {contact.phone3}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
            <a
              href={`https://wa.me/${targetPhone}?text=${encodeURIComponent(
                lang === 'mr'
                  ? 'नमस्कार APG इव्हेंट डेकोरेटर्स, मला डेकोरेशन बुकिंगबद्दल चौकशी करायची आहे.'
                  : 'Hi APG Event Decorators, I would like to inquire about event decor setups in वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs hover:scale-105 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              {lang === 'mr' ? 'व्हॉट्सॲपवर चॅट करा (+91 7559200988)' : 'Chat on WhatsApp (+91 7559200988)'}
            </a>

            <Link
              to="/contact"
              className="bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-bold py-3.5 px-6 rounded-xl shadow-sm flex items-center justify-center gap-2 text-xs hover:scale-105 transition-all"
            >
              {lang === 'mr' ? 'मेसेज पाठवा' : 'Send Message'}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
