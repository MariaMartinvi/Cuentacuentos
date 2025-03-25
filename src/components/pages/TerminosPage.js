import React from 'react';
import '../../styles/terminos.css';
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8916688102365664"
     crossorigin="anonymous"></script>
function TerminosPage() {
  return (
    <div className="page terminos-page">
      <h1 className="page-title">Términos y Condiciones</h1>

      <section className="section">
        <h2 className="section-title">1. Introducción</h2>
        <p>
          Bienvenido a nuestro sitio web. Al utilizar nuestros servicios, aceptas los términos y condiciones descritos en esta página. Por favor, léelos detenidamente.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">2. Uso del Servicio</h2>
        <p>
          Nuestro generador de cuentos está diseñado para uso personal y no comercial. No se permite:
        </p>
        <ul className="list">
          <li>Distribuir o vender las historias generadas sin autorización.</li>
          <li>Utilizar el servicio para actividades ilegales o inapropiadas.</li>
          <li>Intentar acceder al código fuente o sistemas internos.</li>
        </ul>
      </section>

      <section className="section">
        <h2 className="section-title">3. Propiedad Intelectual</h2>
        <p>
          Todo el contenido generado por el servicio es propiedad del usuario, pero el software y la tecnología detrás del generador son propiedad exclusiva de nuestra empresa.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">4. Limitación de Responsabilidad</h2>
        <p>
          No nos hacemos responsables de los resultados generados por el servicio ni de cómo se utilicen. El usuario asume toda la responsabilidad por el uso del contenido.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">5. Cambios en los Términos</h2>
        <p>
          Nos reservamos el derecho de modificar estos términos en cualquier momento. Las actualizaciones se publicarán en esta página y entrarán en vigor inmediatamente.
        </p>
      </section>
    </div>
  );
}

export default TerminosPage;