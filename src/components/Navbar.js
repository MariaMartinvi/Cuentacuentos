import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">🦉 Mi Cuenta Cuentos</Link>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Servicios</Link>
          <Link to="/contact">Contacto</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;