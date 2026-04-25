// Components/ArtistsPage.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSpotify, FaYoutube, FaInstagram } from "react-icons/fa";

interface Artist {
  id: string;
  name: string;
  genre: string;
  subgenre?: string;
  bio: string;
  stats: { monthlyListeners: number; topTrack: string; followers: number };
  socialLinks: { spotify?: string; youtube?: string; instagram?: string };
  tags: string[];
  gradient: string;
}

const artists: Artist[] = [
  {
    id: "1",
    name: "Nujee",
    genre: "R&B",
    subgenre: "Neo-Soul",
    bio: "Introspective soundscapes blending neo-soul with raw lyricism. Nujee crafts music that speaks to the human experience.",
    stats: {
      monthlyListeners: 1250000,
      topTrack: "Digital Dreams",
      followers: 500000,
    },
    socialLinks: { spotify: "#", youtube: "#", instagram: "#" },
    tags: ["R&B", "Soul", "Introspective"],
    gradient: "from-blue-600 via-violet-600 to-purple-700",
  },
  {
    id: "2",
    name: "The Game",
    genre: "Hip Hop",
    subgenre: "West Coast",
    bio: "West coast storytelling with cinematic production. Raw narratives layered over meticulously crafted beats.",
    stats: {
      monthlyListeners: 890000,
      topTrack: "Echoes of Tomorrow",
      followers: 320000,
    },
    socialLinks: { spotify: "#", youtube: "#", instagram: "#" },
    tags: ["Hip Hop", "West Coast", "Rap"],
    gradient: "from-violet-600 via-purple-600 to-pink-600",
  },
  {
    id: "3",
    name: "Ib Matic",
    genre: "Hip Hop",
    subgenre: "Trap",
    bio: "High-energy flows over meticulously crafted instrumentals. Ib Matic pushes the boundaries of modern trap music.",
    stats: {
      monthlyListeners: 750000,
      topTrack: "Neural Networks",
      followers: 280000,
    },
    socialLinks: { spotify: "#", youtube: "#", instagram: "#" },
    tags: ["Hip Hop", "Trap", "Energy"],
    gradient: "from-pink-600 via-rose-500 to-red-500",
  },
  {
    id: "4",
    name: "Neon Pulse",
    genre: "Electronic",
    subgenre: "Synth Pop",
    bio: "Futuristic electronic compositions that blur the line between human emotion and machine precision.",
    stats: {
      monthlyListeners: 950000,
      topTrack: "Starlight Dreams",
      followers: 420000,
    },
    socialLinks: { spotify: "#", youtube: "#", instagram: "#" },
    tags: ["Electronic", "Synth", "Future"],
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
  },
  {
    id: "5",
    name: "Midnight Echoes",
    genre: "Indie Pop",
    subgenre: "Dream Pop",
    bio: "Ethereal dream pop with hauntingly beautiful melodies. Music for late nights and early mornings.",
    stats: {
      monthlyListeners: 680000,
      topTrack: "Neon City Nights",
      followers: 310000,
    },
    socialLinks: { spotify: "#", youtube: "#", instagram: "#" },
    tags: ["Indie", "Dream Pop", "Ethereal"],
    gradient: "from-indigo-600 via-violet-500 to-purple-500",
  },
  {
    id: "6",
    name: "Crimson Wave",
    genre: "Alternative",
    subgenre: "Post-Rock",
    bio: "Anthemic alternative rock that builds from quiet vulnerability to explosive catharsis.",
    stats: {
      monthlyListeners: 820000,
      topTrack: "Digital Pulse",
      followers: 290000,
    },
    socialLinks: { spotify: "#", youtube: "#", instagram: "#" },
    tags: ["Alternative", "Rock", "Anthemic"],
    gradient: "from-red-500 via-rose-600 to-pink-600",
  },
];

const genres = [
  "All",
  "Hip Hop",
  "R&B",
  "Electronic",
  "Indie Pop",
  "Alternative",
];

