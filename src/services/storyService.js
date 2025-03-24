// src/services/storyService.js
export const generateStory = async (storyParams) => {
    const API_KEY = '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'; // Replace with your real API key
    
    try {
      // Construct the prompt based on user parameters
      const prompt = constructPrompt(storyParams);
      
      // Call OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'Eres un creativo escritor de cuentos en español. Crea historias originales, coherentes y cautivadoras.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: getMaxTokens(storyParams.length),
          temperature: getTemperature(storyParams.creativityLevel)
        })
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Error al generar la historia');
      }
      
      const storyContent = data.choices[0].message.content.trim();
      
      // Extract a title from the first line, or generate one
      const title = extractTitle(storyContent, storyParams.topic);
      
      return {
        title,
        content: storyContent,
        parameters: storyParams
      };
    } catch (error) {
      console.error('Error generating story:', error);
      throw error;
    }
  };
  
  // Helper function to create the prompt based on story parameters
  const constructPrompt = (params) => {
    const { topic, length, storyType, creativityLevel, ageGroup } = params;
    
    let lengthDescription;
    switch (length) {
      case 'corto': lengthDescription = 'corta (aproximadamente 250 palabras)'; break;
      case 'medio': lengthDescription = 'de longitud media (aproximadamente 500 palabras)'; break;
      case 'largo': lengthDescription = 'larga (aproximadamente 1000 palabras)'; break;
      default: lengthDescription = 'de longitud media'; break;
    }
    
    let ageDescription;
    switch (ageGroup) {
      case '3-6': ageDescription = 'niños de 3 a 6 años'; break;
      case '7-13': ageDescription = 'niños de 7 a 13 años'; break;
      case '13-20': ageDescription = 'adolescentes de 13 a 20 años'; break;
      case '21-35': ageDescription = 'adultos jóvenes'; break;
      case '35+': ageDescription = 'adultos'; break;
      default: ageDescription = 'todo público'; break;
    }
    
    return `Escribe una historia ${lengthDescription} de género ${storyType} sobre "${topic}". 
  La historia debe ser apropiada para ${ageDescription}.
  Usa un estilo narrativo atractivo, con personajes interesantes y un desarrollo coherente de la trama.
  Incluye diálogos y descripciones donde sea apropiado.
  La historia debe tener un inicio, desarrollo y conclusión claros.`;
  };
  
  // Helper function to determine max tokens based on requested length
  const getMaxTokens = (length) => {
    switch (length) {
      case 'corto': return 400;
      case 'medio': return 800;
      case 'largo': return 1600;
      default: return 800;
    }
  };
  
  // Helper function to determine temperature based on creativity level
  const getTemperature = (creativityLevel) => {
    switch (creativityLevel) {
      case 'conservador': return 0.5;
      case 'innovador': return 0.7;
      case 'imaginativo': return 0.8;
      case 'visionario': return 0.9;
      case 'inspirado': return 1.0;
      default: return 0.7;
    }
  };
  
  // Helper function to extract or generate a title
  const extractTitle = (content, fallbackTopic) => {
    // Try to extract title from the first line if it looks like a title
    const lines = content.split('\n');
    const firstLine = lines[0].trim();
    
    // If first line is short enough and doesn't end with punctuation, use as title
    if (firstLine.length < 60 && !firstLine.match(/[.,:;?!]$/)) {
      return firstLine;
    }
    
    // Otherwise generate a title based on the topic
    return `Historia de ${fallbackTopic}`;
  };