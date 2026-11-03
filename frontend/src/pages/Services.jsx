import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle, MessageSquare } from 'lucide-react';
import { getStoredServices } from '../data/imageManager';
import { useLanguage } from '../context/LanguageContext';

const Services = () => {
  const targetPhone = '917559200988';
  const { lang } = useLanguage();
  const [servicesList, setServicesList] = useState(getStoredServices);

  useEffect(() => {
    setServicesList(getStoredServices());
  }, []);

  return (
    <div className="bg-white text-slate-900 min-h-screen py-8 sm:py-12 px-3 sm:px-6 lg:px-8 space-y-10 sm:space-y-16 animate-fadeIn">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4 px-2">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-100 px-3 sm:px-4 py-1.5 rounded-full border border-amber-200 inline-flex items-center gap-1.5 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
          <span>{lang === 'mr' ? 'ए.पी.जी. इव्हेंट डेकोरेटर्स — आमची सर्व सेवा' : 'APG Event Decorators — Comprehensive Services'}</span>
        </span>
        <h1 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-serif leading-tight">
          {lang === 'mr' ? (
            <>
              आमची शाही <span className="gradient-text-gold">डेकोरेशन व इव्हेंट सेवा</span>
            </>
          ) : (
            <>
              Luxury Event Planning & <span className="gradient-text-gold">Decor Services</span>
            </>
          )}
        </h1>
        <p className="text-slate-600 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
          {lang === 'mr'
            ? 'वाढदिवस, डोहाळे जेवण, लग्न समारंभ, उद्घाटन, नामकरण, लग्न गाडी सजावट व हळदी/मेहंदी सोहळ्यांसाठी वाहेगाव व संभाजीनगरमधील विश्वसनीय डेकोरेटर्स.'
            : 'From grand weddings and traditional Dohale Jevan to birthday bashes, inaugurations, naming ceremonies, wedding car decor, and Haldi celebrations in Wahegaon & Chha. Sambhajinagar.'}
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        {servicesList.map((service) => {
          const IconComponent = service.icon;
          const title = lang === 'mr' ? service.titleMr : service.titleEn;
          const subtitle = lang === 'mr' ? service.subtitleMr : service.subtitleEn;
          const description = lang === 'mr' ? service.descriptionMr : service.descriptionEn;
          const features = lang === 'mr' ? service.featuresMr : service.featuresEn;

          return (
            <div
              key={service.id}
              id={service.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-amber-400 transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-2xl hover:-translate-y-1.5 group"
            >
              <div>
                <div className="h-56 w-full overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 text-amber-700 shadow-md">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[11px] font-bold text-amber-300 bg-slate-950/80 backdrop-blur-xs px-3 py-1 rounded-full border border-amber-400/40">
                      {subtitle}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold font-serif text-slate-900 group-hover:text-amber-700 transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {description}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">
                      {lang === 'mr' ? 'प्रमुख वैशिष्ट्ये / समाविष्ट सेवा:' : 'Key Service Highlights:'}
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                      {features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`https://wa.me/${targetPhone}?text=${encodeURIComponent(
                    lang === 'mr'
                      ? `नमस्कार APG इव्हेंट डेकोरेटर्स, मला ${title} सेवेबद्दल चौकशी करायची आहे.`
                      : `Hi APG Event Decorators, I want to book/inquire about your ${title} service.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs transition-all hover:scale-[1.02]"
                >
                  <MessageSquare className="w-4 h-4" />
                  {lang === 'mr' ? `व्हाट्सॲपवर चौकशी करा (+91 7559200988)` : `Inquire / Book on WhatsApp (+91 7559200988)`}
                </a>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default Services;
