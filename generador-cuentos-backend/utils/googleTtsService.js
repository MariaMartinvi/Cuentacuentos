const axios = require('axios');


// Helper function to map our voice IDs to Google's voice names

function getGoogleVoiceName(voiceId) {
  switch (voiceId) {
    case 'female':
      return 'es-ES-Standard-A';
    case 'male':
      return 'es-ES-Standard-B';
    case 'female-latam':
      return 'es-US-Standard-A';
    case 'female-english':
      return 'en-US-Standard-A';
    case 'male-english':
      return 'en-US-Standard-B';
    case 'male-latam':
      return 'es-US-Standard-B';
    default:
      return 'es-ES-Standard-A';
  }
}

exports.synthesizeSpeech = async (text, voiceId, speechRate) => {
  try {
    // Añadir logs detallados
    console.log("=============== DEBUG INFO ===============");
    console.log("Texto recibido:", text.substring(0, 30) + "...");
    console.log("Voz seleccionada:", voiceId);
    console.log("API Key configurada:", process.env.GOOGLE_TTS_API_KEY ? "Sí (longitud: " + process.env.GOOGLE_TTS_API_KEY.length + ")" : "No");
    console.log("==========================================");
    // Map our voice IDs to Google's voice names
    const voiceName = getGoogleVoiceName(voiceId);
    const languageCode = voiceId.includes('latam') ? 'es-419' : 'es-ES';
    
   
    
    const response = await axios.post(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        input: { text },
        voice: {
          languageCode,
          name: voiceName,
          ssmlGender: voiceId.startsWith('male') ? 'MALE' : 'FEMALE'
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: speechRate,
          pitch: 0.0,
          volumeGainDb: 0.0
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data.audioContent; // Base64 encoded audio
  } catch (error) {
    console.error('Google TTS API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 403) {
      throw new Error('Authentication error with Google TTS API. Check your API key.');
    } else {
      throw new Error('Failed to generate audio: ' + (error.response?.data?.error?.message || error.message));
    }
  }
};
