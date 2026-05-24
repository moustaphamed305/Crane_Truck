import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { tripsAPI } from '../api/trips';

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ origin: '', destination: '', status: 'planned', truck: '', driver: '' });

  useEffect(() => { fetchTrips(); }, []);

  const fetchTrips = async () => {
    try {
      const response = await tripsAPI.getTrips();
      setTrips(response.data.results || []);
    } catch (err) { setError('Failed to fetch trips'); }
    finally { setLoading(false); }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await tripsAPI.createTrip(form);
      setShowForm(false);
      setForm({ origin: '', destination: '', status: 'planned', truck: '', driver: '' });
      fetchTrips();
    } catch (err) { setError('Failed to add trip'); }
  };

  return (
    <MainLayout>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Trips Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {showForm ? 'Cancel' : 'Add Trip'}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
              <input type="text" value={form.origin} onChange={e => setForm({...form, origin: e.target.value})} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <input type="text" value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Truck ID</label>
              <input type="text" value={form.truck} onChange={e => setForm({...form, truck: e.target.value})} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Driver ID</label>
              <input type="text" value={form.driver} onChange={e => setForm({...form, driver: e.target.value})} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full border rounded px-3 py-2">
                <option value="planned">Planned</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <button type="submit" className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">Save Trip</button>
        </form>
      )}
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      {loading ? <div className="text-center py-8">Loading...</div> : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Origin</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Destination</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {trips.length === 0 ? (
                <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-500">No trips found. Add one!</td></tr>
              ) : trips.map((t) => (
                <tr key={t.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{t.origin}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{t.destination}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      t.status === 'planned' ? 'bg-yellow-100 text-yellow-800' :
                      t.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </MainLayout>
  );
};

export default Trips;
