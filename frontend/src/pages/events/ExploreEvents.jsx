import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import EventCard from '../../components/common/EventCard';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import { Search, Filter, SlidersHorizontal, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

const categoryOptions = ['All', 'Technology', 'Music', 'Exhibition', 'Workshop', 'Business', 'Culture'];

const ExploreEvents = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('eventDate');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchEvents();
  }, [selectedCategory, sortBy, sortDir, page]);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosClient.get('/api/events', {
        params: {
          search: search.trim() || undefined,
          category: selectedCategory !== 'All' ? selectedCategory : undefined,
          sortBy,
          sortDir,
          page,
          size: 9,
        },
      });

      if (res.data.success) {
        setEvents(res.data.data.content);
        setTotalPages(res.data.data.totalPages);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Unable to load events from the server. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(0);
    fetchEvents();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-slate-50 text-slate-900">
      
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Explore <span className="gradient-text-violet">Events</span>
        </h1>
        <p className="text-slate-500 text-sm">
          Browse and filter upcoming conferences, workshops, concerts, and summits.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-5 rounded-3xl space-y-4 border border-slate-200/80 shadow-sm">
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by event title, city, or venue..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-violet-600 transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto flex-shrink-0">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-700 w-full md:w-auto">
              <SlidersHorizontal className="w-4 h-4 text-violet-600" />
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

            <button
              type="submit"
              className="btn-violet text-white text-xs font-semibold px-6 py-3 rounded-2xl shadow-md flex-shrink-0"
            >
              Search
            </button>
          </div>
        </form>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-violet-600" /> Categories:
          </span>
          {categoryOptions.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setPage(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex-shrink-0 ${
                selectedCategory === cat
                  ? 'btn-violet text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 p-6 rounded-2xl border border-red-200 flex items-center gap-3 text-red-700 text-sm font-medium">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Events Grid */}
      {loading ? (
        <LoadingSkeleton count={6} />
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-16 text-center rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <p className="text-4xl">🔍</p>
          <h3 className="text-xl font-bold text-slate-900">No Events Found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            We couldn't find any events matching your selected filters or search query.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('All');
              setPage(0);
            }}
            className="btn-violet text-white text-xs font-semibold px-6 py-2.5 rounded-xl shadow-md"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-slate-600 font-semibold">
            Page <span className="text-slate-900 font-extrabold">{page + 1}</span> of <span className="text-slate-900 font-extrabold">{totalPages}</span>
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={page >= totalPages - 1}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

    </div>
  );
};

export default ExploreEvents;
