import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoCard from '../VideoCard'; // ✅ Component to display videos

const HealthResources = () => {
  const [healthVideos, setHealthVideos] = useState([]);

  useEffect(() => {
    fetchHealthVideos();
  }, []);

  const fetchHealthVideos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tutorials');
      
      // ✅ Filter only "Health" category videos
      const filteredVideos = response.data.filter(video => video.category.toLowerCase() === "health");
      
      setHealthVideos(filteredVideos);
    } catch (error) {
      console.error("❌ Error fetching health videos:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Health Resources</h1>

      {healthVideos.length === 0 ? (
        <p className="text-gray-600 text-center">No health-related videos available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {healthVideos.map(video => (
            <VideoCard key={video._id} videoId={video.videoId} title={video.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthResources;
