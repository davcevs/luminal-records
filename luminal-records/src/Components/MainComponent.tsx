import { motion } from "framer-motion";
import {
  FaCompactDisc,
  FaMicrophone,
  FaHeadphones,
  FaPlayCircle,
  FaMusic,
} from "react-icons/fa";

interface FeaturedArtistCardProps {
  name: string;
  genre: string;
}

import { IconType } from "react-icons";

interface QuickLinkItemProps {
  icon: IconType;
  title: string;
}

const FeaturedArtistCard: React.FC<FeaturedArtistCardProps> = ({
  name,
  genre,
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-lg transition-all"
  >
    <div className="relative">
      <div className="w-full h-48 bg-purple-500/20 flex items-center justify-center">
        <div className="text-center p-4">
          <h3 className="text-2xl font-semibold text-white mb-2">{name}</h3>
          <p className="text-white/60 text-sm uppercase tracking-wider">
            {genre}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const QuickLinkItem: React.FC<QuickLinkItemProps> = ({ icon: Icon, title }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl 
    flex flex-col items-center justify-center p-6 text-center transition-all hover:border-red-500/50"
  >
    <Icon className="text-4xl text-red-500 mb-3 opacity-80" />
    <h3 className="text-white text-lg font-medium">{title}</h3>
  </motion.div>
);

const MainComponent = () => {
  const featuredArtists = [
    { name: "Neon Pulse", genre: "Electronic" },
    { name: "Crimson Wave", genre: "Alternative Rock" },
    { name: "Quantum Sync", genre: "Experimental" },
  ];

  const quickLinks = [
    { icon: FaCompactDisc, title: "New Releases" },
    { icon: FaMicrophone, title: "Artist Roster" },
    { icon: FaHeadphones, title: "Playlists" },
    { icon: FaPlayCircle, title: "Live Shows" },
    { icon: FaMusic, title: "Genres" },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 max-w-4xl px-4"
        >
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 
            bg-gradient-to-r from-purple-500 via-red-500 to-blue-500 
            text-transparent bg-clip-text"
          >
            Luminal Records
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Pushing the boundaries of sound and creativity
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-red-600 text-white px-8 py-3 rounded-full 
            hover:bg-red-700 transition-all flex items-center mx-auto space-x-2"
          >
            <FaPlayCircle />
            <span>Explore Our Sounds</span>
          </motion.button>
        </motion.div>

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%"],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-red-900/40 to-blue-900/40 
            animate-gradient-x blur-3xl"
          />
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="py-16 px-4 container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 
          bg-gradient-to-r from-white via-white/80 to-white/60 
          text-transparent bg-clip-text"
        >
          Featured Artists
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredArtists.map((artist, index) => (
            <FeaturedArtistCard key={index} {...artist} />
          ))}
        </div>
      </section>

      {/* Discover Luminal Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-12 
            bg-gradient-to-r from-white via-white/80 to-white/60 
            text-transparent bg-clip-text"
          >
            Discover Luminal
          </motion.h2>
          <div className="grid md:grid-cols-5 gap-6">
            {quickLinks.map(({ icon, title }, index) => (
              <QuickLinkItem key={index} icon={icon} title={title} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-red-800 via-purple-400 to-blue-500 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2
            className="text-4xl font-bold mb-6 
            bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 
            text-transparent bg-clip-text"
          >
            Ready to Join the Revolution?
          </h2>
          <p className="text-lg mb-8 text-gray-300">
            Stay ahead in the music scene by exploring cutting-edge tracks and
            artists redefining the industry.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-purple-600 text-white px-8 py-3 rounded-full 
            hover:bg-purple-700 transition-all"
          >
            Start Listening Now
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default MainComponent;
