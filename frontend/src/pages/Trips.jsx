import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { tripsAPI } from '../api/trips';

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await tripsAPI.getTrips();
      setTrips(response.data.results || []);
    } catch (err) {
      setError('Failed to fetch trips');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Trips Management</h1>
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Start Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Destination</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Distance (km)</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Fuel Used (L)</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{trip.start_location}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{trip.destination}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{trip.distance}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{trip.fuel_used}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      trip.status === 'completed' ? 'bg-green-100 text-green-800' :
                      trip.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      trip.status === 'planned' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {trip.status}
                    </span>
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
