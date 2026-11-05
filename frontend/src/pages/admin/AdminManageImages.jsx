import React, { useState } from 'react';
import { 
  getStoredServices, saveStoredServices, 
  getStoredGallery, saveStoredGallery, 
  getStoredBanner, saveStoredBanner,
  getStoredContact, saveStoredContact 
} from '../../data/imageManager';
import { useAuth } from '../../context/AuthContext';
import { 
  Image as ImageIcon, Upload, Save, RefreshCw, LogOut, Check, 
  Sparkles, Layers, ShieldCheck, Plus, Trash2, ArrowUpRight, 
  Phone, Mail, MapPin, Edit3, FileText, Globe
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const AdminManageImages = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('services'); // 'services', 'gallery', 'banner', 'contact'

  // States
  const [banner, setBanner] = useState(getStoredBanner);
  const [services, setServices] = useState(getStoredServices);
  const [gallery, setGallery] = useState(getStoredGallery);
  const [contact, setContact] = useState(getStoredContact);

  // New gallery item state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Wedding');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Handle file upload to Base64
  const handleFileUpload = (file, callback) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be under 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
      toast.success('Image ready!');
    };
    reader.readAsDataURL(file);
  };

  // --- SERVICE EDIT HANDLERS ---
  const handleServiceFieldChange = (id, field, value) => {
    const updated = services.map(s => s.id === id ? { ...s, [field]: value } : s);
    setServices(updated);
  };

  const handleServiceFeaturesChange = (id, lang, commaSeparated) => {
    const arr = commaSeparated.split(',').map(item => item.trim()).filter(Boolean);
    const updated = services.map(s => {
      if (s.id === id) {
        return lang === 'mr' ? { ...s, featuresMr: arr } : { ...s, featuresEn: arr };
      }
      return s;
    });
    setServices(updated);
  };

  const handleSaveServices = () => {
    saveStoredServices(services);
    toast.success('All Services information & images saved!');
  };

  // --- GALLERY HANDLERS ---
  const handleGalleryFieldChange = (id, field, value) => {
    const updated = gallery.map(g => g.id === id ? { ...g, [field]: value } : g);
    setGallery(updated);
  };

  const handleAddGalleryItem = (e) => {
    e.preventDefault();
    if (!newImageUrl || !newTitle) {
      toast.error('Please provide a title and image');
      return;
    }
    const newItem = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      image: newImageUrl,
      description: newDesc || `${newTitle} by APG Event Decorators`,
      location: 'वाहेगाव (Wahegaon), Tal. Paithan ,Dist. Chha. Sambhajinagar, India'
    };
    const updated = [newItem, ...gallery];
    setGallery(updated);
    saveStoredGallery(updated);
    setNewTitle('');
    setNewImageUrl('');
    setNewDesc('');
    toast.success('New gallery photo & details added!');
  };

  const handleDeleteGallery = (id) => {
    const updated = gallery.filter(g => g.id !== id);
    setGallery(updated);
    saveStoredGallery(updated);
    toast.success('Photo removed from gallery');
  };

  const handleSaveGallery = () => {
    saveStoredGallery(gallery);
    toast.success('Gallery changes saved successfully!');
  };

  // --- BANNER HANDLERS ---
  const handleSaveBanner = () => {
    saveStoredBanner(banner);
    toast.success('Home Hero Banner details & image saved!');
  };

  // --- CONTACT INFO HANDLERS ---
  const handleSaveContact = () => {
    saveStoredContact(contact);
    toast.success('Contact numbers & address information saved!');
  };

  // --- RESET DEFAULTS ---
  const handleResetDefaults = () => {
    if (window.confirm('Reset all website info & images to initial factory defaults?')) {
      localStorage.removeItem('apg_services_data');
      localStorage.removeItem('apg_gallery_data');
      localStorage.removeItem('apg_banner_data');
      localStorage.removeItem('apg_contact_data');
      setBanner(getStoredBanner());
      setServices(getStoredServices());
      setGallery(getStoredGallery());
      setContact(getStoredContact());
      toast.success('Reset completed successfully');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-24">
      
      {/* Top Admin Navigation Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-lg safe-area-top">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-amber-500 bg-black flex-shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-bold text-xs sm:text-sm tracking-wide truncate">APG Admin Portal</span>
                <span className="bg-amber-500 text-slate-950 font-black text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full uppercase flex-shrink-0">
                  Admin
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 truncate hidden xs:block">Edit Images, Texts, Categories & Contacts</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 transition-colors active:scale-95 touch-manipulation"
            >
              <span>View Website</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleResetDefaults}
              className="text-[11px] sm:text-xs font-semibold text-amber-300 hover:text-amber-200 bg-amber-950/60 px-2.5 sm:px-3 py-1.5 rounded-xl border border-amber-800/80 transition-colors flex items-center gap-1 active:scale-95 touch-manipulation"
              title="Reset Defaults"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset Defaults</span>
            </button>

            <button
              onClick={logout}
              className="text-[11px] sm:text-xs font-bold text-red-300 hover:text-red-200 bg-red-950/60 px-2.5 sm:px-3 py-1.5 rounded-xl border border-red-800/80 transition-colors flex items-center gap-1 sm:gap-1.5 active:scale-95 touch-manipulation"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8 space-y-4 sm:space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-white p-1 sm:p-1.5 rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          <button
            onClick={() => setActiveTab('services')}
            className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap active:scale-95 touch-manipulation ${
              activeTab === 'services'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Services & Decor ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap active:scale-95 touch-manipulation ${
              activeTab === 'gallery'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Gallery ({gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('banner')}
            className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap active:scale-95 touch-manipulation ${
              activeTab === 'banner'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Hero Banner</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap active:scale-95 touch-manipulation ${
              activeTab === 'contact'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Contact & Info</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: SERVICES (IMAGE + MARATHI/ENGLISH INFORMATION)
           ========================================================================= */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-xl font-bold font-serif text-slate-900">Manage Services, Images & Information</h2>
                <p className="text-xs text-slate-500">
                  You can edit the image, Marathi title, English title, subtitle, descriptions and bullet-point highlights for every single service.
                </p>
              </div>
              <button
                onClick={handleSaveServices}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 text-xs transition-all flex-shrink-0"
              >
                <Save className="w-4 h-4" />
                <span>Save All Services</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md flex flex-col justify-between"
                >
                  <div className="p-6 space-y-5">
                    
                    {/* Header badge & title */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                          {index + 1}
                        </span>
                        <h3 className="font-bold text-slate-900 text-base">{service.titleMr}</h3>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">ID: {service.id}</span>
                    </div>

                    {/* Image Preview & Upload Row */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <div className="w-full sm:w-44 h-36 rounded-2xl overflow-hidden bg-slate-900 relative flex-shrink-0 border border-slate-200">
                        <img
                          src={service.image}
                          alt={service.titleEn}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 w-full space-y-2">
                        <div>
                          <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Image Web URL:</label>
                          <input
                            type="text"
                            value={service.image}
                            onChange={(e) => handleServiceFieldChange(service.id, 'image', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-600 block mb-0.5">Or Upload New Image:</label>
                          <label className="flex items-center justify-center gap-2 w-full py-2 px-3 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl cursor-pointer bg-slate-50 hover:bg-amber-50/50 transition-colors text-xs font-semibold text-slate-700">
                            <Upload className="w-3.5 h-3.5 text-amber-600" />
                            <span>Browse Computer File</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(file, (dataUrl) => {
                                    handleServiceFieldChange(service.id, 'image', dataUrl);
                                  });
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Text Fields: Marathi & English */}
                    <div className="space-y-4 pt-2 border-t border-slate-100">
                      
                      {/* Titles */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-amber-800 block mb-1">
                            मराठी नाव (Title MR):
                          </label>
                          <input
                            type="text"
                            value={service.titleMr}
                            onChange={(e) => handleServiceFieldChange(service.id, 'titleMr', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">
                            English Title:
                          </label>
                          <input
                            type="text"
                            value={service.titleEn}
                            onChange={(e) => handleServiceFieldChange(service.id, 'titleEn', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      {/* Subtitles */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-amber-800 block mb-1">
                            मराठी उपशीर्षक (Subtitle MR):
                          </label>
                          <input
                            type="text"
                            value={service.subtitleMr || ''}
                            onChange={(e) => handleServiceFieldChange(service.id, 'subtitleMr', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">
                            English Subtitle:
                          </label>
                          <input
                            type="text"
                            value={service.subtitleEn || ''}
                            onChange={(e) => handleServiceFieldChange(service.id, 'subtitleEn', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      {/* Descriptions */}
                      <div className="space-y-2">
                        <div>
                          <label className="text-[11px] font-bold text-amber-800 block mb-1">
                            मराठी माहिती व तपशील (Description MR):
                          </label>
                          <textarea
                            rows="2"
                            value={service.descriptionMr}
                            onChange={(e) => handleServiceFieldChange(service.id, 'descriptionMr', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">
                            English Description:
                          </label>
                          <textarea
                            rows="2"
                            value={service.descriptionEn}
                            onChange={(e) => handleServiceFieldChange(service.id, 'descriptionEn', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                      {/* Features / Highlights */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-amber-800 block mb-1">
                            वैशिष्ट्ये (Features MR - कॉमाने वेगळे करा):
                          </label>
                          <input
                            type="text"
                            value={(service.featuresMr || []).join(', ')}
                            onChange={(e) => handleServiceFeaturesChange(service.id, 'mr', e.target.value)}
                            placeholder="झुला, धनुष्यबाण, कमळ आसन"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-1">
                            Features EN (Comma-separated):
                          </label>
                          <input
                            type="text"
                            value={(service.featuresEn || []).join(', ')}
                            onChange={(e) => handleServiceFeaturesChange(service.id, 'en', e.target.value)}
                            placeholder="Mandap, Varmala Stage, Entrance"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Live preview updated on save</span>
                    <button
                      type="button"
                      onClick={() => {
                        saveStoredServices(services);
                        toast.success(`Saved all info for "${service.titleMr}"!`);
                      }}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Save This Service</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: GALLERY PHOTOS & INFORMATION
           ========================================================================= */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            
            {/* Add New Photo Form Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-slate-900 text-base">Add New Gallery Photo & Information</h3>
                </div>
                <button
                  onClick={handleSaveGallery}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2 text-xs transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Gallery Changes</span>
                </button>
              </div>

              <form onSubmit={handleAddGalleryItem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Photo Title / Caption</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. शाही मंडप व वरमाला स्टेज"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option value="Wedding">Wedding (लग्न समारंभ)</option>
                    <option value="Birthday">Birthday (वाढदिवस समारंभ)</option>
                    <option value="Dohale Jevan">Dohale Jevan (डोहाळे जेवण)</option>
                    <option value="Corporate">Corporate / Opening (उद्घाटन सोहळा)</option>
                    <option value="Engagement">Engagement / Naming (नामकरण सोहळा)</option>
                    <option value="Family Functions">Family & Haldi (हळदी/गाडी सजावट)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Description / Details</label>
                  <input
                    type="text"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Brief decor setup description..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Image URL or Local Upload</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="Paste Image URL"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                    />
                    <label className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer border border-slate-200 flex-shrink-0" title="Upload local file">
                      <Upload className="w-4 h-4 text-slate-700" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, setNewImageUrl);
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="sm:col-span-2 lg:col-span-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 px-6 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Photo to Gallery</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Gallery Edit Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md flex flex-col justify-between"
                >
                  <div className="p-5 space-y-4">
                    <div className="h-44 w-full overflow-hidden relative bg-slate-900 rounded-2xl">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 text-[10px] font-bold text-amber-300 bg-slate-950/80 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                        {item.category}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-0.5">Photo Title:</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleGalleryFieldChange(item.id, 'title', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-0.5">Category:</label>
                          <select
                            value={item.category}
                            onChange={(e) => handleGalleryFieldChange(item.id, 'category', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 text-xs focus:outline-none focus:border-amber-500"
                          >
                            <option value="Wedding">Wedding</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Corporate">Corporate</option>
                            <option value="Engagement">Engagement</option>
                            <option value="Family Functions">Family Functions</option>
                            <option value="College Events">College Events</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-700 block mb-0.5">Replace Image:</label>
                          <label className="flex items-center justify-center gap-1.5 w-full py-1.5 px-2 border border-slate-200 hover:border-amber-500 rounded-xl cursor-pointer bg-slate-50 text-xs font-semibold text-slate-700">
                            <Upload className="w-3.5 h-3.5 text-amber-600" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleFileUpload(file, (dataUrl) => {
                                    handleGalleryFieldChange(item.id, 'image', dataUrl);
                                  });
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-0.5">Image URL:</label>
                        <input
                          type="text"
                          value={item.image}
                          onChange={(e) => handleGalleryFieldChange(item.id, 'image', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-0.5">Description:</label>
                        <textarea
                          rows="2"
                          value={item.description || ''}
                          onChange={(e) => handleGalleryFieldChange(item.id, 'description', e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        saveStoredGallery(gallery);
                        toast.success(`Saved "${item.title}"!`);
                      }}
                      className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-1.5 rounded-xl text-xs flex items-center justify-center gap-1"
                    >
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Save Info</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteGallery(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl border border-red-200 transition-colors"
                      title="Remove from gallery"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 3: HOME HERO BANNER (IMAGE & TEXT INFORMATION)
           ========================================================================= */}
        {activeTab === 'banner' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900">Home Hero Banner Image & Headings</h3>
                <p className="text-xs text-slate-500">Edit the backdrop image and all main hero texts shown on the Home Page</p>
              </div>
              <button
                onClick={handleSaveBanner}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2 text-xs"
              >
                <Save className="w-4 h-4" />
                <span>Save Banner Details</span>
              </button>
            </div>

            {/* Current Preview */}
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200">
              <img
                src={banner.heroImage}
                alt="Hero Banner Preview"
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-widest bg-slate-950/80 px-4 py-1 rounded-full text-amber-300 border border-amber-400/40">
                  {banner.badgeMr}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white drop-shadow-md">
                  {banner.titleMr}
                </h2>
                <p className="text-xs text-amber-200 max-w-lg drop-shadow-sm">
                  {banner.subtitleMr}
                </p>
              </div>
            </div>

            {/* Image controls */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Banner Background Image URL</label>
                <input
                  type="text"
                  value={banner.heroImage}
                  onChange={(e) => setBanner({ ...banner, heroImage: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-amber-500 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Or Upload New Hero Image from Computer
                </label>
                <label className="flex items-center justify-center gap-2 w-full py-3 px-4 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl cursor-pointer bg-slate-50 hover:bg-amber-50/50 transition-colors text-xs font-bold text-slate-700">
                  <Upload className="w-4 h-4 text-amber-600" />
                  <span>Click to Upload New Hero Backdrop Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileUpload(file, (dataUrl) => {
                          setBanner({ ...banner, heroImage: dataUrl });
                        });
                      }
                    }}
                  />
                </label>
              </div>

              {/* Headings Info */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h4 className="font-bold text-sm text-slate-900">Hero Text & Headings Information:</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-amber-800 block mb-1">मराठी मुख्य शीर्षक (Main Heading MR):</label>
                    <input
                      type="text"
                      value={banner.titleMr}
                      onChange={(e) => setBanner({ ...banner, titleMr: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">English Main Heading:</label>
                    <input
                      type="text"
                      value={banner.titleEn}
                      onChange={(e) => setBanner({ ...banner, titleEn: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-amber-800 block mb-1">मराठी उपशीर्षक (Sub-heading MR):</label>
                    <input
                      type="text"
                      value={banner.subtitleMr}
                      onChange={(e) => setBanner({ ...banner, subtitleMr: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">English Sub-heading:</label>
                    <input
                      type="text"
                      value={banner.subtitleEn}
                      onChange={(e) => setBanner({ ...banner, subtitleEn: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">मराठी सर्व्हिस टॅगलाइन (Overview MR):</label>
                    <input
                      type="text"
                      value={banner.overviewMr}
                      onChange={(e) => setBanner({ ...banner, overviewMr: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleSaveBanner}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save and Publish Banner Changes</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 4: CONTACT INFORMATION & PHONE NUMBERS
           ========================================================================= */}
        {activeTab === 'contact' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900">Contact Numbers & Location Information</h3>
                <p className="text-xs text-slate-500">Edit business phone numbers, WhatsApp contact, email, and location address</p>
              </div>
              <button
                onClick={handleSaveContact}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2 text-xs"
              >
                <Save className="w-4 h-4" />
                <span>Save Contact Details</span>
              </button>
            </div>

            <div className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-emerald-800 block mb-1">Primary WhatsApp Phone 1:</label>
                  <input
                    type="text"
                    value={contact.phone1}
                    onChange={(e) => setContact({ ...contact, phone1: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Used for direct WhatsApp clicks</span>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Alternative Phone 2:</label>
                  <input
                    type="text"
                    value={contact.phone2}
                    onChange={(e) => setContact({ ...contact, phone2: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Alternative Phone 3:</label>
                  <input
                    type="text"
                    value={contact.phone3}
                    onChange={(e) => setContact({ ...contact, phone3: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Business Email Address:</label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-amber-800 block mb-1">मराठी पत्ता (Address MR):</label>
                  <input
                    type="text"
                    value={contact.addressMr}
                    onChange={(e) => setContact({ ...contact, addressMr: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">English Address:</label>
                  <input
                    type="text"
                    value={contact.addressEn}
                    onChange={(e) => setContact({ ...contact, addressEn: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleSaveContact}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>Save All Contact Details</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};

export default AdminManageImages;