const ArtistModal: React.FC<{ artist: Artist; onClose: () => void }> = ({
  artist,
  onClose,
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-6"
    style={{ background: "rgba(8,6,18,0.95)", backdropFilter: "blur(24px)" }}
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.95 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="max-w-2xl w-full rounded-3xl overflow-hidden relative"
      style={{
        background: "rgba(20,16,40,0.95)",
        border: "1px solid rgba(139,92,246,0.2)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Gradient header */}
      <div
        className={`h-32 bg-gradient-to-br ${artist.gradient} relative overflow-hidden`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-[140px] font-black text-white/10 leading-none"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {artist.name.charAt(0)}
          </span>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors text-lg font-light"
        >
          ×
        </button>
      </div>

      <div className="p-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2
              className="text-4xl font-bold text-white mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {artist.name}
            </h2>
            <span
              className="text-[11px] tracking-[0.3em] uppercase font-medium"
              style={{
                color: "#8B5CF6",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {artist.genre} · {artist.subgenre}
            </span>
          </div>
          <div className="flex space-x-3">
            {artist.socialLinks.spotify && (
              <a
                href={artist.socialLinks.spotify}
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-[#1DB954] hover:bg-[#1DB954]/10 transition-all"
              >
                <FaSpotify />
              </a>
            )}
            {artist.socialLinks.youtube && (
              <a
                href={artist.socialLinks.youtube}
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-[#FF0000] hover:bg-red-500/10 transition-all"
              >
                <FaYoutube />
              </a>
            )}
            {artist.socialLinks.instagram && (
              <a
                href={artist.socialLinks.instagram}
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-[#E1306C] hover:bg-pink-500/10 transition-all"
              >
                <FaInstagram />
              </a>
            )}
          </div>
        </div>

        <p
          className="text-white/50 leading-relaxed mb-8"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {artist.bio}
        </p>

        <div
          className="grid grid-cols-3 gap-4 mb-8 rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          {[
            {
              label: "Monthly Listeners",
              value: (artist.stats.monthlyListeners / 1000000).toFixed(1) + "M",
            },
            {
              label: "Followers",
              value: (artist.stats.followers / 1000).toFixed(0) + "K",
            },
            { label: "Top Track", value: artist.stats.topTrack },
          ].map((stat, i) => (
            <div key={i} className="text-center py-5">
              <div
                className="text-2xl font-bold mb-1"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  backgroundImage:
                    "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-[10px] tracking-[0.25em] text-white/30 uppercase"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {artist.tags.map((tag, i) => (
            <span
              key={i}
              className="px-4 py-1.5 rounded-full text-[11px] font-medium"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: "rgba(139,92,246,0.1)",
                border: "1px solid rgba(139,92,246,0.3)",
                color: "#A78BFA",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const ArtistsPage = () => {
  const [activeGenre, setActiveGenre] = useState("All");
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const filtered =
    activeGenre === "All" ? artists : (
      artists.filter(
        (a) => a.genre === activeGenre || a.subgenre === activeGenre,
      )
    );

  return (
    <div className="bg-[#080612] text-white min-h-screen">
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div
        className="max-w-7xl mx-auto px-6 pt-24 pb-12"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span
            className="text-[11px] tracking-[0.4em] font-medium uppercase block mb-4"
            style={{
              color: "#8B5CF6",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Our Roster
          </span>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <h1
              className="text-7xl md:text-9xl font-bold leading-none"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Artists
            </h1>
          </div>

          {/* Genre Filter */}
          <div className="flex flex-wrap gap-3">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className="px-5 py-2 rounded-full text-[12px] font-medium transition-all duration-300"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background:
                    activeGenre === genre ?
                      "linear-gradient(135deg, #3B82F6, #8B5CF6)"
                    : "rgba(255,255,255,0.05)",
                  color:
                    activeGenre === genre ? "white" : "rgba(255,255,255,0.4)",
                  border:
                    activeGenre === genre ? "none" : (
                      "1px solid rgba(255,255,255,0.1)"
                    ),
                }}
              >
                {genre}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Artists Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((artist, i) => (
              <motion.div
                key={artist.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onClick={() => setSelectedArtist(artist)}
              >
                {/* Cover image area */}
                <div
                  className={`w-full h-48 bg-gradient-to-br ${artist.gradient} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-[120px] font-black text-white/10 select-none"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {artist.name.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                    <span
                      className="text-[11px] font-semibold tracking-widest text-white uppercase"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      View Profile →
                    </span>
                  </div>
                </div>

                <div className="p-7">
                  <h3
                    className="text-2xl font-bold text-white mb-1 group-hover:text-transparent transition-all duration-300"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {artist.name}
                  </h3>
                  <span
                    className="text-[11px] font-medium uppercase tracking-wide"
                    style={{
                      color: "#8B5CF6",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {artist.genre}
                  </span>
                  <p
                    className="text-white/30 text-sm mt-3 leading-relaxed line-clamp-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {artist.bio}
                  </p>

                  <div className="flex space-x-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    {artist.socialLinks.spotify && (
                      <span
                        className="text-white/30 hover:text-[#1DB954] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaSpotify />
                      </span>
                    )}
                    {artist.socialLinks.instagram && (
                      <span
                        className="text-white/30 hover:text-[#E1306C] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaInstagram />
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedArtist && (
          <ArtistModal
            artist={selectedArtist}
            onClose={() => setSelectedArtist(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArtistsPage;
