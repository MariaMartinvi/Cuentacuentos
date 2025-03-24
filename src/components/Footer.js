import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Generador de Cuentos IA</h3>
            <p>Crea historias cautivadoras en español con inteligencia artificial. Personaliza, genera y escucha tus cuentos con nuestra herramienta gratuita.</p>
            <div className="footer-logo">
              <svg width="32" height="32" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="80" height="80" rx="16" fill="#4361ee"/>
                <path d="M20 25H60M20 40H60M20 55H40" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="50" cy="55" r="5" fill="white"/>
              </svg>
            </div>
          </div>

          <div className="footer-section">
            <h3>Enlaces Rápidos</h3>
            <ul className="footer-links">
              <li><a href="#">Inicio</a></li>
              <li><a href="#">Cómo Funciona</a></li>
              <li><a href="#">Ejemplos</a></li>
              <li><a href="#">Preguntas Frecuentes</a></li>
              <li><a href="#">Términos y Condiciones</a></li>
              <li><a href="#">Política de Privacidad</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Herramientas Relacionadas</h3>
            <ul className="footer-links">
              <li><a href="#">Resumidor de Textos</a></li>
              <li><a href="#">Parafrasear Textos</a></li>
              <li><a href="#">Generador de Ensayos</a></li>
              <li><a href="#">Generador de Frases</a></li>
              <li><a href="#">Creador de Poemas</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Generador de Cuentos IA. Todos los derechos reservados.</p>
          <div className="made-with">
            Hecho con <span className="heart">❤️</span> en España
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;