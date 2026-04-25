// Components/MusicPlayer.tsx
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaVolumeMute,
  FaTimes,
} from "react-icons/fa";
import { usePlayer } from "./PlayerContext";

const MusicPlayer = () => {
  const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack } =
    usePlayer();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
    }
    if (currentTrack?.src) {
      audioRef.current.src = currentTrack.src;
      if (isPlaying) audioRef.current.play().catch(() => {});
    }
  }, [currentTrack]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying && currentTrack?.src) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onTimeUpdate);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onTimeUpdate);
    };
  }, []);

  // Reset visible when new track plays
  useEffect(() => {
    if (currentTrack) setVisible(true);
  }, [currentTrack]);

  const formatTime = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = ratio * duration;
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
    setMuted(v === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuted = !muted;
    setMuted(newMuted);
    audioRef.current.volume = newMuted ? 0 : volume;
  };

  if (!currentTrack) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50"
          style={{
            background: "rgba(10,8,20,0.97)",
            borderTop: "1px solid rgba(139,92,246,0.3)",
            backdropFilter: "blur(24px)",
          }}
        >
          {/* Progress Bar */}
          <div
            className="w-full h-1 cursor-pointer group relative"
            style={{ background: "rgba(255,255,255,0.08)" }}
            onClick={seekTo}
          >
            <div
              className="h-full transition-all duration-100"
              style={{
                width: duration ? `${(progress / duration) * 100}%` : "0%",
                background: "linear-gradient(90deg, #8B5CF6, #EC4899, #EF4444)",
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
            {/* Track Info */}
            <div className="flex items-center space-x-4 min-w-0 flex-1">
              <div
                className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-lg"
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                }}
              >
                <span
                  className="text-xl text-white/90 font-bold select-none"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {currentTrack.artist?.charAt(0)}
                </span>
              </div>
              <div className="min-w-0">
                <p
                  className="text-white text-sm font-semibold truncate"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {currentTrack.title}
                </p>
                <p
                  className="text-white/40 text-[11px] truncate"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {currentTrack.artist}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-5 flex-shrink-0">
              <button
                onClick={prevTrack}
                className="text-white/40 hover:text-white transition-colors"
              >
                <FaStepBackward className="text-sm" />
              </button>
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                }}
              >
                {isPlaying ?
                  <FaPause className="text-xs" />
                : <FaPlay className="text-xs ml-0.5" />}
              </button>
              <button
                onClick={nextTrack}
                className="text-white/40 hover:text-white transition-colors"
              >
                <FaStepForward className="text-sm" />
              </button>
            </div>

            {/* Time + Volume */}
            <div className="flex items-center space-x-5 flex-1 justify-end">
              <span
                className="text-white/30 text-[11px] hidden md:block"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {formatTime(progress)} / {formatTime(duration)}
              </span>
              <div className="hidden md:flex items-center space-x-3">
                <button
                  onClick={toggleMute}
                  className="text-white/30 hover:text-white transition-colors"
                >
                  {muted ?
                    <FaVolumeMute className="text-sm" />
                  : <FaVolumeUp className="text-sm" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={muted ? 0 : volume}
                  onChange={handleVolume}
                  className="w-20 cursor-pointer"
                  style={{ accentColor: "#8B5CF6" }}
                />
              </div>
              <button
                onClick={() => setVisible(false)}
                className="text-white/20 hover:text-white/60 transition-colors"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MusicPlayer;
