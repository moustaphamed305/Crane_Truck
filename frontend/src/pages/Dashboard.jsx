import React, { useEffect, useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { trucksAPI } from '../api/trucks';
import { driversAPI } from '../api/drivers';
import { tripsAPI } from '../api/trips';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTrucks: 0,
    totalDrivers: 0,
    activeTrips: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [trucks, drivers, trips] = await Promise.all([
          trucksAPI.getTrucks(),
          driversAPI.getDrivers(),
          tripsAPI.getTrips({ status: 'in_progress' }),
        ]);
        setStats({
          totalTrucks: trucks.data.count || 0,
          totalDrivers: drivers.data.count || 0,
          activeTrips: trips.data.count || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-semibold mb-2">Total Trucks</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalTrucks}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-semibold mb-2">Total Drivers</h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalDrivers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm font-semibold mb-2">Active Trips</h3>
            <p className="text-3xl font-bold text-orange-600">{stats.activeTrips}</p>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Dashboard;
