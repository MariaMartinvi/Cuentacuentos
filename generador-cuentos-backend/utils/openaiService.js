// utils/openaiService.js
const axios = require('axios');

exports.generateCompletion = async (prompt, storyParams) => {
  try {
    const maxTokens = getMaxTokens(storyParams.length);
    const temperature = getTemperature(storyParams.creativityLevel);
    
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
      max_tokens: maxTokens,
      temperature: temperature,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0.6
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API Error:', error.response?.data || error.message);
    
    // Enhanced error handling
    if (error.response?.status === 429) {
      throw new Error('OpenAI rate limit exceeded. Please try again later.');
    } else if (error.response?.status === 401) {
      throw new Error('Authentication error with OpenAI API. Check your API key.');
    } else {
      throw new Error('Failed to generate story with OpenAI: ' + (error.response?.data?.error?.message || error.message));
    }
  }
};

// Helper functions to determine parameters based on user selections
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