import React from 'react';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
         
          <a href="/">🦉 Mi Cuenta Cuentos</a>
        </div>
        <div className="nav-links">
          <a href="#" className="nav-link">Inicio</a>
          <a href="#" className="nav-link">Cómo Funciona</a>
          <a href="#" className="nav-link">Ejemplos</a>
          <a href="#" className="nav-link">FAQ</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;