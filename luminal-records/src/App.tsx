import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainComponent from "./Components/MainComponent";
import Navbar from "./Components/Navbar";
import ArtistsPage from "./Components/ArtistsPage";
import ReleasesPage from "./Components/ReleasesPage";
import ContactPage from "./Components/ContactPage";
import { Footer } from "./Components/Footer";
import { useState, useEffect } from "react";

const App = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<MainComponent />} />
            <Route path="/artists" element={<ArtistsPage />} />
            <Route path="/releases" element={<ReleasesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      {/* Sticky Music Player */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="/path/to/track-cover.jpg"
              alt="Track Cover"
              className="w-12 h-12 rounded"
            />
            <div>
              <p className="text-white font-medium">Track Name</p>
              <p className="text-gray-400 text-sm">Artist Name</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-red-500">
              Play/Pause
            </button>
            <input type="range" min="0" max="100" className="w-32" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
