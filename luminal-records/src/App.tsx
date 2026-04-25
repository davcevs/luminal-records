// App.tsx
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainComponent from "./Components/MainComponent";
import Navbar from "./Components/Navbar";
import ArtistsPage from "./Components/ArtistsPage";
import ReleasesPage from "./Components/ReleasesPage";
import ContactPage from "./Components/ContactPage";
import DemoSubmitPage from "./Components/DemoSubmitPage";
import AdminPanel from "./Components/AdminPanel";
import { Footer } from "./Components/Footer";
import MusicPlayer from "./Components/MusicPlayer";
// import { useState } from "react";
import { PlayerProvider } from "./Components/PlayerContext";

const App = () => {
  const location = useLocation();
  // const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <PlayerProvider>
      <div className="flex flex-col min-h-screen bg-[#080808] text-white">
        <Navbar />
        <main className="flex-grow pt-20">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<MainComponent />} />
              <Route path="/artists" element={<ArtistsPage />} />
              <Route path="/releases" element={<ReleasesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/demo" element={<DemoSubmitPage />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <MusicPlayer />
      </div>
    </PlayerProvider>
  );
};

export default App;
