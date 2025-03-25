import React, { useState } from 'react';
import { generateStory } from '../services/storyService';

function StoryForm({ onStoryGenerated }) {
  const [topic, setTopic] = useState('');
  const [storyLength, setStoryLength] = useState('medio');
  const [storyType, setStoryType] = useState('original');
  const [creativityLevel, setCreativityLevel] = useState('innovador');
  const [ageGroup, setAgeGroup] = useState('predeterminado');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      alert('Por favor, introduce un tema para la historia');
      return;
    }

    setIsLoading(true);

    try {
      const generatedStory = await generateStory({
        topic,
        length: storyLength,
        storyType,
        creativityLevel,
        ageGroup,
      });

      onStoryGenerated(generatedStory);
    } catch (error) {
      console.error('Error generating story:', error);
      alert('Hubo un error al generar la historia. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTopic('');
    setStoryLength('medio');
    setStoryType('original');
    setCreativityLevel('innovador');
    setAgeGroup('predeterminado');
    onStoryGenerated(null);
  };

  return (
    <div className="story-form-container">
      <h2>
        <span className="icon-title">🦉</span>
        Mi Cuenta Cuentos
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="topic">
            <span className="form-icon">📝</span> Introduce un tema
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ej: Un viaje a la luna, Aventuras en el bosque..."
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="storyLength">
              <span className="form-icon">📏</span> Duración de la historia
            </label>
            <select
              id="storyLength"
              value={storyLength}
              onChange={(e) => setStoryLength(e.target.value)}
            >
              <option value="corto">Corto</option>
              <option value="medio">Medio</option>
              <option value="largo">Largo</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="storyType">
              <span className="form-icon">📚</span> Tipo de historia
            </label>
            <select
              id="storyType"
              value={storyType}
              onChange={(e) => setStoryType(e.target.value)}
            >
              <option value="original">Original</option>
              <option value="clasico">Clásico</option>
              <option value="humor">Humor</option>
              <option value="ciencia-ficcion">Ciencia Ficción</option>
              <option value="terror">Terror</option>
              <option value="aventura">Aventura</option>
              <option value="fantasia">Fantasía</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="creativityLevel">
              <span className="form-icon">💡</span> Nivel de creatividad
            </label>
            <select
              id="creativityLevel"
              value={creativityLevel}
              onChange={(e) => setCreativityLevel(e.target.value)}
            >
              <option value="innovador">Innovador</option>
              <option value="imaginativo">Imaginativo</option>
              <option value="visionario">Visionario</option>
              <option value="conservador">Conservador</option>
              <option value="inspirado">Inspirado</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ageGroup">
              <span className="form-icon">👥</span> Grupo de edad
            </label>
            <select
              id="ageGroup"
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
            >
              <option value="predeterminado">Predeterminado</option>
              <option value="3-6">3-6 años</option>
              <option value="7-13">7-13 años</option>
              <option value="13-20">13-20 años</option>
              <option value="21-35">21-35 años</option>
              <option value="35+">35+ años</option>
            </select>
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="generate-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner"></span> Generando...
              </>
            ) : (
              <>
                <span className="btn-icon">✨</span> Generar Historia
              </>
            )}
          </button>
          <button type="button" className="reset-btn" onClick={handleReset}>
            Empezar de nuevo
          </button>
        </div>
      </form>
    </div>
  );
}

export default StoryForm;