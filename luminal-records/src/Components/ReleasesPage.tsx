import { useState } from "react";
import { motion } from "framer-motion";
import { FaCompactDisc } from "react-icons/fa";

interface ReleaseCardProps {
  title: string;
  artist: string;
  date: string;
  genre: string;
}

const ReleaseCard: React.FC<ReleaseCardProps> = ({
  title,
  artist,
  date,
  genre,
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gray-900 rounded-xl overflow-hidden shadow-lg flex transform transition-all"
  >
    <div className="w-1/3 bg-red-600 flex items-center justify-center backdrop-filter backdrop-blur-md">
      <FaCompactDisc className="text-6xl text-white" />
    </div>
    <div className="w-2/3 p-4">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-red-400">{artist}</p>
      <p className="text-gray-400 text-sm">{genre}</p>
      <p className="text-gray-500 text-xs mt-1">{date}</p>
    </div>
  </motion.div>
);

const ReleasesPage = () => {
  const [releases] = useState([
    {
      title: "Neon Horizons",
      artist: "Neon Pulse",
      date: "June 2024",
      genre: "Electronic",
    },
    {
      title: "Crimson Echoes",
      artist: "Crimson Wave",
      date: "May 2024",
      genre: "Alternative Rock",
    },
    {
      title: "Quantum Resonance",
      artist: "Quantum Sync",
      date: "April 2024",
      genre: "Experimental",
    },
    {
      title: "Midnight Dreams",
      artist: "Midnight Echoes",
      date: "March 2024",
      genre: "Indie Pop",
    },
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
          Latest Releases
        </motion.h1>

        <div className="space-y-8">
          {releases.map((release, index) => (
            <ReleaseCard key={index} {...release} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReleasesPage;
