import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import ServicesPage from './components/pages/ServicesPage';
import ContactPage from './components/pages/ContactPage';
import InicioPage from './components/pages/InicioPage';
import ComoFuncionaPage from './components/pages/ComoFuncionaPage';
import TerminosPage from './components/pages/TerminosPage';
import PoliticaPage from './components/pages/PoliticaPage';

function App() {
  const [generatedStory, setGeneratedStory] = useState(null);

  const handleStoryGenerated = (story) => {
    setGeneratedStory(story);
    console.log('Historia generada:', story);
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage onStoryGenerated={handleStoryGenerated} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/inicio" element={<InicioPage />} />
          <Route path="/como-funciona" element={<ComoFuncionaPage />} />
          <Route path="/terminos-y-condiciones" element={<TerminosPage />} />
          <Route path="/politica-de-privacidad" element={<PoliticaPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;