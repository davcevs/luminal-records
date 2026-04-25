// Components/AdminPanel.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaEdit,
  FaTrash,
  FaPlus,
  FaEye,
  FaCheck,
  FaMusic,
  FaUsers,
  FaEnvelope,
  FaCompactDisc,
} from "react-icons/fa";

interface DemoSubmission {
  id: string;
  artistName: string;
  genre: string;
  email: string;
  demoLink: string;
  submittedAt: string;
  status: "pending" | "reviewed" | "interested" | "declined";
  city: string;
}
interface Artist {
  id: string;
  name: string;
  genre: string;
  active: boolean;
  monthlyListeners: number;
}
interface Track {
  id: string;
  title: string;
  artist: string;
  genre: string;
  uploadedAt: string;
  plays: number;
}
interface Message {
  id: string;
  name: string;
  email: string;
  inquiry: string;
  subject: string;
  message: string;
  receivedAt: string;
  read: boolean;
}

const mockSubmissions: DemoSubmission[] = [
  {
    id: "1",
    artistName: "Luna Vox",
    genre: "R&B",
    email: "luna@email.com",
    demoLink: "soundcloud.com/lunavox",
    submittedAt: "2024-06-10",
    status: "pending",
    city: "Atlanta",
  },
  {
    id: "2",
    artistName: "Dario X",
    genre: "Hip Hop",
    email: "dario@email.com",
    demoLink: "spotify.com/dariox",
    submittedAt: "2024-06-08",
    status: "interested",
    city: "New York",
  },
  {
    id: "3",
    artistName: "Solar",
    genre: "Electronic",
    email: "solar@email.com",
    demoLink: "youtube.com/solar",
    submittedAt: "2024-06-05",
    status: "reviewed",
    city: "London",
  },
  {
    id: "4",
    artistName: "Mira Tone",
    genre: "Indie Pop",
    email: "mira@email.com",
    demoLink: "soundcloud.com/miratone",
    submittedAt: "2024-06-03",
    status: "declined",
    city: "Chicago",
  },
];
const mockArtists: Artist[] = [
  {
    id: "1",
    name: "Nujee",
    genre: "R&B",
    active: true,
    monthlyListeners: 1250000,
  },
  {
    id: "2",
    name: "The Game",
    genre: "Hip Hop",
    active: true,
    monthlyListeners: 890000,
  },
  {
    id: "3",
    name: "Ib Matic",
    genre: "Hip Hop",
    active: true,
    monthlyListeners: 750000,
  },
  {
    id: "4",
    name: "Neon Pulse",
    genre: "Electronic",
    active: false,
    monthlyListeners: 320000,
  },
];
const mockTracks: Track[] = [
  {
    id: "1",
    title: "Digital Dreams",
    artist: "Neon Pulse",
    genre: "Electronic",
    uploadedAt: "2024-06-01",
    plays: 125000,
  },
  {
    id: "2",
    title: "Midnight Sessions",
    artist: "Nujee",
    genre: "R&B",
    uploadedAt: "2024-05-20",
    plays: 89000,
  },
  {
    id: "3",
    title: "Game Time",
    artist: "The Game",
    genre: "Hip Hop",
    uploadedAt: "2024-05-15",
    plays: 210000,
  },
  {
    id: "4",
    title: "Frequency",
    artist: "Ib Matic",
    genre: "Hip Hop",
    uploadedAt: "2024-05-10",
    plays: 67000,
  },
];
const mockMessages: Message[] = [
  {
    id: "1",
    name: "Sony Music Rep",
    email: "rep@sony.com",
    inquiry: "business",
    subject: "Q3 Campaign Partnership",
    message: "Hi, we'd like to discuss a partnership...",
    receivedAt: "2024-06-10",
    read: false,
  },
  {
    id: "2",
    name: "Film Sync Agency",
    email: "sync@agency.com",
    inquiry: "sync",
    subject: "Netflix Show Sync Opportunity",
    message: "We're looking for hip hop tracks...",
    receivedAt: "2024-06-08",
    read: true,
  },
  {
    id: "3",
    name: "Music Blog Editor",
    email: "editor@blog.com",
    inquiry: "press",
    subject: "Interview Request — Nujee",
    message: "We'd love to feature Nujee...",
    receivedAt: "2024-06-07",
    read: false,
  },
];

