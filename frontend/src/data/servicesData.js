import { 
  Heart, Gift, Briefcase, Sparkles, GraduationCap, Home as HomeIcon, 
  Baby, Car, Palette, PartyPopper 
} from 'lucide-react';

export const allServicesData = [
  // New services from User's visiting card / banner
  {
    id: 'birthday-celebration',
    titleMr: 'वाढदिवस समारंभ',
    titleEn: 'Birthday Celebrations',
    subtitleMr: 'थीम बलून डेकोरेशन, केक टेबल व डीजे सेटअप',
    subtitleEn: 'Theme Balloon Decor, Cake Stage & Party Lighting',
    icon: Gift,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    descriptionMr: 'पहिला वाढदिवस, 25 वा सिल्व्हर ज्युबिली किंवा कोणताही खास वाढदिवस - आकर्षक थीम डेकोरेशन, बलून आर्च, केक स्टेज आणि स्पेशल लाइटिंगसह भव्य आयोजन.',
    descriptionEn: 'Grand birthday party decor, customized theme balloon arches, sparkling cake tables, neon lighting, photobooths, and kids party setups.',
    featuresMr: ['कस्टम थीम बलून आर्च व बॅकड्रॉप', 'केक कटिंग स्पेशल स्टेज सेटअप', 'पार्टी लाइटिंग व साऊंड सिस्टिम', 'फोटोबूथ व सेल्फी पॉईंट्स'],
    featuresEn: ['Custom Theme Balloon Arch', 'Cake Stage & Special Lighting', 'DJ Sound & Party Lighting', 'Selfie Photobooths']
  },
  {
    id: 'dohale-jevan',
    titleMr: 'डोहाळे जेवण',
    titleEn: 'Dohale Jevan (Baby Shower)',
    subtitleMr: 'पारंपरिक धनुष्यबाण व झोपाळा फुलांची सजावट',
    subtitleEn: 'Traditional Marathi Baby Shower Decor & Floral Swing',
    icon: Baby,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    descriptionMr: 'डोहाळे जेवणासाठी खास पारंपरिक महाराष्ट्रीयन पद्धतीची सजावट - फुलांनी सजवलेला झोपाळा (झुला), धनुष्यबाण, कमळ आसन आणि मनमोहक स्टेज डेकोर.',
    descriptionEn: 'Traditional Maharashtrian Dohale Jevan setup with royal floral swings (jhula), traditional props, lotus seating, and fragrant flower backdrops.',
    featuresMr: ['रॉयल फुलांचा झुला (झोपाळा) सजावट', 'पारंपरिक धनुष्यबाण व प्रॉप्स', 'कमळ आसन व रांगोळी सजावट', 'खास फोटो कॉर्नर व सेल्फी झोन'],
    featuresEn: ['Floral Swing (Jhula) Decoration', 'Traditional Props & Dhanushya-Baan', 'Lotus Seating & Floral Backdrop', 'Dedicated Photo Corner']
  },
  {
    id: 'wedding-ceremony',
    titleMr: 'लग्न समारंभ',
    titleEn: 'Wedding & Destination Marriages',
    subtitleMr: 'शाही मंडप, वरमाला स्टेज व भव्य प्रवेशद्वार',
    subtitleEn: 'Royal Mandap, Varmala Stage & Grand Entrance',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    descriptionMr: 'शाही व राजेशाही लग्न मंडप, आकर्षक वरमाला स्टेज, भव्य प्रवेशद्वार, फुलांची नक्षीदार सजावट आणि रोषणाईसह परिपूर्ण लग्न सोहळा.',
    descriptionEn: 'Complete luxury wedding decor with royal mandap, floral varmala stage, grand walkway canopy, crystal chandeliers, and ambient night lighting.',
    featuresMr: ['शाही राजस्थानी व फायबर मंडप', 'वरमाला स्टेज व स्पेशल एन्ट्री सेटअप', 'आकर्षक प्रवेशद्वार व पायघड्या', 'कारंजे, झुंबर व अँबियंट लाइटिंग'],
    featuresEn: ['Royal Mandap & Canopy Decor', 'Varmala Stage & Couple Entry', 'Grand Entrance Archway', 'Chandeliers & Ambient Lighting']
  },
  {
    id: 'opening-ceremony',
    titleMr: 'उद्घाटन सोहळा',
    titleEn: 'Opening Ceremony / Inauguration',
    subtitleMr: 'दुकान, शोरूम, ऑफिस व कंपनी उद्घाटन स्टेज',
    subtitleEn: 'Shop, Showroom, Office & Firm Grand Opening',
    icon: PartyPopper,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    descriptionMr: 'नवीन दुकान, शोरूम, हॉस्पिटल, संस्था किंवा ऑफिस उद्घाटनासाठी भव्य रिबन कटिंग स्टेज, बलून पिलर, रेड कार्पेट आणि पुष्प सजावट.',
    descriptionEn: 'Professional opening ceremony setups featuring red carpets, ribbon cutting stage, balloon pillars, entrance floral arches, and VIP guest seating.',
    featuresMr: ['रिबन कटिंग व दीपप्रज्वलन स्टेज', 'बलून पिलर व भव्य कमान', 'रेड कार्पेट व व्हीआयपी सोफा सिटिंग', 'साऊंड सिस्टिम व पुष्पगुच्छ व्यवस्था'],
    featuresEn: ['Ribbon Cutting & Lamp Stage', 'Balloon Pillars & Main Entrance', 'Red Carpet & VIP Sofa Seating', 'PA Sound & Fresh Bouquets']
  },
  {
    id: 'naming-ceremony',
    titleMr: 'नामकरण सोहळा (बारसं)',
    titleEn: 'Naming Ceremony (Barse)',
    subtitleMr: 'फुलांचा पाळणा, बाळकृष्ण थीम व आकर्षक बॅकड्रॉप',
    subtitleEn: 'Floral Cradle (Palna), Krishna Theme & Baby Stage',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
    descriptionMr: 'बाळाच्या नामकरण सोहळ्यासाठी खास सजवलेला फुलांचा पाळणा, बाळकृष्ण किंवा परी थीम, फुग्यांचे सुंदर तोरण आणि आनंददायी वातावरण.',
    descriptionEn: 'Enchanting baby naming ceremony decor featuring customized floral baby cradles (palna), Bal Krishna themes, pastel balloons, and fairy backdrops.',
    featuresMr: ['फुलांनी सजवलेला लाकडी/मेटल पाळणा', 'बाळकृष्ण / प्रिन्स-प्रिन्सेस थीम', 'पेस्टल कलर बलून व फुलांचा बॅकड्रॉप', 'नावाचे एलईडी / निऑन लेटर्स'],
    featuresEn: ['Customized Floral Cradle (Palna)', 'Prince / Princess / Krishna Theme', 'Pastel Balloons & Floral Backdrop', 'LED / Neon Baby Name Board']
  },
  {
    id: 'car-decoration',
    titleMr: 'लग्न गाडी सजावट',
    titleEn: 'Wedding Car Decoration',
    subtitleMr: 'ऑर्चिड्स, गुलाब, रिबन व फुलांची स्टायलिश गाडी सजावट',
    subtitleEn: 'Luxury Floral, Orchids, Roses & Ribbon Car Decor',
    icon: Car,
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    descriptionMr: 'नवरदेव व नवरीच्या गाडीसाठी ताजी फुले, ऑर्चिड्स, गुलाब, नेट व रिबनचा वापर करून आकर्षक आणि आधुनिक कार डेकोरेशन.',
    descriptionEn: 'Stylish bridal and groom wedding car decoration with fresh roses, exotic orchids, satin ribbons, net drapes, and bonnet floral bouquets.',
    featuresMr: ['ताजी लाल गुलाब व पांढरे ऑर्चिड्स', 'बॅनेट व डोअर हँडल्स डिझाईन', 'सॅटिन रिबन व नेट वर्क', 'दीर्घकाळ टिकणारी सुरक्षित फिटिंग'],
    featuresEn: ['Fresh Roses & Exotic Orchids', 'Bonnet & Door Handle Styling', 'Satin Ribbons & Designer Netting', 'Scratch-free Secure Fitting']
  },
  {
    id: 'haldi-mehendi',
    titleMr: 'हळदी / मेहंदी समारंभ',
    titleEn: 'Haldi / Mehendi Ceremony',
    subtitleMr: 'झेंडू फुलांची सजावट, हळद टब व रंगीबेरंगी राजस्थानी थीम',
    subtitleEn: 'Yellow Marigold Decor, Haldi Tub & Colorful Canopy',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
    descriptionMr: 'पिवळ्या झेंडूच्या फुलांनी सजवलेला हळदी स्टेज, पितळी हळदी टब (उरली), रंगीबेरंगी दुपट्टे, खाटा आणि मेहंदीसाठी सुंदर राजस्थानी वातावरण.',
    descriptionEn: 'Vibrant yellow marigold theme decor for Haldi and Mehendi functions featuring brass Urli tubs, colorful Rajasthani canopies, cushions, and photo backdrops.',
    featuresMr: ['पिवळ्या व केशरी झेंडू फुलांची थीम', 'रॉयल पितळी हळदी टब (उरली) व आसन', 'राजस्थानी छत्र्या व रंगीबेरंगी दुपट्टे', 'मेहंदी गाद्या व फोटो बूथ'],
    featuresEn: ['Yellow & Orange Marigold Themes', 'Brass Haldi Urli Tub & Wooden Stool', 'Colorful Drapes & Traditional Umbrellas', 'Mehendi Floor Seating & Photobooth']
  },

  // Existing additional services preserved
  {
    id: 'corporate-events',
    titleMr: 'कॉर्पोरेट व बिझनेस इव्हेंट्स',
    titleEn: 'Corporate & Business Events',
    subtitleMr: 'कॉन्फरन्स, अवॉर्ड नाईट व स्टेज व्यवस्था',
    subtitleEn: 'Conventions, Award Galas & Expos',
    icon: Briefcase,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    descriptionMr: 'मोठ्या कंपन्यांसाठी परिषद, वार्षिक स्नेहसंमेलन, अवॉर्ड सोहळे, एलईडी स्क्रीन व स्टेज व्यवस्थापन.',
    descriptionEn: 'High-impact corporate conventions, annual award galas, tech summits, product launch stages, and audio-visual conference setups.',
    featuresMr: ['एलईडी व्हिडिओ वॉल व स्टेज', 'व्हीआयपी सिटिंग सोय', 'माईक व साऊंड सिस्टिम', 'बॅक्वेट व केटरिंग व्यवस्था'],
    featuresEn: ['LED Video Wall & Stage Setup', 'VIP Seating & Delegate Pass Management', 'Live Speech & Microphone Systems', 'Corporate Catering & Banquet']
  },
  {
    id: 'college-events',
    titleMr: 'कॉलेज युथ फेस्टिव्हल्स व स्नेहसंमेलन',
    titleEn: 'College Cultural Events & Fests',
    subtitleMr: 'वार्षिक स्नेहसंमेलन, कॉन्सर्ट व स्टेज डेकोरेशन',
    subtitleEn: 'Youth Fests, Concerts & Annual Days',
    icon: GraduationCap,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    descriptionMr: 'कॉलेज फेस्ट, स्नेहसंमेलन, रॉक कॉन्सर्ट, स्पर्धा व फॅशन शो साठी भव्य स्टेज व भव्य रोषणाई.',
    descriptionEn: 'Inter-college youth festivals, rock band concerts, fashion walk stages, hackathon arenas, and annual day celebrations.',
    featuresMr: ['भव्य कॉन्सर्ट साऊंड सिस्टिम', 'स्पेशल इफेक्ट्स व लाइटिंग', 'स्टेज व कॉम्पिटिशन प्लॅटफॉर्म', 'गर्दी नियंत्रण व सुरक्षा व्यवस्था'],
    featuresEn: ['Concert Grade Sound Systems', 'Stage & Lighting Effects', 'Inter-College Competition Stages', 'Crowd Management & Setup']
  },
  {
    id: 'family-functions',
    titleMr: 'कौटुंबिक सोहळे व वास्तुशांत',
    titleEn: 'Family Functions & Celebrations',
    subtitleMr: 'वास्तुशांत, सत्यनारायण पूजा, 50 वी लग्नगाठ व स्नेहमेळावे',
    subtitleEn: 'Anniversaries, Housewarming & Pujas',
    icon: HomeIcon,
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
    descriptionMr: 'वास्तुशांती, 25 वी / 50 वी लग्नगाठ, सत्यनारायण महापूजा व कौटुंबिक स्नेहमेळाव्यांसाठी पारंपरिक फुलांची व मंडपाची सजावट.',
    descriptionEn: 'Warm, joyful family gatherings including 25th/50th wedding anniversaries, housewarming puja functions, and family reunions.',
    featuresMr: ['पारंपरिक झेंडू व शेवंती फुलांची सजावट', 'होम-हवन व पूजा मंडप', 'बैठक व्यवस्था व शामियाना', 'अन्नछत्र व डायनिंग एरिया व्यवस्था'],
    featuresEn: ['Traditional & Festive Floral Decor', 'Puja Mandap & Canopy Rentals', 'Seating & Carpet Arrangements', 'Dining & Banquet Setup']
  }
];

