// Components/ReleasesPage.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaPause,
  FaCompactDisc,
  FaSpotify,
  FaYoutube,
} from "react-icons/fa";
import { usePlayer } from "./PlayerContext";

interface Release {
  id: string;
  title: string;
  artist: string;
  date: string;
  genre: string;
  type: "Single" | "EP" | "Album";
  trackCount?: number;
  description: string;
  tracks: { id: string; title: string; duration: string; src: string }[];
  gradient: string;
}

const releases: Release[] = [
  {
    id: "1",
    title: "Neon Horizons",
    artist: "Neon Pulse",
    date: "June 2024",
    genre: "Electronic",
    type: "EP",
    trackCount: 5,
    description:
      "A sonic journey through futuristic landscapes and digital dreamscapes.",
    tracks: [
      { id: "t1", title: "Digital Dreams", duration: "3:42", src: "" },
      { id: "t2", title: "Neon Horizons", duration: "4:15", src: "" },
      { id: "t3", title: "Electric Pulse", duration: "3:58", src: "" },
    ],
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    id: "2",
    title: "Crimson Echoes",
    artist: "Crimson Wave",
    date: "May 2024",
    genre: "Alternative Rock",
    type: "Album",
    trackCount: 11,
    description:
      "Anthemic rock textures woven into stories of triumph and loss.",
    tracks: [
      { id: "t4", title: "Echoes of Tomorrow", duration: "4:02", src: "" },
      { id: "t5", title: "Crimson Sky", duration: "3:45", src: "" },
      { id: "t6", title: "The Fall", duration: "5:12", src: "" },
    ],
    gradient: "from-red-600 to-rose-500",
  },
  {
    id: "3",
    title: "Midnight Sessions",
    artist: "Nujee",
    date: "April 2024",
    genre: "R&B",
    type: "Single",
    description:
      "A smooth, late-night vibe with introspective lyrics about love and identity.",
    tracks: [
      { id: "t7", title: "Midnight Sessions", duration: "3:28", src: "" },
    ],
    gradient: "from-violet-700 to-purple-600",
  },
  {
    id: "4",
    title: "Game Tape Vol. 1",
    artist: "The Game",
    date: "March 2024",
    genre: "Hip Hop",
    type: "EP",
    trackCount: 6,
    description:
      "West coast narratives over cinematic beats. Raw, honest, unflinching.",
    tracks: [
      { id: "t8", title: "Intro: Legacy", duration: "1:45", src: "" },
      { id: "t9", title: "Game Time", duration: "3:20", src: "" },
      { id: "t10", title: "Sunset Strip", duration: "4:01", src: "" },
    ],
    gradient: "from-pink-600 to-violet-600",
  },
  {
    id: "5",
    title: "Quantum Resonance",
    artist: "Ib Matic",
    date: "February 2024",
    genre: "Hip Hop",
    type: "Album",
    trackCount: 14,
    description:
      "Trap energy elevated to an art form. High-concept lyricism meets future production.",
    tracks: [
      { id: "t11", title: "Frequency", duration: "2:55", src: "" },
      { id: "t12", title: "Resonance", duration: "3:38", src: "" },
    ],
    gradient: "from-pink-500 to-red-500",
  },
];

const typeConfig: Record<string, { label: string; color: string; bg: string }> =
  {
    Single: { label: "Single", color: "#60A5FA", bg: "rgba(59,130,246,0.1)" },
    EP: { label: "EP", color: "#A78BFA", bg: "rgba(139,92,246,0.1)" },
    Album: { label: "Album", color: "#34D399", bg: "rgba(16,185,129,0.1)" },
  };

