import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { maintenanceAPI } from '../api/maintenance';

const Maintenance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await maintenanceAPI.getRecords();
      setRecords(response.data.results || []);
    } catch (err) {
      setError('Failed to fetch maintenance records');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Maintenance Records</h1>
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Truck</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Scheduled Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Completion Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Cost</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {record.truck_details?.plate_number || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.maintenance_type}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.scheduled_date}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.completion_date || 'Pending'}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">${record.cost}</td>
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
