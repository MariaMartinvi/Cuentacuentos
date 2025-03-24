export const generateStory = async (storyParams) => {
  try {
    const response = await fetch('/.netlify/functions/generate-story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(storyParams)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate story');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error generating story:', error);
    throw error;
  }
};