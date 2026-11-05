import { allServicesData } from './servicesData';

export const initialGalleryItems = [
  // Wedding
  {
    id: 1,
    title: 'Royal Destination Mandap & Floral Setup',
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    description: 'Grand outdoor wedding ceremony with royal mandap decor, pink & white roses, luxury aisle seating, and traditional mandap stage setup.',
    location: 'वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar, India'
  },
  {
    id: 2,
    title: 'Grand Palace Sangeet & Reception Night',
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    description: 'Bespoke stage lighting, chandelier arrangements, live acoustic performance, and royal banquet feast for wedding reception.',
    location: 'वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar, India'
  },
  {
    id: 3,
    title: 'Luxury Beachside Sunset Wedding',
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    description: 'Elegant seaside wedding mandap setup with draped white canopy, floral arches, and sunset ocean view.',
    location: 'वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar, India'
  },
  // Birthday
  {
    id: 4,
    title: 'Grand 1st Birthday Theme Party',
    category: 'Birthday',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    description: 'Pastel balloon arches, custom cake tables, magic shows, photobooths, and interactive fun zone for kids.',
    location: 'वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar, India'
  },
  {
    id: 5,
    title: 'Milestone 25th Silver Birthday Gala',
    category: 'Birthday',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
    description: 'Neon rooftop party setup with DJ console, sparkling mocktail bar, theme lighting, and photobooth.',
    location: 'वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar, India'
  },
  // Corporate
  {
    id: 6,
    title: 'Global Tech & Leadership Summit 2026',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    description: 'Annual corporate convention featuring LED video walls, keynote stages, delegate registration, and VIP lounges.',
    location: 'वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar, India'
  },
  // Engagement
  {
    id: 8,
    title: 'Fairytale Floral Arch Ring Ceremony',
    category: 'Engagement',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    description: 'Romantic floral arch setup with baby breath roses, fairy fairy lights, violin performance, and couple entry aisle.',
    location: 'वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar, India'
  },
  // Family & Haldi
  {
    id: 12,
    title: 'Haldi & Mehendi Yellow Floral Decor',
    category: 'Family Functions',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
    description: 'Traditional yellow marigold backdrop, brass urli with rose petals, Rajasthani umbrella drapes, and festive floor seating.',
    location: 'वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar, India'
  }
];

export const initialHomeBanner = {
  heroImage: '/hero-mandap.jpg',
  logoImage: '/logo.png',
  badgeMr: 'APG EVENT DECORATORS • वाहेगाव (VAHEGAON)',
  badgeEn: 'APG EVENT DECORATORS • WAHEGAON',
  titleMr: 'तुमच्या प्रत्येक सोहळ्याला देऊ शाही व देखणे रूप!',
  titleEn: '',
  subtitleMr: 'ए.पी.जी. इव्हेंट डेकोरेटर्स, वाहेगाव — Event & Wedding Decor Specialist',
  subtitleEn: 'APG Event Decorators, Wahegaon — Event & Wedding Decor Specialist',
  overviewMr: 'वाढदिवस समारंभ • डोहाळे जेवण • लग्न समारंभ • उद्घाटन सोहळा • नामकरण सोहळा • लग्न गाडी सजावट • हळदी / मेहंदी समारंभ',
  overviewEn: 'Birthdays • Dohale Jevan • Wedding Mandap • Inaugurations • Naming Ceremonies • Car Decor • Haldi / Mehendi'
};

export const initialContactInfo = {
  phone1: '7559200988',
  phone2: '9763213440',
  phone3: '9763822037',
  email: 'APG123@gmail.com',
  addressMr: 'वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar',
  addressEn: 'Wahegaon, Tal. Paithan, Dist. Chha. Sambhajinagar, Maharashtra'
};

export const getStoredServices = () => {
  try {
    const saved = localStorage.getItem('apg_services_data');
    return saved ? JSON.parse(saved) : allServicesData;
  } catch (e) {
    return allServicesData;
  }
};

export const saveStoredServices = (data) => {
  localStorage.setItem('apg_services_data', JSON.stringify(data));
};

export const getStoredGallery = () => {
  try {
    const saved = localStorage.getItem('apg_gallery_data');
    return saved ? JSON.parse(saved) : initialGalleryItems;
  } catch (e) {
    return initialGalleryItems;
  }
};

export const saveStoredGallery = (data) => {
  localStorage.setItem('apg_gallery_data', JSON.stringify(data));
};

export const getStoredBanner = () => {
  try {
    const saved = localStorage.getItem('apg_banner_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      let changed = false;
      if (!parsed.heroImage || parsed.heroImage.includes('unsplash.com')) {
        parsed.heroImage = '/hero-mandap.jpg';
        changed = true;
      }
      if (parsed.titleEn === 'We will plan every detail of your dream event!' || (parsed.titleEn && parsed.titleEn.includes('dream event'))) {
        parsed.titleEn = '';
        changed = true;
      }
      if (changed) {
        try { localStorage.setItem('apg_banner_data', JSON.stringify(parsed)); } catch (err) {}
      }
      return parsed;
    }
    return initialHomeBanner;
  } catch (e) {
    return initialHomeBanner;
  }
};

export const saveStoredBanner = (data) => {
  localStorage.setItem('apg_banner_data', JSON.stringify(data));
};

export const getStoredContact = () => {
  try {
    const saved = localStorage.getItem('apg_contact_data');
    return saved ? JSON.parse(saved) : initialContactInfo;
  } catch (e) {
    return initialContactInfo;
  }
};

export const saveStoredContact = (data) => {
  localStorage.setItem('apg_contact_data', JSON.stringify(data));
};
