import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { trucksAPI } from '../api/trucks';

const Trucks = () => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTrucks();
  }, []);

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

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Trucks Management</h1>
      </div>

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
              {trucks.map((truck) => (
                <tr key={truck.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{truck.plate_number}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{truck.model}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      truck.status === 'available' ? 'bg-green-100 text-green-800' :
                      truck.status === 'in_trip' ? 'bg-blue-100 text-blue-800' :
                      truck.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {truck.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{truck.fuel_level}%</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{truck.speed} km/h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </MainLayout>
  );
};

export default Trucks;