const statusConfig = {
  pending: {
    color: "#FBBF24",
    bg: "rgba(251,191,36,0.1)",
    border: "rgba(251,191,36,0.3)",
  },
  reviewed: {
    color: "#60A5FA",
    bg: "rgba(96,165,250,0.1)",
    border: "rgba(96,165,250,0.3)",
  },
  interested: {
    color: "#34D399",
    bg: "rgba(52,211,153,0.1)",
    border: "rgba(52,211,153,0.3)",
  },
  declined: {
    color: "#F87171",
    bg: "rgba(248,113,113,0.1)",
    border: "rgba(248,113,113,0.3)",
  },
};

const StatusBadge = ({ status }: { status: DemoSubmission["status"] }) => {
  const c = statusConfig[status];
  return (
    <span
      className="text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1 rounded-full"
      style={{
        color: c.color,
        background: c.bg,
        border: `1px solid ${c.border}`,
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {status}
    </span>
  );
};

const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "luminal2024") {
      onLogin();
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="bg-[#080612] min-h-screen flex items-center justify-center">
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full px-8"
      >
        <div
          className="w-16 h-16 rounded-2xl mx-auto mb-10 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)",
            boxShadow: "0 0 50px rgba(139,92,246,0.4)",
          }}
        >
          <span
            className="text-2xl font-black text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            LR
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-center text-white mb-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Admin Access
        </h1>
        <p
          className="text-center text-white/30 text-[11px] tracking-[0.3em] uppercase mb-10"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Luminal Records
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="text-[10px] tracking-[0.3em] font-medium uppercase block mb-2"
              style={{
                color: "#8B5CF6",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full bg-white/5 rounded-xl px-5 py-4 text-white border border-white/10 focus:outline-none focus:border-violet-500 transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              placeholder="Enter admin password"
            />
            {error && (
              <p
                className="text-red-400/70 text-[11px] mt-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {error}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-xl text-[13px] font-bold text-white transition-all hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)",
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: "0 0 30px rgba(139,92,246,0.3)",
            }}
          >
            Access Dashboard
          </button>
          <p
            className="text-center text-white/20 text-[11px] mt-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Demo: luminal2024
          </p>
        </form>
      </motion.div>
    </div>
  );
};

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "demos" | "artists" | "tracks" | "messages"
  >("overview");
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [tracks, setTracks] = useState(mockTracks);
  const [artists, setArtists] = useState(mockArtists);
  const [messages, setMessages] = useState(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showAddTrack, setShowAddTrack] = useState(false);
  const [newTrack, setNewTrack] = useState({
    title: "",
    artist: "",
    genre: "",
    src: "",
  });

  if (!isLoggedIn) return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;

  const updateSubmissionStatus = (
    id: string,
    status: DemoSubmission["status"],
  ) =>
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s)),
    );
  const deleteTrack = (id: string) =>
    setTracks((prev) => prev.filter((t) => t.id !== id));
  const addTrack = () => {
    if (newTrack.title && newTrack.artist) {
      setTracks((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          ...newTrack,
          uploadedAt: new Date().toISOString().split("T")[0],
          plays: 0,
        },
      ]);
      setNewTrack({ title: "", artist: "", genre: "", src: "" });
      setShowAddTrack(false);
    }
  };
  const toggleArtistActive = (id: string) =>
    setArtists((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a)),
    );
  const markMessageRead = (id: string) =>
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m)),
    );

  const tabs = [
    { id: "overview", label: "Overview" },
    {
      id: "demos",
      label: "Demo Submissions",
      badge: submissions.filter((s) => s.status === "pending").length,
    },
    { id: "artists", label: "Artists" },
    { id: "tracks", label: "Track Library" },
    {
      id: "messages",
      label: "Messages",
      badge: messages.filter((m) => !m.read).length,
    },
  ] as const;

  const stats = [
    {
      label: "Total Artists",
      value: artists.length,
      sub: `${artists.filter((a) => a.active).length} active`,
      color: "#3B82F6",
    },
    {
      label: "Demo Submissions",
      value: submissions.length,
      sub: `${submissions.filter((s) => s.status === "pending").length} pending`,
      color: "#8B5CF6",
    },
    {
      label: "Tracks Uploaded",
      value: tracks.length,
      sub: "In library",
      color: "#EC4899",
    },
    {
      label: "Unread Messages",
      value: messages.filter((m) => !m.read).length,
      sub: "Needs attention",
      color: "#EF4444",
    },
  ];

  const inputClass =
    "w-full bg-white/5 rounded-xl px-4 py-3 text-white border border-white/10 focus:outline-none focus:border-violet-500 transition-colors placeholder:text-white/20";
  const inputStyle = { fontFamily: "'Space Grotesk', sans-serif" };

  return (
    <div className="bg-[#080612] text-white min-h-screen">
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Admin Header */}
      <div
        style={{
          background: "rgba(10,8,20,0.98)",
          borderBottom: "1px solid rgba(139,92,246,0.15)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)",
              }}
            >
              <span
                className="text-white font-black text-xs"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                LR
              </span>
            </div>
            <div>
              <div
                className="text-[9px] tracking-[0.4em] uppercase font-medium"
                style={{
                  color: "#8B5CF6",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Admin Dashboard
              </div>
              <div
                className="text-lg font-bold text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Luminal Records
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-[12px] font-medium text-white/30 hover:text-white transition-colors"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-10 overflow-x-auto pb-1">
          {tabs.map(({ id, label, badge }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="relative flex-shrink-0 px-5 py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-200"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background:
                  activeTab === id ?
                    "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))"
                  : "transparent",
                color: activeTab === id ? "white" : "rgba(255,255,255,0.4)",
                border:
                  activeTab === id ?
                    "1px solid rgba(139,92,246,0.4)"
                  : "1px solid transparent",
              }}
            >
              {label}
              {badge !== undefined && badge > 0 && (
                <span
                  className="ml-2 px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                  }}
                >
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── Overview ── */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-6"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      className="text-4xl font-bold mb-2"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: stat.color,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-white/60 text-sm mb-1 font-medium"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {stat.label}
                    </div>
                    <div
                      className="text-white/20 text-[11px]"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {stat.sub}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3
                    className="text-xl font-bold text-white mb-4"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Recent Submissions
                  </h3>
                  <div className="space-y-2">
                    {submissions.slice(0, 3).map((sub) => (
                      <div
                        key={sub.id}
                        className="flex items-center justify-between p-4 rounded-xl"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <div>
                          <p
                            className="text-white font-semibold text-sm"
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                            }}
                          >
                            {sub.artistName}
                          </p>
                          <p
                            className="text-white/30 text-[11px] mt-0.5"
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                            }}
                          >
                            {sub.genre} · {sub.city}
                          </p>
                        </div>
                        <StatusBadge status={sub.status} />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3
                    className="text-xl font-bold text-white mb-4"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Unread Messages
                  </h3>
                  {messages
                    .filter((m) => !m.read)
                    .map((msg) => (
                      <div
                        key={msg.id}
                        className="p-4 rounded-xl mb-2"
                        style={{
                          background: "rgba(139,92,246,0.08)",
                          border: "1px solid rgba(139,92,246,0.2)",
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p
                              className="text-white font-semibold text-sm"
                              style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                              }}
                            >
                              {msg.subject}
                            </p>
                            <p
                              className="text-white/40 text-[11px] mt-1"
                              style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                              }}
                            >
                              From: {msg.name}
                            </p>
                          </div>
                          <span
                            className="text-[9px] tracking-widest font-bold px-2 py-0.5 rounded-full"
                            style={{
                              background: "rgba(139,92,246,0.2)",
                              color: "#A78BFA",
                              fontFamily: "'Space Grotesk', sans-serif",
                            }}
                          >
                            NEW
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Demo Submissions ── */}
          {activeTab === "demos" && (
            <motion.div
              key="demos"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-3xl font-bold text-white"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Demo Submissions
                </h2>
                <span
                  className="text-white/30 text-[12px]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {submissions.length} total
                </span>
              </div>
              <div className="space-y-3">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="rounded-2xl p-6"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div className="flex-grow">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3
                            className="text-lg font-bold text-white"
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                            }}
                          >
                            {sub.artistName}
                          </h3>
                          <StatusBadge status={sub.status} />
                        </div>
                        <div
                          className="flex flex-wrap gap-3 text-[12px] text-white/30 mb-3"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          <span>{sub.genre}</span>
                          <span>·</span>
                          <span>{sub.city}</span>
                          <span>·</span>
                          <span>{sub.email}</span>
                          <span>·</span>
                          <span>{sub.submittedAt}</span>
                        </div>
                        <a
                          href={`https://${sub.demoLink}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-violet-400 hover:text-white text-[12px] font-medium transition-colors"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          <FaPlay className="text-xs" />
                          <span>{sub.demoLink}</span>
                        </a>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(
                          [
                            "pending",
                            "reviewed",
                            "interested",
                            "declined",
                          ] as const
                        ).map((status) => (
                          <button
                            key={status}
                            onClick={() =>
                              updateSubmissionStatus(sub.id, status)
                            }
                            className="text-[10px] font-semibold tracking-wide uppercase px-3 py-1.5 rounded-lg transition-all"
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                              background:
                                sub.status === status ?
                                  "rgba(139,92,246,0.2)"
                                : "rgba(255,255,255,0.05)",
                              color:
                                sub.status === status ?
                                  "#A78BFA"
                                : "rgba(255,255,255,0.3)",
                              border:
                                sub.status === status ?
                                  "1px solid rgba(139,92,246,0.4)"
                                : "1px solid rgba(255,255,255,0.08)",
                            }}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Artists ── */}
          {activeTab === "artists" && (
            <motion.div
              key="artists"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <h2
                className="text-3xl font-bold text-white mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Artist Roster
              </h2>
              <div className="space-y-3">
                {artists.map((artist) => (
                  <div
                    key={artist.id}
                    className="rounded-2xl p-6 flex items-center justify-between"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white"
                        style={{
                          background:
                            "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                        }}
                      >
                        {artist.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <h3
                            className="text-lg font-bold text-white"
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                            }}
                          >
                            {artist.name}
                          </h3>
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                              color:
                                artist.active ? "#34D399" : (
                                  "rgba(255,255,255,0.3)"
                                ),
                              background:
                                artist.active ?
                                  "rgba(52,211,153,0.1)"
                                : "rgba(255,255,255,0.05)",
                            }}
                          >
                            {artist.active ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <div
                          className="flex space-x-3 text-[12px] text-white/30"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          <span>{artist.genre}</span>
                          <span>·</span>
                          <span>
                            {(artist.monthlyListeners / 1000000).toFixed(1)}M
                            monthly listeners
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleArtistActive(artist.id)}
                        className="text-[11px] font-semibold px-4 py-2 rounded-xl transition-all"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          background:
                            artist.active ?
                              "rgba(248,113,113,0.1)"
                            : "rgba(52,211,153,0.1)",
                          color: artist.active ? "#F87171" : "#34D399",
                          border:
                            artist.active ?
                              "1px solid rgba(248,113,113,0.3)"
                            : "1px solid rgba(52,211,153,0.3)",
                        }}
                      >
                        {artist.active ? "Deactivate" : "Activate"}
                      </button>
                      <button className="text-white/20 hover:text-violet-400 transition-colors p-2">
                        <FaEdit />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Track Library ── */}
          {activeTab === "tracks" && (
            <motion.div
              key="tracks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-3xl font-bold text-white"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Track Library
                </h2>
                <button
                  onClick={() => setShowAddTrack(!showAddTrack)}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-[12px] font-bold text-white transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  <FaPlus className="text-xs" />
                  <span>Add Track</span>
                </button>
              </div>

              <AnimatePresence>
                {showAddTrack && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mb-5"
                  >
                    <div
                      className="rounded-2xl p-7 mb-4"
                      style={{
                        background: "rgba(139,92,246,0.08)",
                        border: "1px solid rgba(139,92,246,0.25)",
                      }}
                    >
                      <span
                        className="text-[10px] tracking-[0.3em] font-semibold uppercase block mb-5"
                        style={{
                          color: "#A78BFA",
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                      >
                        New Track
                      </span>
                      <div className="grid md:grid-cols-2 gap-4 mb-5">
                        {[
                          { label: "Track Title", key: "title" },
                          { label: "Artist Name", key: "artist" },
                          { label: "Genre", key: "genre" },
                          { label: "Audio URL", key: "src" },
                        ].map(({ label, key }) => (
                          <div key={key}>
                            <label
                              className="text-[10px] tracking-[0.3em] font-medium uppercase block mb-2"
                              style={{
                                color: "#8B5CF6",
                                fontFamily: "'Space Grotesk', sans-serif",
                              }}
                            >
                              {label}
                            </label>
                            <input
                              type="text"
                              value={newTrack[key as keyof typeof newTrack]}
                              onChange={(e) =>
                                setNewTrack((p) => ({
                                  ...p,
                                  [key]: e.target.value,
                                }))
                              }
                              className={inputClass}
                              style={inputStyle}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={addTrack}
                          className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl text-[12px] font-bold text-white"
                          style={{
                            background:
                              "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                            fontFamily: "'Space Grotesk', sans-serif",
                          }}
                        >
                          <FaCheck className="text-xs" />
                          <span>Save Track</span>
                        </button>
                        <button
                          onClick={() => setShowAddTrack(false)}
                          className="text-[12px] font-medium text-white/30 hover:text-white transition-colors"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Table */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="grid grid-cols-12 gap-4 px-6 py-3 text-[10px] tracking-[0.3em] text-white/20 uppercase"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background: "rgba(255,255,255,0.03)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span className="col-span-4">Title</span>
                  <span className="col-span-2">Artist</span>
                  <span className="col-span-2">Genre</span>
                  <span className="col-span-2">Plays</span>
                  <span className="col-span-1">Date</span>
                  <span className="col-span-1"></span>
                </div>
                {tracks.map((track, i) => (
                  <div
                    key={track.id}
                    className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-white/5 transition-colors group items-center"
                    style={{
                      borderBottom:
                        i < tracks.length - 1 ?
                          "1px solid rgba(255,255,255,0.05)"
                        : "none",
                    }}
                  >
                    <div className="col-span-4 flex items-center space-x-3">
                      <span
                        className="text-white/20 text-[11px] w-4"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {i + 1}
                      </span>
                      <span
                        className="text-white text-sm font-medium"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {track.title}
                      </span>
                    </div>
                    <span
                      className="col-span-2 text-white/50 text-[12px]"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {track.artist}
                    </span>
                    <span
                      className="col-span-2 text-white/30 text-[11px]"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {track.genre}
                    </span>
                    <span
                      className="col-span-2 text-[12px] font-medium"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: "#A78BFA",
                      }}
                    >
                      {track.plays.toLocaleString()}
                    </span>
                    <span
                      className="col-span-1 text-white/20 text-[11px]"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {track.uploadedAt}
                    </span>
                    <div className="col-span-1 flex justify-end">
                      <button
                        onClick={() => deleteTrack(track.id)}
                        className="text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── Messages ── */}
          {activeTab === "messages" && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <h2
                className="text-3xl font-bold text-white mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Messages
              </h2>
              <div className="grid lg:grid-cols-2 gap-5">
                <div className="space-y-2">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-5 rounded-2xl cursor-pointer transition-all"
                      style={{
                        background:
                          selectedMessage?.id === msg.id ?
                            "rgba(139,92,246,0.15)"
                          : "rgba(255,255,255,0.04)",
                        border:
                          selectedMessage?.id === msg.id ?
                            "1px solid rgba(139,92,246,0.4)"
                          : "1px solid rgba(255,255,255,0.08)",
                      }}
                      onClick={() => {
                        setSelectedMessage(msg);
                        markMessageRead(msg.id);
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {!msg.read && (
                            <div
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ background: "#8B5CF6" }}
                            />
                          )}
                          <p
                            className="text-sm font-semibold"
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                              color:
                                msg.read ? "rgba(255,255,255,0.6)" : "white",
                            }}
                          >
                            {msg.subject}
                          </p>
                        </div>
                        <span
                          className="text-[10px] text-white/20"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {msg.receivedAt}
                        </span>
                      </div>
                      <p
                        className="text-white/30 text-[12px]"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {msg.name} · {msg.inquiry}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Message Detail */}
                <div
                  className="rounded-2xl p-8 h-fit sticky top-24"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {selectedMessage ?
                    <>
                      <span
                        className="text-[10px] tracking-[0.3em] font-semibold uppercase block mb-2"
                        style={{
                          color: "#8B5CF6",
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                      >
                        {selectedMessage.inquiry}
                      </span>
                      <h3
                        className="text-2xl font-bold text-white mb-5"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {selectedMessage.subject}
                      </h3>
                      <div
                        className="rounded-xl p-4 mb-5 space-y-2"
                        style={{ background: "rgba(255,255,255,0.04)" }}
                      >
                        {[
                          ["From", selectedMessage.name],
                          ["Email", selectedMessage.email],
                          ["Date", selectedMessage.receivedAt],
                        ].map(([k, v]) => (
                          <div
                            key={k}
                            className="flex space-x-3 text-[13px]"
                            style={{
                              fontFamily: "'Space Grotesk', sans-serif",
                            }}
                          >
                            <span className="text-white/30">{k}:</span>
                            <span className="text-white/70 font-medium">
                              {v}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p
                        className="text-white/50 leading-relaxed mb-8"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {selectedMessage.message}
                      </p>
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-[12px] font-bold text-white transition-all hover:scale-105"
                        style={{
                          background:
                            "linear-gradient(135deg, #8B5CF6, #EC4899)",
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                      >
                        <span>Reply via Email</span>
                        <span>→</span>
                      </a>
                    </>
                  : <div className="text-center py-16 text-white/20">
                      <FaEnvelope className="text-4xl mx-auto mb-4 opacity-30" />
                      <p
                        className="text-[12px] tracking-widest uppercase"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        Select a message
                      </p>
                    </div>
                  }
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminPanel;
