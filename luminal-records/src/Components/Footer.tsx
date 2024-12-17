import { FaSpotify, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p>&copy; 2024 Luminal Records. A Sony Music & District Label</p>
        </div>

        <div className="flex space-x-6">
          {[
            { icon: FaSpotify, link: "#" },
            { icon: FaInstagram, link: "#" },
            { icon: FaTwitter, link: "#" },
            { icon: FaYoutube, link: "#" },
          ].map(({ icon: Icon, link }) => (
            <motion.a
              key={link}
              href={link}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="text-2xl"
            >
              <Icon />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
