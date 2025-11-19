import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BarChart } from '@mui/x-charts/BarChart';

const Adminhome = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [categoryCounts, setCategoryCounts] = useState([]);

  useEffect(() => {
    // Fetch pending events count
    axios.get('http://localhost:5000/events/pending')
      .then(response => setPendingCount(response.data.length || 0))
      .catch(error => console.error('Error fetching pending events:', error));

    // Fetch approved events count
    axios.get('http://localhost:5000/events/approved')
      .then(response => setApprovedCount(response.data.length || 0))
      .catch(error => console.error('Error fetching approved events:', error));

    // Fetch tutorials and count them by category
    axios.get('http://localhost:5000/tutorials')
      .then(response => {
        const categoryData = {};
        response.data.forEach(tutorial => {
          categoryData[tutorial.category] = (categoryData[tutorial.category] || 0) + 1;
        });

        const formattedData = Object.keys(categoryData).map(category => ({
          category,
          count: categoryData[category]
        }));

        setCategoryCounts(formattedData);
      })
      .catch(error => console.error('Error fetching tutorials:', error));
  }, []);

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-6">WELCOME ADMIN</h1>

      {/* ✅ Event Count Display */}
      <div className="grid grid-cols-2 gap-6">
        <Link to="/events" className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg block">
          <h2 className="text-xl font-semibold">Pending Events</h2>
          <p className="text-4xl font-bold">{pendingCount}</p>
        </Link>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Approved Events</h2>
          <p className="text-4xl font-bold">{approvedCount}</p>
        </div>
      </div>

      {/* ✅ Stacked Bar Chart for Tutorials by Category */}
      <div className="mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Tutorials by Category</h2>
        {categoryCounts.length === 0 ? (
          <p className="text-gray-600">No tutorials added yet.</p>
        ) : (
          <BarChart
            dataset={categoryCounts}
            series={[{ dataKey: 'count', stack: 'tutorials', color: '#007bff' }]}
            xAxis={[{ scaleType: 'band', dataKey: 'category' }]}
            slotProps={{ legend: { hidden: true } }}
            width={600}
            height={350}
          />
        )}
      </div>
    </div>
  );
};

export default Adminhome;
