import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { tripsAPI } from '../api/trips';
import { trucksAPI } from '../api/trucks';
import { driversAPI } from '../api/drivers';

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ start_location: '', destination: '', status: 'planned', truck: '', driver: '' });

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    try {
      const [tripsRes, trucksRes, driversRes] = await Promise.all([
        tripsAPI.getTrips(),
        trucksAPI.getTrucks(),
        driversAPI.getDrivers(),
      ]);
      setTrips(tripsRes.data.results || []);
      setTrucks(trucksRes.data.results || []);
      setDrivers(driversRes.data.results || []);
    } catch (err) { setError('Failed to fetch data'); }
    finally { setLoading(false); }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await tripsAPI.createTrip(form);
      setShowForm(false);
      setForm({ start_location: '', destination: '', status: 'planned', truck: '', driver: '' });
      fetchAll();
    } catch (err) { setError('Failed to add trip'); }
  };

  return (
    <MainLayout>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Trips Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-bl
ue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {showForm ? 'Cancel' : 'Add Trip'}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
              <input type="text" value={form.start_location} onChange={e => setForm({...form, start_location: e.target.value})} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <input type="text" value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Truck</label>
              <select value={form.truck} onChange={e => setForm({...form, truck: e.target.value})} className="w-full border rounded px-3 py-2" required>
                <option value="">-- Select Truck --</option>
                {trucks.map(t => <option key={t.id} value={t.id}>{t.plate_number || t.name || t.id}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Driver</label>
              <select value={form.driver} onChange={e => setForm({...form, driver: e.target.value})} className="w-full border rounded px-3 py-2" required>
                <option value="">-- Select Driver --</option>
                {drivers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full border rounded px-3 py-2">
                <option value="planned">Planned</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
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
                  <td className="px-6 py-4 text-sm text-gray-900">{t.start_location}</td>
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
