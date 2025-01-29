import { motion } from "framer-motion";
import { FaInstagram, FaSpotify, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

// Footer.tsx
export const Footer = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-lg border-t border-white/10">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Luminal Records</h3>
            <p className="text-gray-400">
              A Sony Music & District Label pushing the boundaries of sound and
              creativity
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to="/artists"
                  className="hover:text-red-400 transition-colors"
                >
                  Our Artists
                </Link>
              </li>
              <li>
                <Link
                  to="/releases"
                  className="hover:text-red-400 transition-colors"
                >
                  Latest Releases
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-red-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-400 transition-colors">
                  Licensing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              {[FaSpotify, FaInstagram, FaTwitter, FaYoutube].map(
                (Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-2xl hover:text-red-400 transition-colors"
                  >
                    <Icon />
                  </motion.a>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Luminal Records. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
