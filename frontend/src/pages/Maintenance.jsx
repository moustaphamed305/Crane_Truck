import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { maintenanceAPI } from '../api/maintenance';
import { trucksAPI } from '../api/trucks';

const Maintenance = () => {
  const [records, setRecords] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ truck: '', maintenance_type: 'routine', description: '', scheduled_date: '', cost: '' });

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    try {
      const [recRes, truckRes] = await Promise.all([maintenanceAPI.getRecords(), trucksAPI.getTrucks()]);
      setRecords(recRes.data.results || []);
      setTrucks(truckRes.data.results || []);
    } catch (err) { setError('Failed to fetch data'); }
    finally { setLoading(false); }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await maintenanceAPI.createRecord(form);
      setShowForm(false);
      setForm({ truck: '', maintenance_type: 'routine', description: '', scheduled_date: '', cost: '' });
      fetchAll();
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Truck</label>
              <select value={form.truck} onChange={e => setForm({...form, truck: e.target.value})} className="w-full border rounded px-3 py-2" required>
                <option value="">-- Select Truck --</option>
                {trucks.map(t => <option key={t.id} value={t.id}>{t.plate_number || t.id}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select value={form.maintenance_type} onChange={e => setForm({...form, maintenance_type: e.target.value})} className="w-full border rounded px-3 py-2">
                <option value="routine">Routine Check</option>
                <option value="repair">Repair</option>
                <option value="inspection">Inspection</option>
                <option value="oil_change">Oil Change</option>
                <option value="tire_replacement">Tire Replacement</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Date</label>
              <input type="date" value={form.scheduled_date} onChange={e => setForm({...form, scheduled_date: e.target.value})} className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
              <input type="number" value={form.cost} onChange={e => setForm({...form, cost: e.target.value})} className="w-full border rounded px-3 py-2" />
            </div>
            <div className="col-span-2"
>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full border rounded px-3 py-2" rows="3" />
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Scheduled Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Cost</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-500">No records found. Add one!</td></tr>
              ) : records.map((r) => (
                <tr key={r.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{r.truck_details?.plate_number || r.truck}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{r.maintenance_type}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{r.scheduled_date}</td>
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
