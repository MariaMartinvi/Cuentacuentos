// src/services/storyService.js in your React app
export const generateStory = async (storyParams) => {
  try {
    const response = await fetch('http://localhost:5000/api/stories/generate', {
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