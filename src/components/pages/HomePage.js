import React, { useState } from 'react';
import StoryForm from '../StoryForm';
import StoryDisplay from '../StoryDisplay';
import '../../styles/global.css';
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8916688102365664"
     crossorigin="anonymous"></script>
function HomePage() {
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
      <div className="hero-section">
        <div className="hero-container">
          <h1>Niñoooos....¡a dormir!</h1>
          <p>
            Crea audiocuentos personalizados con solo un clic y dale al play. Personaliza el cuento con sus historias, sus amigos, el cole, ... y ¡a dormir!
          </p>
        </div>
      </div>

      <main className="container">
        <StoryForm onStoryGenerated={handleStoryGenerated} />

        {generatedStory && <StoryDisplay story={generatedStory} />}

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
    </div>
  );
}

export default HomePage;
