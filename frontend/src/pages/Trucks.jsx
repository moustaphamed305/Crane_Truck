import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { trucksAPI } from '../api/trucks';

const Trucks = () => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ plate_number: '', model: '', fuel_level: 100, speed: 0, status: 'available' });

  useEffect(() => { fetchTrucks(); }, []);

  const fetchTrucks = async () => {
    try {
      const response = await trucksAPI.getTrucks();
      setTrucks(response.data.results || []);
    } catch (err) {
      setError('Failed to fetch trucks');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTruck = async (e) => {
    e.preventDefault();
    try {
      await trucksAPI.createTruck(form);
      setShowForm(false);
      setForm({ plate_number: '', model: '', fuel_level: 100, speed: 0, status: 'available' });
      fetchTrucks();
    } catch (err) {
      setError('Failed to add truck');
    }
  };

  return (
    <MainLayout>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Trucks Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {showForm ? 'Cancel' : 'Add Truck'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddTruck} className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Plate Number</label>
              <input type="text" value={form.plate_number} onChange={e => setForm({...form, plate_number: e.target.value})} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
              <input type="text" value={form.model} onChange={e => setForm({...form, model: e.target.value})} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Level (%)</label>
              <input type="number" value={form.fuel_level} onChange={e => setForm({...form, fuel_level: e.target.value})} className="w-full border rounded px-3 py-2" min="0" max="100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full border rounded px-3 py-2">
                <option value="available">Available</option>
                <option value="in_trip">In Trip</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
          <button type="submit" className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">Save Truck</button>
        </form>
      )}

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Plate Number</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Model</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Fuel Level</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Speed</th>
              </tr>
            </thead>
            <tbody>
              {trucks.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">No trucks found. Add one!</td></tr>
              ) : (
                trucks.map((truck) => (
                  <tr key={truck.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{truck.plate_number}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{truck.model}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        truck.status === 'available' ? 'bg-green-100 text-green-800' :
                        truck.status === 'in_trip' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>{truck.status}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{truck.fuel_level}%</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{truck.speed} km/h</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </MainLayout>
  );
};

export default Trucks;
