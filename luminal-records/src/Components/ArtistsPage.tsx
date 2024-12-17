import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMicrophone, FaMusic, FaSpotify } from "react-icons/fa";

interface Artist {
  name: string;
  genre: string;
  image?: string;
}

interface ArtistCardProps {
  name: string;
  genre: string;
  image?: string; // Optional if not always provided
}

const ArtistCard: React.FC<ArtistCardProps> = ({ name, genre, image }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transform transition-all"
  >
    <div className="relative">
      <img
        src={image || `/api/placeholder/400/300?text=${name}`}
        alt={name}
        className="w-full h-64 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 backdrop-filter backdrop-blur-md">
        <h3 className="text-2xl font-bold text-white">{name}</h3>
        <p className="text-red-400">{genre}</p>
      </div>
    </div>
    <div className="p-4 flex justify-between items-center">
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="bg-red-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 backdrop-filter backdrop-blur-md"
      >
        <FaMusic />
        <span>Explore</span>
      </motion.button>
      <div className="flex space-x-3">
        <FaSpotify className="text-green-500 text-2xl" />
        <FaMicrophone className="text-purple-500 text-2xl" />
      </div>
    </div>
  </motion.div>
);
const ArtistsPage = () => {
  const [artists] = useState<Artist[]>([
    { name: "Neon Pulse", genre: "Electronic" },
    { name: "Crimson Wave", genre: "Alternative Rock" },
    { name: "Quantum Sync", genre: "Experimental" },
    { name: "Midnight Echoes", genre: "Indie Pop" },
    { name: "Violet Storm", genre: "Synth Wave" },
    { name: "Neural Network", genre: "Tech House" },
  ]);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto py-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-12 
          bg-gradient-to-r from-purple-400 to-blue-500 
          text-transparent bg-clip-text backdrop-filter backdrop-blur-md"
        >
          Our Artists
        </motion.h1>

        <div className="grid md:grid-cols-3 gap-8">
          {artists.map((artist, index) => (
            <ArtistCard key={index} {...artist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistsPage;
