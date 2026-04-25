// Components/MainComponent.tsx
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";

const MainComponent = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const featuredArtists = [
    {
      name: "Nujee",
      genre: "R&B / Soul",
      description:
        "Introspective soundscapes blending neo-soul with raw lyricism.",
      color: "from-blue-600 to-violet-600",
    },
    {
      name: "The Game",
      genre: "Hip Hop",
      description: "West coast storytelling with cinematic production.",
      color: "from-violet-600 to-pink-600",
    },
    {
      name: "Ib Matic",
      genre: "Hip Hop",
      description: "High-energy flows over meticulously crafted instrumentals.",
      color: "from-pink-600 to-red-500",
    },
  ];

  const stats = [
    { value: "50M+", label: "Streams" },
    { value: "30+", label: "Releases" },
    { value: "12", label: "Artists" },
    { value: "6", label: "Years" },
  ];

  return (
    <div className="bg-[#080612] text-white min-h-screen overflow-x-hidden">
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #3B82F6, #8B5CF6, transparent)",
            }}
          />
          <motion.div
            animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #EC4899, #EF4444, transparent)",
            }}
          />
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
            className="absolute top-[30%] right-[20%] w-[40vw] h-[40vw] rounded-full opacity-10 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #8B5CF6, #EC4899, transparent)",
            }}
          />
        </div>

        {/* Noise grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "200px",
          }}
        />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 text-center max-w-6xl px-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center space-x-2 mb-10 px-5 py-2 rounded-full border"
            style={{
              borderColor: "rgba(139,92,246,0.4)",
              background: "rgba(139,92,246,0.1)",
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span
              className="text-[11px] tracking-[0.3em] text-violet-300 uppercase font-medium"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              A Sony Music & The District Label
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-[72px] md:text-[120px] leading-[0.9] font-bold mb-8 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span
              className="block"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 40%, #EC4899 70%, #EF4444 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Sound
            </span>
            <span className="block text-white">Without</span>
            <span className="block text-white/20">Limits</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-[15px] text-white/50 max-w-xl mx-auto mb-14"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              lineHeight: 1.7,
            }}
          >
            Curating the future of music. Discover artists redefining the
            industry.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/artists"
              className="group inline-flex items-center space-x-3 px-8 py-4 rounded-full text-[13px] font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)",
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: "0 0 40px rgba(139,92,246,0.4)",
              }}
            >
              <span>Explore Artists</span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
            <Link
              to="/demo"
              className="group inline-flex items-center space-x-3 px-8 py-4 rounded-full text-[13px] font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{
                border: "1px solid rgba(139,92,246,0.4)",
                background: "rgba(139,92,246,0.08)",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              <span>Submit Demo</span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border flex items-start justify-center pt-2"
            style={{ borderColor: "rgba(139,92,246,0.4)" }}
          >
            <div
              className="w-1 h-2 rounded-full"
              style={{
                background: "linear-gradient(to bottom, #8B5CF6, #EC4899)",
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section
        className="py-12"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  backgroundImage:
                    "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </div>
              <div
                className="text-[11px] tracking-[0.3em] text-white/40 uppercase"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-16"
          >
            <div>
              <span
                className="text-[11px] tracking-[0.4em] font-medium uppercase block mb-4"
                style={{
                  color: "#8B5CF6",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Our Talent
              </span>
              <h2
                className="text-5xl md:text-6xl font-bold leading-none"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Featured
                <br />
                <span className="text-white/30">Artists</span>
              </h2>
            </div>
            <Link
              to="/artists"
              className="hidden md:inline-flex items-center space-x-2 text-[13px] font-medium text-violet-400 hover:text-white transition-colors group"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <span>View All</span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {featuredArtists.map((artist, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Artist color block */}
                <div
                  className={`h-40 bg-gradient-to-br ${artist.color} opacity-80 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-[120px] font-black text-white/10"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {artist.name.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span
                      className="text-[10px] tracking-[0.3em] text-white/80 uppercase font-medium"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {artist.genre}
                    </span>
                  </div>
                </div>

                <div className="p-7">
                  <div
                    className="text-[42px] font-black text-white/5 -mt-3 mb-3 leading-none"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    0{i + 1}
                  </div>
                  <h3
                    className="text-2xl font-bold text-white mb-3 group-hover:text-transparent transition-all duration-300"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {artist.name}
                  </h3>
                  <p
                    className="text-white/40 text-sm leading-relaxed"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {artist.description}
                  </p>
                  <div className="mt-6 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div
                      className="h-px flex-grow"
                      style={{
                        background: `linear-gradient(90deg, ${
                          i === 0 ? "#3B82F6, #8B5CF6"
                          : i === 1 ? "#8B5CF6, #EC4899"
                          : "#EC4899, #EF4444"
                        })`,
                      }}
                    />
                    <span
                      className="text-[11px] font-medium text-white/60"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      View Profile
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Label Identity */}
      <section className="py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Icon */}
            <div
              className="w-20 h-20 rounded-3xl mx-auto mb-12 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)",
                boxShadow: "0 0 60px rgba(139,92,246,0.5)",
              }}
            >
              <span
                className="text-3xl font-black text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                LR
              </span>
            </div>

            <h2
              className="text-4xl md:text-6xl font-bold leading-[1.1] mb-8"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Where{" "}
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                artistry
              </span>{" "}
              meets
              <br />
              industry excellence
            </h2>
            <p
              className="text-white/40 text-lg leading-relaxed max-w-2xl mx-auto mb-14"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Operating under Sony Music and The District, Luminal Records
              brings world-class resources to independent voices — managing,
              distributing, and amplifying the artists who define tomorrow's
              sound.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                "A&R",
                "Distribution",
                "Management",
                "Promotion",
                "Licensing",
              ].map((item, i) => (
                <span
                  key={i}
                  className="px-5 py-2 rounded-full text-[12px] font-medium tracking-wide"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background: "rgba(139,92,246,0.1)",
                    border: "1px solid rgba(139,92,246,0.3)",
                    color: "#A78BFA",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Split */}
      <section className="max-w-7xl mx-auto px-6 py-16 pb-32">
        <div className="grid md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden p-12 relative"
            style={{
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))",
              border: "1px solid rgba(139,92,246,0.25)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
              style={{
                background: "radial-gradient(circle, #8B5CF6, transparent)",
              }}
            />
            <span
              className="text-[11px] tracking-[0.4em] font-medium uppercase block mb-6 text-violet-400"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              For Artists
            </span>
            <h3
              className="text-4xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Ready to be{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                heard?
              </span>
            </h3>
            <p
              className="text-white/40 leading-relaxed mb-10"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              We listen to every submission. If your sound resonates with our
              vision, we'll reach out within 30 days.
            </p>
            <Link
              to="/demo"
              className="inline-flex items-center space-x-3 px-7 py-3.5 rounded-full text-[13px] font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: "0 0 30px rgba(139,92,246,0.3)",
              }}
            >
              <span>Submit Your Demo</span>
              <span>→</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden p-12 relative"
            style={{
              background:
                "linear-gradient(135deg, rgba(236,72,153,0.15), rgba(239,68,68,0.15))",
              border: "1px solid rgba(236,72,153,0.25)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
              style={{
                background: "radial-gradient(circle, #EC4899, transparent)",
              }}
            />
            <span
              className="text-[11px] tracking-[0.4em] font-medium uppercase block mb-6 text-pink-400"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              For Business
            </span>
            <h3
              className="text-4xl font-bold leading-tight mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Partnerships &{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #EC4899, #EF4444)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                sync.
              </span>
            </h3>
            <p
              className="text-white/40 leading-relaxed mb-10"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Licensing, sync opportunities, and business inquiries. Let's build
              something extraordinary together.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-3 px-7 py-3.5 rounded-full text-[13px] font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{
                border: "1px solid rgba(236,72,153,0.5)",
                background: "rgba(236,72,153,0.1)",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              <span>Get In Touch</span>
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MainComponent;
