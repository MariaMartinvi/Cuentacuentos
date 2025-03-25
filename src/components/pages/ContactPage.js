import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../../styles/contact.css';
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8916688102365664"
     crossorigin="anonymous"></script>
function ContactPage() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_xcq64id', // Reemplaza con tu Service ID
        'template_9ib4dun', // Reemplaza con tu Template ID
        form.current,
        'PmEP-vrauOJhVTHt0' // Reemplaza con tu Public Key
      )
      .then(
        (result) => {
          console.log(result.text);
          alert('¡Mensaje enviado con éxito!');
        },
        (error) => {
          console.log(error.text);
          alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
        }
      );

    e.target.reset(); // Limpia el formulario después de enviarlo
  };

  return (
    <div className="contact-page">
      <h1>Contacto</h1>
      <p>¡Nos encantaría saber de ti! Por favor, completa el formulario a continuación:</p>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="user_name" placeholder="Tu nombre" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" id="email" name="user_email" placeholder="Tu correo electrónico" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje:</label>
          <textarea id="message" name="message" placeholder="Tu mensaje" rows="5" required></textarea>
        </div>
        <button type="submit" className="submit-btn">Enviar</button>
      </form>
    </div>
  );
}

export default ContactPage;