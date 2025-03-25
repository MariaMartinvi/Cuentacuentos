// src/components/pages/AboutPage.js
import React from 'react';
import '../../styles/about.css';
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8916688102365664"
     crossorigin="anonymous"></script>
function AboutPage() {
  return (
    <div className="about-page">
      <div className="page-header">
        <div className="container">
          <h1>Sobre Nosotros</h1>
          <p>Conoce más sobre nuestro proyecto y misión</p>
        </div>
      </div>
      
      <div className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-image">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZAPXyhn2F-0_r5_gYfbrOC6LGqDk7wP2qKw&s" alt="Libros y creatividad" />
            </div>
            <div className="about-text">
              <h2>Nuestra Historia</h2>
              <p>El Generador de Cuentos IA nació de la pasión por la narrativa y la tecnología. Creemos que la inteligencia artificial puede ser una poderosa herramienta para potenciar la creatividad humana, no reemplazarla.</p>
              <p>Fundado en 2023, nuestro proyecto busca democratizar la creación literaria, permitiendo que cualquier persona, independientemente de su experiencia previa, pueda generar historias cautivadoras en español.</p>
              
              <h2>Nuestra Misión</h2>
              <p>Nuestra misión es inspirar la creatividad y fomentar el amor por la narración a través de la tecnología. Queremos que nuestras herramientas ayuden a:</p>
              <ul>
                <li>Educadores que buscan material didáctico personalizado</li>
                <li>Padres que desean historias únicas para sus hijos</li>
                <li>Escritores que buscan inspiración para superar el bloqueo creativo</li>
                <li>Entusiastas de la tecnología interesados en el potencial de la IA</li>
              </ul>
              
              <h2>Tecnología</h2>
              <p>Utilizamos modelos avanzados de inteligencia artificial, específicamente diseñados para comprender y generar texto en español con matices culturales y lingüísticos apropiados. Nuestro sistema está en constante evolución para ofrecer historias cada vez más coherentes, creativas y personalizadas.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="team-section">
        <div className="container">
          <h2 className="section-title">Nuestro Equipo</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo">
                <img src="https://randomuser.me/api/portraits/women/43.jpg" alt="María López" />
              </div>
              <h3>María López</h3>
              <p className="member-role">Fundadora & CEO</p>
              <p>Apasionada por la intersección entre tecnología y creatividad.</p>
            </div>
            
            <div className="team-member">
              <div className="member-photo">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Carlos Rodríguez" />
              </div>
              <h3>Carlos Rodríguez</h3>
              <p className="member-role">CTO</p>
              <p>Experto en inteligencia artificial y procesamiento de lenguaje natural.</p>
            </div>
            
            <div className="team-member">
              <div className="member-photo">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Ana Martínez" />
              </div>
              <h3>Ana Martínez</h3>
              <p className="member-role">Directora Creativa</p>
              <p>Escritora con amplia experiencia en narrativa digital y tradicional.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;