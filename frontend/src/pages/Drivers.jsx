import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { driversAPI } from '../api/drivers';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await driversAPI.getDrivers();
      setDrivers(response.data.results || []);
    } catch (err) {
      setError('Failed to fetch drivers');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Drivers Management</h1>
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">License Number</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Assigned Truck</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{driver.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{driver.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{driver.license_number}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      driver.status === 'active' ? 'bg-green-100 text-green-800' :
                      driver.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {driver.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {driver.assigned_truck_details?.plate_number || 'N/A'}
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
