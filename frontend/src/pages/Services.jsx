import React from 'react';
import { Heart, Gift, Briefcase, Sparkles, GraduationCap, Home as HomeIcon, CheckCircle, MessageSquare, ArrowRight, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const servicesList = [
  {
    id: 'wedding',
    title: 'Wedding & Destination Marriages',
    icon: Heart,
    color: 'emerald',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    description: 'Complete luxury wedding planning including royal mandap decor, guest hospitality, sangeet lighting, bridal stage setup, and catering management in Ahilyanagar.',
    features: ['Royal Mandap & Floral Decor', 'Sangeet & DJ Sound Stage', 'Gourmet Catering & Menu Planning', 'Bridal & Groom Hospitality']
  },
  {
    id: 'birthday',
    title: 'Birthday Party Celebrations',
    icon: Gift,
    color: 'amber',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    description: 'Memorable birthday celebrations for 1st birthdays, milestone 25th/50th galas, theme balloon setups, cake ceremony, magic shows, and DJ sound systems.',
    features: ['Custom Theme Balloon Arch', 'DJ Sound & Party Lighting', 'Magician & Kids Entertainment', 'Custom Photobooths']
  },
  {
    id: 'corporate',
    title: 'Corporate & Business Events',
    icon: Briefcase,
    color: 'indigo',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    description: 'High-impact corporate conventions, annual award galas, tech summits, product launch stages, VIP delegate lounges, and audio-visual conference management.',
    features: ['LED Video Wall & Stage Setup', 'VIP Seating & Delegate Pass Management', 'Live Speech & Microphone Systems', 'Corporate Catering & Banquet']
  },
  {
    id: 'engagement',
    title: 'Ring Ceremony & Engagement Galas',
    icon: Sparkles,
    color: 'rose',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
    description: 'Fairytale engagement ring exchange events featuring elegant floral arches, champagne toast setups, acoustic live music, and professional photography.',
    features: ['Floral Arch Ring Exchange Stage', 'Acoustic & String Instrumentals', 'Custom Name Signboards', 'Photography & Videography']
  },
  {
    id: 'college',
    title: 'College Cultural Events & Fests',
    icon: GraduationCap,
    color: 'purple',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    description: 'Inter-college youth festivals, rock band concerts, fashion walk stages, hackathon arenas, and annual day celebrations managed with high security and energy.',
    features: ['Concert Grade Sound Systems', 'Celebrity Artist Coordination', 'Inter-College Competition Stages', 'Security & Crowd Control']
  },
  {
    id: 'family',
    title: 'Family Functions & Celebrations',
    icon: HomeIcon,
    color: 'cyan',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
    description: 'Warm, joyful family gatherings including 25th/50th wedding anniversaries, baby naming ceremonies, housewarming puja functions, and family reunions.',
    features: ['Traditional & Festive Floral Decor', 'Buffet & Traditional Feast Management', 'Family Slideshow Audio-Visual', 'Seating & Canopy Rentals']
  }
];

const Services = () => {
  const targetPhone = '919307189068';

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Royal Events Comprehensive Services
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
          Luxury Event Planning & <span className="gradient-text-gold">Management Services</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          From opulent weddings to high-energy corporate galas and intimate family functions in Ahilyanagar, we organize every detail with royal perfection.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesList.map((service) => {
          const IconComponent = service.icon;
          return (
            <div
              key={service.id}
              className="glass-card bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="h-52 w-full overflow-hidden relative">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-slate-950/80 p-3 rounded-2xl border border-slate-700 text-amber-400">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold font-serif text-white">{service.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{service.description}</p>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                      Included Service Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`https://wa.me/${targetPhone}?text=${encodeURIComponent(`Hi Royal Events, I want to book/inquire about your ${service.title} service in Ahilyanagar.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  Inquire / Book on WhatsApp (+91 9307189068)
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
