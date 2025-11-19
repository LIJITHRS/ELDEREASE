import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminTutorials = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [videoId, setVideoId] = useState('');
  const [message, setMessage] = useState('');
  const [tutorials, setTutorials] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tutorials');
      setTutorials(response.data);
    } catch (error) {
      console.error("❌ Error fetching tutorials:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/tutorials', { title, category, videoId });
      alert('✅ Tutorial added successfully!');
      setTitle('');
      setCategory('');
      setVideoId('');
      setIsOpen(false);
      fetchTutorials();
    } catch (error) {
      alert('❌ Failed to add tutorial. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tutorial?')) {
      try {
        await axios.delete(`http://localhost:5000/tutorials/${id}`);
        alert('🗑️ Tutorial deleted successfully!');
        fetchTutorials();
      } catch (error) {
        alert('❌ Failed to delete tutorial.');
        console.error("❌ Error deleting tutorial:", error);
      }
    }
  };

  return (
    <div className="p-8">
      <button 
        onClick={() => setIsOpen(true)} 
        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
      >
        + Add Tutorial
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold mb-4">Add Tutorial</h2>
            {message && <p className="text-green-600 mb-2">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" placeholder="Tutorial Title" value={title} onChange={(e) => setTitle(e.target.value)}
                className="block w-full p-2 border rounded" required
              />
              <input 
                type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}
                className="block w-full p-2 border rounded" required
              />
              <input 
                type="text" placeholder="YouTube Video ID" value={videoId} onChange={(e) => setVideoId(e.target.value)}
                className="block w-full p-2 border rounded" required
              />
              <div className="flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)} 
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Add Tutorial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Tutorial List</h2>
        {tutorials.length === 0 ? (
          <p className="text-gray-600">No tutorials added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => (
              <div key={tutorial._id} className="bg-white p-4 shadow-md rounded-lg">
                <h3 className="text-lg font-semibold">{tutorial.title}</h3>
                <p className="text-sm text-gray-500">{tutorial.category}</p>
                <div className="mt-2">
                  <iframe 
                    className="w-full rounded-md" 
                    height="200" 
                    src={`https://www.youtube.com/embed/${tutorial.videoId}`} 
                    title={tutorial.title} 
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="mt-3 flex justify-center">
                  <button 
                    onClick={() => handleDelete(tutorial._id)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTutorials;
