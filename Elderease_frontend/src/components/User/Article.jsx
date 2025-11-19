import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoCard from '../VideoCard';

const Article = () => {
  const [healthVideos, setHealthVideos] = useState([]);

  useEffect(() => {
    fetchHealthVideos();
  }, []);

  const fetchHealthVideos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tutorials'); // ✅ Fetch all tutorials
      const filteredVideos = response.data.filter(video => video.category.toLowerCase() === "health"); // ✅ Only health videos
      setHealthVideos(filteredVideos);
    } catch (error) {
      console.error("❌ Error fetching health videos:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ✅ Top Section with Google Image as Background */}
      <div 
        className="relative w-full h-80 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://thegoldenestate.com/wp-content/uploads/2024/04/facilities-offered-in-retirement-home-in-india.jpg')" }} // ✅ Google image link
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-4xl text-white font-bold">Health & Wellness</h1>
          <p className="text-white text-lg mt-2 max-w-2xl">
            Stay informed and take care of your well-being with expert tips, health articles, and video tutorials.
          </p>
        </div>
      </div>

      {/* ✅ Main Content */}
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* ✅ Articles Section */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Useful Health Articles</h2>

            <div className="space-y-6">
              {/* ✅ Article 1 */}
              <div className="bg-white p-6 shadow-md rounded-lg">
                <h3 className="text-xl font-semibold">🧘‍♂️ The Importance of Exercise for Seniors</h3>
                <p className="text-gray-700 mt-2">
                  Regular exercise improves balance, flexibility, and overall health. Activities such as walking, yoga, and swimming 
                  can help maintain mobility and prevent common aging-related issues like arthritis.
                </p>
              </div>

              {/* ✅ Article 2 */}
              <div className="bg-white p-6 shadow-md rounded-lg">
                <h3 className="text-xl font-semibold">🥗 Healthy Eating Habits for Older Adults</h3>
                <p className="text-gray-700 mt-2">
                  A diet rich in fruits, vegetables, whole grains, and lean protein helps maintain energy levels and boosts the immune system. 
                  Reducing processed foods and staying hydrated are also essential for overall well-being.
                </p>
              </div>

              {/* ✅ Article 3 */}
              <div className="bg-white p-6 shadow-md rounded-lg">
                <h3 className="text-xl font-semibold">🧠 Mental Well-being and Cognitive Health</h3>
                <p className="text-gray-700 mt-2">
                  Engaging in activities like reading, puzzles, and social interactions keeps the brain active and reduces the risk of cognitive decline. 
                  Meditation and mindfulness techniques can also help manage stress and anxiety.
                </p>
              </div>

              {/* ✅ Article 4 */}
              <div className="bg-white p-6 shadow-md rounded-lg">
                <h3 className="text-xl font-semibold">💤 The Role of Sleep in Healthy Aging</h3>
                <p className="text-gray-700 mt-2">
                  Getting 7-9 hours of quality sleep each night supports brain function, heart health, and overall vitality. 
                  Establishing a consistent bedtime routine and avoiding screens before bed can improve sleep quality.
                </p>
              </div>
            </div>
          </div>

          {/* ✅ Health Videos Section */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold mb-6">Health & Wellness Videos</h2>

            {healthVideos.length === 0 ? (
              <p className="text-gray-600">No health-related videos available.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {healthVideos.slice(0, 3).map(video => ( // ✅ Show only 3 videos
                  <VideoCard key={video._id} videoId={video.videoId} title={video.title} />
                ))}
              </div>
            )}

            {/* ✅ Button to View More Videos */}
            {healthVideos.length > 3 && (
              <div className="mt-4 text-center">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  View More Videos
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Article;
