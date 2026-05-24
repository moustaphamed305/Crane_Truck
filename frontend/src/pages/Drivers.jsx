import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { driversAPI } from '../api/drivers';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', license_number: '', phone: '', status: 'available' });

  useEffect(() => { fetchDrivers(); }, []);

  const fetchDrivers = async () => {
    try {
      const response = await driversAPI.getDrivers();
      setDrivers(response.data.results || []);
    } catch (err) { setError('Failed to fetch drivers'); }
    finally { setLoading(false); }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await driversAPI.createDriver(form);
      setShowForm(false);
      setForm({ name: '', license_number: '', phone: '', status: 'available' });
      fetchDrivers();
    } catch (err) { setError('Failed to add driver'); }
  };

  return (
    <MainLayout>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Drivers Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {showForm ? 'Cancel' : 'Add Driver'}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
              <input type="text" value={form.license_number} onChange={e => setForm({...form, license_number: e.target.value})} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full border rounded px-3 py-2">
                <option value="available">Available</option>
                <option value="on_trip">On Trip</option>
                <option value="off_duty">Off Duty</option>
              </select>
            </div>
          </div>
          <button type="submit" className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">Save Driver</button>
        </form>
      )}
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      {loading ? <div className="text-center py-8">Loading...</div> : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">License</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {drivers.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-500">No drivers found. Add one!</td></tr>
              ) : drivers.map((d) => (
                <tr key={d.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{d.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{d.license_number}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{d.phone}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      d.status === 'available' ? 'bg-green-100 text-green-800' :
                      d.status === 'on_trip' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>{d.status}</span>
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

export default Drivers;
