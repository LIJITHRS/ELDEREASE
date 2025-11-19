import React from 'react';

const VideoCard = ({ videoId, title }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
            {/* ✅ Video Thumbnail */}
            <div className="relative w-full h-48">
                <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>

            {/* ✅ Video Details */}
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            </div>
        </div>
    );
};

export default VideoCard;
