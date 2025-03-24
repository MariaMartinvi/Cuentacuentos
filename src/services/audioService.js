export const generateAudio = async (audioParams) => {
  try {
    const response = await fetch('/.netlify/functions/generate-audio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(audioParams)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate audio');
    }
    
    const data = await response.json();
    
    // Convert base64 to blob and create URL
    const audioContent = data.audioContent;
    const byteCharacters = atob(audioContent);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'audio/mp3' });
    const audioUrl = URL.createObjectURL(blob);
    
    return {
      audioUrl,
      parameters: data.parameters
    };
  } catch (error) {
    console.error('Error generating audio:', error);
    throw error;
  }
};