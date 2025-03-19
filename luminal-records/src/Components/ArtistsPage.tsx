import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMusic, FaSpotify, FaYoutube, FaInstagram } from "react-icons/fa";

interface Artist {
  name: string;
  genre: string;
  image?: string;
  stats: {
    monthlyListeners: number;
    topTrack: string;
    followers: number;
  };
  socialLinks: {
    spotify?: string;
    youtube?: string;
    instagram?: string;
  };
}

const ArtistCard: React.FC<Artist> = ({
  name,
  genre,
  image,
  stats,
  socialLinks,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-xl"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"
        animate={{
          opacity: isHovered ? 0.8 : 0.6,
        }}
      />

      <img
        src={image || `/api/placeholder/400/300?text=${name}`}
        alt={name}
        className="w-full h-64 object-cover"
      />

      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 text-white"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <p className="text-red-400 mb-4">{genre}</p>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            height: isHovered ? "auto" : 0,
          }}
          className="space-y-2"
        >
          <p className="text-sm text-gray-300">
            Monthly Listeners: {stats.monthlyListeners.toLocaleString()}
          </p>
          <p className="text-sm text-gray-300">Top Track: {stats.topTrack}</p>
          <p className="text-sm text-gray-300">
            Followers: {stats.followers.toLocaleString()}
          </p>

          <div className="flex justify-between items-center mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-500 text-white px-6 py-2 rounded-full 
              hover:bg-red-600 transition-colors flex items-center space-x-2"
            >
              <FaMusic />
              <span>View Profile</span>
            </motion.button>

            <div className="flex space-x-3">
              {socialLinks.spotify && (
                <motion.a
                  href={socialLinks.spotify}
                  whileHover={{ scale: 1.2 }}
                  className="text-green-500 hover:text-green-400"
                >
                  <FaSpotify className="text-xl" />
                </motion.a>
              )}
              {socialLinks.youtube && (
                <motion.a
                  href={socialLinks.youtube}
                  whileHover={{ scale: 1.2 }}
                  className="text-red-500 hover:text-red-400"
                >
                  <FaYoutube className="text-xl" />
                </motion.a>
              )}
              {socialLinks.instagram && (
                <motion.a
                  href={socialLinks.instagram}
                  whileHover={{ scale: 1.2 }}
                  className="text-purple-500 hover:text-purple-400"
                >
                  <FaInstagram className="text-xl" />
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ArtistsPage = () => {
  const [artists] = useState<Artist[]>([
    {
      name: "Neon Pulse",
      genre: "Electronic",
      stats: {
        monthlyListeners: 1250000,
        topTrack: "Digital Dreams",
        followers: 500000,
      },
      socialLinks: {
        spotify: "#",
        youtube: "#",
        instagram: "#",
      },
    },
    {
      name: "Crimson Wave",
      genre: "Alternative Rock",
      stats: {
        monthlyListeners: 890000,
        topTrack: "Echoes of Tomorrow",
        followers: 320000,
      },
      socialLinks: {
        spotify: "#",
        youtube: "#",
        instagram: "#",
      },
    },
    {
      name: "Quantum Sync",
      genre: "Experimental",
      stats: {
        monthlyListeners: 750000,
        topTrack: "Neural Networks",
        followers: 280000,
      },
      socialLinks: {
        spotify: "#",
        youtube: "#",
        instagram: "#",
      },
    },
    {
      name: "Midnight Echoes",
      genre: "Indie Pop",
      stats: {
        monthlyListeners: 950000,
        topTrack: "Starlight Dreams",
        followers: 420000,
      },
      socialLinks: {
        spotify: "#",
        youtube: "#",
        instagram: "#",
      },
    },
    {
      name: "Violet Storm",
      genre: "Synth Wave",
      stats: {
        monthlyListeners: 680000,
        topTrack: "Neon City Nights",
        followers: 310000,
      },
      socialLinks: {
        spotify: "#",
        youtube: "#",
        instagram: "#",
      },
    },
    {
      name: "Neural Network",
      genre: "Tech House",
      stats: {
        monthlyListeners: 820000,
        topTrack: "Digital Pulse",
        followers: 290000,
      },
      socialLinks: {
        spotify: "#",
        youtube: "#",
        instagram: "#",
      },
    },
  ]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-gradient-to-b from-black via-gray-900 to-black text-white min-h-screen"
    >
      <div className="container mx-auto py-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center mb-12
           bg-gradient-to-r from-purple-400 to-blue-500
           text-transparent bg-clip-text"
        >
          Our Artists
        </motion.h1>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={pageVariants}
        >
          {artists.map((artist, index) => (
            <motion.div
              key={index}
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
              }}
            >
              <ArtistCard {...artist} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ArtistsPage;
