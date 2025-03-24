// netlify/functions/generate-story.js
const axios = require('axios');

exports.handler = async function(event, context) {
  // Allow only POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }
  
  try {
    // Parse the request body
    const storyParams = JSON.parse(event.body);
    
    // Get the OpenAI API key from environment variables
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    
    if (!OPENAI_API_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API key is not configured' })
      };
    }
    
    // Validate required parameters
    if (!storyParams.topic) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Topic is required' })
      };
    }
    
    // Construct the prompt based on parameters
    const prompt = constructPrompt(storyParams);
    
    // Call OpenAI API
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
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
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Extract the story content from the response
    const storyContent = response.data.choices[0].message.content.trim();
    
    // Extract or generate a title
    const title = extractTitle(storyContent, storyParams.topic);
    
    // Return the story data
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        content: storyContent,
        parameters: storyParams,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    
    let errorMessage = 'Failed to generate story';
    let statusCode = 500;
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      errorMessage = 'Invalid API key';
    } else if (error.response?.status === 429) {
      errorMessage = 'Rate limit exceeded';
      statusCode = 429;
    } else if (error.response?.data?.error) {
      errorMessage = error.response.data.error.message || errorMessage;
    }
    
    return {
      statusCode,
      body: JSON.stringify({ error: errorMessage })
    };
  }
};

// Helper functions
function constructPrompt(params) {
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
}

function getMaxTokens(length) {
  switch (length) {
    case 'corto': return 400;
    case 'medio': return 800;
    case 'largo': return 1600;
    default: return 800;
  }
}

function getTemperature(creativityLevel) {
  switch (creativityLevel) {
    case 'conservador': return 0.5;
    case 'innovador': return 0.7;
    case 'imaginativo': return 0.8;
    case 'visionario': return 0.9;
    case 'inspirado': return 1.0;
    default: return 0.7;
  }
}

function extractTitle(content, fallbackTopic) {
  // Try to extract title from the first line if it looks like a title
  const lines = content.split('\n');
  const firstLine = lines[0].trim();
  
  // If first line is short enough and doesn't end with punctuation, use as title
  if (firstLine.length < 60 && !firstLine.match(/[.,:;?!]$/)) {
    return firstLine;
  }
  
  // Otherwise generate a title based on the topic
  return `Historia de ${fallbackTopic}`;
}