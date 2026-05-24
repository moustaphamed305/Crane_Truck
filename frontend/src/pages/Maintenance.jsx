import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { maintenanceAPI } from '../api/maintenance';

const Maintenance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ truck: '', description: '', status: 'scheduled', cost: '' });

  useEffect(() => { fetchRecords(); }, []);

  const fetchRecords = async () => {
    try {
      const response = await maintenanceAPI.getRecords();
      setRecords(response.data.results || []);
    } catch (err) { setError('Failed to fetch maintenance records'); }
    finally { setLoading(false); }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await maintenanceAPI.createRecord(form);
      setShowForm(false);
      setForm({ truck: '', description: '', status: 'scheduled', cost: '' });
      fetchRecords();
    } catch (err) { setError('Failed to add record'); }
  };

  return (
    <MainLayout>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Maintenance</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {showForm ? 'Cancel' : 'Add Record'}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Truck ID</label>
              <input type="text" value={form.truck} onChange={e => setForm({...form, truck: e.target.value})} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
              <input type="number" value={form.cost} onChange={e => setForm({...form, cost: e.target.value})} className="w-full border rounded px-3 py-2" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full border rounded px-3 py-2" rows="3" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full border rounded px-3 py-2">
                <option value="scheduled">Scheduled</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <button type="submit" className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">Save Record</button>
        </form>
      )}
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      {loading ? <div className="text-center py-8">Loading...</div> : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Truck</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Cost</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-500">No records found. Add one!</td></tr>
              ) : records.map((r) => (
                <tr key={r.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{r.truck}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{r.description}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      r.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                      r.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>{r.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">${r.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </MainLayout>
  );
};

export default Maintenance;
