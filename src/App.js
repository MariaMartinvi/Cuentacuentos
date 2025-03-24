import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StoryForm from './components/StoryForm';
import StoryDisplay from './components/StoryDisplay';
import './styles/global.css';

function App() {
  const [generatedStory, setGeneratedStory] = useState(null);

  const handleStoryGenerated = (story) => {
    setGeneratedStory(story);

    // Scroll to story if generated
    if (story) {
      setTimeout(() => {
        const storyDisplay = document.querySelector('.story-display');
        if (storyDisplay) {
          storyDisplay.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="app">
      <Navbar />

      <div className="hero-section">
        <div className="hero-container">
         <h1>Niñoooos....¡a dormir!</h1>
          <p> Crea audiocuentos personalizados y originales en español con solo un clic para a ir a dormir y dale al play. Personaliza el tema con sus historias del día y del cole, el tipo, longitud y edad.</p>
        </div>
      </div>

      <main className="container">
        <StoryForm onStoryGenerated={handleStoryGenerated} />

        {generatedStory && (
          <StoryDisplay story={generatedStory} />
        )}

        {!generatedStory && (
          <div className="features-preview">
            <h2>Características destacadas</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">✨</div>
                <h3>Historias Únicas</h3>
                <p>Cada historia generada es completamente única y original, adaptada a tus preferencias.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🎭</div>
                <h3>Múltiples Géneros</h3>
                <p>Elige entre diversos géneros: original, clásico, humor, ciencia ficción, terror y más.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🔊</div>
                <h3>Conversión a Audio</h3>
                <p>Escucha tus historias con nuestra función de texto a voz con voces naturales en español.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;