const ReleasesPage = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<
    "All" | "Single" | "EP" | "Album"
  >("All");
  const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayer();

  const filtered =
    filterType === "All" ? releases : (
      releases.filter((r) => r.type === filterType)
    );

  const handlePlayTrack = (
    release: Release,
    track: (typeof release.tracks)[0],
  ) => {
    const playerTrack = {
      id: track.id,
      title: track.title,
      artist: release.artist,
      src: track.src,
      genre: release.genre,
    };
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      playTrack(playerTrack);
    }
  };

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
            Discography
          </span>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <h1
              className="text-7xl md:text-9xl font-bold leading-none"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Releases
            </h1>
            <div className="flex gap-3 pb-2">
              {(["All", "Single", "EP", "Album"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className="px-5 py-2 rounded-full text-[12px] font-medium transition-all"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background:
                      filterType === type ?
                        "linear-gradient(135deg, #8B5CF6, #EC4899)"
                      : "rgba(255,255,255,0.05)",
                    color:
                      filterType === type ? "white" : "rgba(255,255,255,0.4)",
                    border:
                      filterType === type ? "none" : (
                        "1px solid rgba(255,255,255,0.1)"
                      ),
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Releases List */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((release, i) => {
              const tc = typeConfig[release.type];
              return (
                <motion.div
                  key={release.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Release Header */}
                  <div
                    className="p-6 flex items-center justify-between cursor-pointer group"
                    onClick={() =>
                      setExpandedId(
                        expandedId === release.id ? null : release.id,
                      )
                    }
                  >
                    <div className="flex items-center space-x-5">
                      {/* Cover */}
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${release.gradient} flex items-center justify-center flex-shrink-0`}
                      >
                        <FaCompactDisc className="text-white/30 text-2xl" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <h3
                            className="text-xl font-bold text-white group-hover:text-transparent transition-all duration-300"
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                            }}
                          >
                            {release.title}
                          </h3>
                          <span
                            className="text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-0.5 rounded-full"
                            style={{
                              color: tc.color,
                              background: tc.bg,
                              fontFamily: "'Space Grotesk', sans-serif",
                            }}
                          >
                            {tc.label}
                          </span>
                        </div>
                        <div
                          className="flex items-center space-x-3 text-[12px] text-white/40"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          <span className="font-medium text-white/60">
                            {release.artist}
                          </span>
                          <span>·</span>
                          <span>{release.genre}</span>
                          <span>·</span>
                          <span>{release.date}</span>
                          {release.trackCount && (
                            <>
                              <span>·</span>
                              <span>{release.trackCount} tracks</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedId === release.id ? 45 : 0 }}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 text-xl font-light"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      +
                    </motion.div>
                  </div>

                  {/* Expanded */}
                  <AnimatePresence>
                    {expandedId === release.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                        style={{
                          borderTop: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <div className="p-7 pt-5">
                          <p
                            className="text-white/40 mb-7 leading-relaxed"
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                            }}
                          >
                            {release.description}
                          </p>

                          {/* Tracklist */}
                          <div
                            className="space-y-1 mb-7 rounded-xl overflow-hidden"
                            style={{ background: "rgba(255,255,255,0.03)" }}
                          >
                            {release.tracks.map((track, ti) => {
                              const isCurrentTrack =
                                currentTrack?.id === track.id;
                              return (
                                <div
                                  key={track.id}
                                  className="flex items-center space-x-4 px-4 py-3 hover:bg-white/5 group/track cursor-pointer transition-colors"
                                  onClick={() =>
                                    handlePlayTrack(release, track)
                                  }
                                >
                                  <div className="w-6 text-center flex-shrink-0">
                                    {isCurrentTrack ?
                                      <span style={{ color: "#8B5CF6" }}>
                                        {isPlaying ?
                                          <FaPause className="text-xs" />
                                        : <FaPlay className="text-xs" />}
                                      </span>
                                    : <>
                                        <span
                                          className="text-white/20 group-hover/track:hidden text-[11px]"
                                          style={{
                                            fontFamily:
                                              "'Space Grotesk', sans-serif",
                                          }}
                                        >
                                          {ti + 1}
                                        </span>
                                        <FaPlay className="text-white/50 text-xs hidden group-hover/track:block" />
                                      </>
                                    }
                                  </div>
                                  <span
                                    className="flex-grow text-sm font-medium transition-colors"
                                    style={{
                                      fontFamily: "'Space Grotesk', sans-serif",
                                      color:
                                        isCurrentTrack ? "#A78BFA" : (
                                          "rgba(255,255,255,0.6)"
                                        ),
                                    }}
                                  >
                                    {track.title}
                                  </span>
                                  <span
                                    className="text-white/20 text-[11px]"
                                    style={{
                                      fontFamily: "'Space Grotesk', sans-serif",
                                    }}
                                  >
                                    {track.duration}
                                  </span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Stream links */}
                          <div className="flex items-center space-x-4">
                            <span
                              className="text-[11px] text-white/20 uppercase tracking-widest"
                              style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                              }}
                            >
                              Stream on
                            </span>
                            <a
                              href="#"
                              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/30 hover:text-[#1DB954] hover:bg-[#1DB954]/10 transition-all"
                            >
                              <FaSpotify />
                            </a>
                            <a
                              href="#"
                              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/30 hover:text-[#FF0000] hover:bg-red-500/10 transition-all"
                            >
                              <FaYoutube />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ReleasesPage;
