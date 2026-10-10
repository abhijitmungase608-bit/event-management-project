import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockEventsData } from '../../data/mockEvents';
import EventCard from '../../components/common/EventCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

const categoryOptions = ['All', 'Wedding', 'Birthday', 'Corporate', 'Engagement', 'College Events', 'Family Functions'];

const ExploreEvents = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('eventDate');
  const [sortDir, setSortDir] = useState('asc');

  // Filter events locally
  let filteredEvents = mockEventsData.filter((event) => {
    const matchesSearch = search.trim() === '' || 
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.city.toLowerCase().includes(search.toLowerCase()) ||
      event.venue.toLowerCase().includes(search.toLowerCase());
      
    const matchesCategory = selectedCategory === 'All' || 
      event.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Sort events locally
  filteredEvents.sort((a, b) => {
    if (sortBy === 'price') {
      return sortDir === 'asc' ? a.price - b.price : b.price - a.price;
    }
    // Default by date
    return sortDir === 'asc' 
      ? new Date(a.eventDate) - new Date(b.eventDate)
      : new Date(b.eventDate) - new Date(a.eventDate);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-white text-slate-900 min-h-screen">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
          Explore Royal <span className="gradient-text-gold">Events</span>
        </h1>
        <p className="text-slate-600 text-sm font-medium">
          Browse upcoming weddings, birthday galas, corporate summits, engagements, college fests, and family functions in Ahilyanagar.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-5 rounded-3xl space-y-4 border border-slate-200 shadow-md">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by event title, city, or venue..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto flex-shrink-0">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3 text-sm text-slate-700 w-full md:w-auto">
              <SlidersHorizontal className="w-4 h-4 text-amber-700" />
              <select
                value={`${sortBy}-${sortDir}`}
                onChange={(e) => {
                  const [b, d] = e.target.value.split('-');
                  setSortBy(b);
                  setSortDir(d);
                }}
                className="bg-transparent text-slate-900 font-semibold focus:outline-none text-xs"
              >
                <option value="eventDate-asc">Sort by Date (Soonest)</option>
                <option value="eventDate-desc">Sort by Date (Latest)</option>
                <option value="price-asc">Sort by Price (Low to High)</option>
                <option value="price-desc">Sort by Price (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-600 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-amber-700" /> Categories:
          </span>
          {categoryOptions.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-16 text-center rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <p className="text-4xl">🔍</p>
          <h3 className="text-xl font-bold font-serif text-slate-900">No Events Found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            We couldn't find any events matching your selected filters or search query.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
            }}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-6 py-2.5 rounded-xl shadow-md"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};

export default ExploreEvents;
