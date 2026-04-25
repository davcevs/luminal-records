// Components/Navbar.tsx
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// interface NavbarProps {
//   isDarkMode: boolean;
//   setIsDarkMode: (value: boolean) => void;
// }

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Artists", path: "/artists" },
    { label: "Releases", path: "/releases" },
    { label: "Submit Demo", path: "/demo" },
    { label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(8,6,18,0.96)" : "transparent",
          borderBottom:
            scrolled ?
              "1px solid rgba(139,92,246,0.2)"
            : "1px solid transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center space-x-3 select-none"
          >
            {/* Logo mark */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)",
              }}
            >
              <span
                className="text-white font-black text-sm"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                LR
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-[10px] tracking-[0.3em] uppercase font-medium"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#8B5CF6",
                }}
              >
                Est. 2024
              </span>
              <span
                className="text-[18px] font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  backgroundImage:
                    "linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                LUMINAL RECORDS
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ label, path }) => (
              <Link key={path} to={path} className="relative group">
                <span
                  className={`text-[13px] tracking-wide font-medium transition-colors duration-300 ${
                    location.pathname === path ?
                      "text-white"
                    : "text-white/50 hover:text-white"
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {label}
                </span>
                {location.pathname === path && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #8B5CF6, #EC4899)",
                    }}
                  />
                )}
              </Link>
            ))}
            <Link
              to="/admin"
              className="text-[13px] font-medium text-white/20 hover:text-white/60 transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex flex-col space-y-1.5 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{
                  rotate:
                    i === 0 && isMenuOpen ? 45
                    : i === 2 && isMenuOpen ? -45
                    : 0,
                  y:
                    i === 0 && isMenuOpen ? 8
                    : i === 2 && isMenuOpen ? -8
                    : 0,
                  opacity: i === 1 && isMenuOpen ? 0 : 1,
                }}
                className="block w-6 h-0.5 rounded-full bg-white origin-center"
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{
              background: "rgba(8,6,18,0.98)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div className="space-y-8 text-center">
              {[...navItems, { label: "Admin", path: "/admin" }].map(
                ({ label, path }, i) => (
                  <motion.div
                    key={path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      to={path}
                      className="block text-5xl font-bold text-white hover:text-transparent transition-all duration-300"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        ...(location.pathname === path ?
                          {
                            backgroundImage:
                              "linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }
                        : {}),
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ),
              )}
            </div>
            <div
              className="absolute bottom-12 text-[11px] tracking-[0.3em] text-white/20 uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              © 2024 Luminal Records
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
