import { Link } from "react-router-dom";
import { FaHome, FaMusic, FaArtstation, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { icon: FaHome, label: "Home", path: "/" },
    { icon: FaMusic, label: "Artists", path: "/artists" },
    { icon: FaArtstation, label: "Releases", path: "/releases" },
    { icon: FaEnvelope, label: "Contact", path: "/contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav
      className="bg-opacity-50 backdrop-blur-lg border border-gray-200/10 rounded-lg shadow-lg p-4 fixed top-0 left-0 right-0 z-50"
      style={{ background: "rgba(255, 255, 255, 0.1)" }}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-extrabold tracking-tight text-white"
        >
          <Link to="/" className="hover:text-red-400 transition-all">
            Luminal<span className="text-red-500">Records</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          {navItems.map(({ icon: Icon, label, path }) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={path}
                className="flex items-center space-x-2 text-white hover:text-red-400 transition-colors text-lg font-medium"
              >
                <Icon className="text-xl" />
                <span>{label}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-red-400 text-2xl focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu Options */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 flex flex-col items-center space-y-4 md:hidden"
        >
          {navItems.map(({ icon: Icon, label, path }) => (
            <Link
              key={label}
              to={path}
              onClick={() => setIsMenuOpen(false)} // Close menu after clicking a link
              className="flex items-center space-x-2 text-white hover:text-red-400 transition-colors text-lg font-medium"
            >
              <Icon className="text-xl" />
              <span>{label}</span>
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
