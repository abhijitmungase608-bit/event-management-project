import React, { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';
import AdminSidebar from '../../components/layout/AdminSidebar';
import { Calendar, Plus, Edit2, Trash2, Eye, EyeOff, Search, X, Check, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const categories = ['Technology', 'Music', 'Exhibition', 'Workshop', 'Business', 'Culture'];

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technology',
    coverImage: '',
    venue: '',
    address: '',
    city: '',
    eventDate: '',
    startTime: '09:00',
    endTime: '17:00',
    price: 0,
    capacity: 100,
    published: true,
  });

  // Delete State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [page]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get('/api/admin/events', {
        params: { page, size: 10 },
      });
      if (res.data.success) {
        setEvents(res.data.data.content);
        setTotalPages(res.data.data.totalPages);
      }
    } catch (err) {
      console.error('Error fetching admin events:', err);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      category: 'Technology',
      coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      venue: '',
      address: '',
      city: '',
      eventDate: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '17:00',
      price: 999,
      capacity: 100,
      published: true,
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title || '',
      description: event.description || '',
      category: event.category || 'Technology',
      coverImage: event.coverImage || '',
      venue: event.venue || '',
      address: event.address || '',
      city: event.city || '',
      eventDate: event.eventDate || '',
      startTime: event.startTime || '09:00',
      endTime: event.endTime || '17:00',
      price: event.price || 0,
      capacity: event.capacity || 100,
      published: event.published ?? true,
    });
    setModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingEvent) {
        const res = await axiosClient.put(`/api/admin/events/${editingEvent.id}`, formData);
        if (res.data.success) {
          toast.success('Event updated successfully');
        }
      } else {
        const res = await axiosClient.post('/api/admin/events', formData);
        if (res.data.success) {
          toast.success('Event created successfully');
        }
      }
      setModalOpen(false);
      fetchEvents();
    } catch (err) {
      console.error('Save event error:', err);
      toast.error(err.response?.data?.message || 'Failed to save event');
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      const res = await axiosClient.patch(`/api/admin/events/${id}/publish`);
      if (res.data.success) {
        toast.success('Publish status toggled');
        fetchEvents();
      }
    } catch (err) {
      console.error('Toggle publish error:', err);
      toast.error('Failed to toggle publish status');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDeleteId) return;
    try {
      const res = await axiosClient.delete(`/api/admin/events/${selectedDeleteId}`);
      if (res.data.success) {
        toast.success('Event deleted');
        setDeleteModalOpen(false);
        fetchEvents();
      }
    } catch (err) {
      console.error('Delete event error:', err);
      toast.error('Failed to delete event');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-x-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Event Management</h1>
            <p className="text-xs text-slate-400 mt-1">Create, edit, publish, or archive system events</p>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="gradient-btn text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Create New Event
          </button>
        </div>

        {/* Events Table */}
        <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-4">Event Details</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Venue</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Seats</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {events.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-semibold text-white">
                      <div className="flex items-center gap-3">
                        <img src={e.coverImage} alt={e.title} className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <span className="block line-clamp-1">{e.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">ID: {e.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-slate-800 text-indigo-300 px-2.5 py-1 rounded-full font-medium">
                        {e.category}
                      </span>
                    </td>
                    <td className="p-4">{e.eventDate} @ {e.startTime}</td>
                    <td className="p-4 truncate max-w-xs">{e.venue}, {e.city}</td>
                    <td className="p-4 font-bold text-white">₹{e.price}</td>
                    <td className="p-4">{e.availableSeats} / {e.capacity}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleTogglePublish(e.id)}
                        className={`px-2.5 py-1 rounded-full font-semibold text-[10px] uppercase flex items-center gap-1 transition-colors ${
                          e.published
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {e.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {e.published ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(e)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        title="Edit Event"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { setSelectedDeleteId(e.id); setDeleteModalOpen(true); }}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create/Edit Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <div className="glass-card bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 my-8">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white">
                  {editingEvent ? 'Edit Event' : 'Create New Event'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Description</label>
                  <textarea
                    rows="3"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Venue Name</label>
                    <input
                      type="text"
                      required
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Event Date</label>
                    <input
                      type="date"
                      required
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Start Time</label>
                    <input
                      type="time"
                      required
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Price (INR)</label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Capacity</label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 1 })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-semibold">
                      <input
                        type="checkbox"
                        checked={formData.published}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                        className="rounded bg-slate-950 border-slate-700 text-indigo-600 w-4 h-4"
                      />
                      <span>Published</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Cover Image URL</label>
                  <input
                    type="url"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="gradient-btn text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Event'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="glass-card bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" /> Delete Event Confirmation
              </h3>
              <p className="text-xs text-slate-300">
                Are you sure you want to permanently delete this event? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 text-white"
                >
                  Delete Event
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminEvents;
