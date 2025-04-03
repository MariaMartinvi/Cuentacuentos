import i18n from 'i18next'; // Importar i18n para usar traducciones globales

// Determinar la URL correcta basada en el entorno
const isProduction = window.location.hostname !== 'localhost';
const functionUrl = isProduction 
  ? '/.netlify/functions/generate-story'  // URL para producción en Netlify
  : 'http://localhost:5000/api/stories/generate';  // URL para desarrollo local

export const generateStory = async (storyParams) => {
  try {
    console.log('Iniciando generación de historia con params:', storyParams);
    console.log('Llamando a función en:', functionUrl);


    // Intentar la llamada a la función
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(storyParams),
    });

    // Mostrar información sobre la respuesta
    console.log('Respuesta recibida, status:', response.status);
    console.log('Headers:', [...response.headers.entries()]);

    // Obtener el texto completo de la respuesta
    const responseText = await response.text();
    console.log('Respuesta completa (texto):', responseText);

    // Intentar parsear la respuesta como JSON
    let responseData;
    try {
      responseData = JSON.parse(responseText);
      console.log('Respuesta parseada:', responseData);
    } catch (e) {
      console.error('No se pudo parsear la respuesta como JSON:', e);
      throw new Error(i18n.t('storyService.invalidResponse')); // Traducción
    }

    // Verificar si la respuesta contiene un error
    if (!response.ok) {
      console.error('La respuesta no fue exitosa:', responseData);
      throw new Error(
        responseData?.error || i18n.t('storyService.errorGeneratingStory') // Traducción
      );
    }

    // Si todo está bien, devolver los datos
    return responseData;
  } catch (error) {
    console.error('Error completo en generateStory:', error);

    // Mostrar toda la información posible del error
    if (error.name) console.error('Error name:', error.name);
    if (error.message) console.error('Error message:', error.message);
    if (error.stack) console.error('Error stack:', error.stack);

    // Relanzar el error traducido
    throw new Error(
      error.message || i18n.t('storyService.unknownError') // Traducción
    );
  }
};