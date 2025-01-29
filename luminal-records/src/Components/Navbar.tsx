import { Link, useLocation } from "react-router-dom";
import { FaHome, FaMusic, FaArtstation, FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const Navbar = ({ isDarkMode, setIsDarkMode }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();

  const navItems = [
    { icon: FaHome, label: "Home", path: "/" },
    { icon: FaMusic, label: "Artists", path: "/artists" },
    { icon: FaArtstation, label: "Releases", path: "/releases" },
    { icon: FaEnvelope, label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -100, opacity: 0 },
  };

  return (
    <motion.nav
      initial="visible"
      animate={scrollPosition > 100 ? "hidden" : "visible"}
      variants={navVariants}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-white/10"
      style={{
        background: `rgba(0, 0, 0, ${Math.min(scrollPosition / 200, 0.9)})`,
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-extrabold"
          >
            <Link
              to="/"
              className="hover:text-red-400 transition-all duration-300"
            >
              Luminal<span className="text-red-500">Records</span>
            </Link>
          </motion.div>

          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map(({ icon: Icon, label, path }) => (
              <motion.div
                key={path}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={path}
                  className={`flex items-center space-x-2 font-medium relative group ${
                    location.pathname === path ? "text-red-400" : "text-white"
                  }`}
                >
                  <Icon className="text-xl" />
                  <span>{label}</span>
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-red-400 origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: location.pathname === path ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "×" : "☰"}
          </motion.button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4"
            >
              {navItems.map(({ icon: Icon, label, path }) => (
                <motion.div
                  key={path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                >
                  <Link
                    to={path}
                    className={`flex items-center space-x-2 py-3 px-4 rounded-lg transition-colors ${
                      location.pathname === path
                        ? "bg-red-500/20 text-red-400"
                        : "hover:bg-white/10"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="text-xl" />
                    <span>{label}</span>
                  </Link>
                </motion.div>
              ))}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="w-full flex items-center space-x-2 py-3 px-4 rounded-lg hover:bg-white/10"
              >
                <span>{isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
