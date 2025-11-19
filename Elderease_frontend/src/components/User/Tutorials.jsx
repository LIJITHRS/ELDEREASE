import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ✅ Fetch tutorials from the backend
  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tutorials');
      setTutorials(response.data);

      // ✅ Extract unique categories
      const uniqueCategories = [...new Set(response.data.map(tutorial => tutorial.category))];
      setCategories(uniqueCategories);
      
      // ✅ Default to first category
      if (uniqueCategories.length > 0) {
        setSelectedCategory(uniqueCategories[0]);
      }
    } catch (error) {
      console.error("❌ Error fetching tutorials:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Tutorials</h1>

      {/* ✅ Category Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        {categories.map((category) => (
          <button 
            key={category}
            className={`px-4 py-2 rounded-md transition ${
              selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* ✅ Display Tutorials for Selected Category */}
      <div className="space-y-6">
        {selectedCategory ? (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-blue-600 mb-4">{selectedCategory}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tutorials
                .filter(tutorial => tutorial.category === selectedCategory)
                .map((tutorial) => (
                  <div key={tutorial._id} className="bg-white p-4 shadow-md rounded-lg">
                    <h4 className="text-lg font-semibold">{tutorial.title}</h4>
                    <div className="mt-2">
                      <iframe 
                        className="w-full rounded-md" 
                        height="200" 
                        src={`https://www.youtube.com/embed/${tutorial.videoId}`} 
                        title={tutorial.title} 
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-center">Select a category to view tutorials.</p>
        )}
      </div>
    </div>
  );
};

export default Tutorials;
