import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import MainComponent from "./Components/MainComponent";
import Navbar from "./Components/Navbar";
import ArtistsPage from "./Components/ArtistsPage";
import ReleasesPage from "./Components/ReleasesPage";
import ContactPage from "./Components/ContactPage";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/releases" element={<ReleasesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
