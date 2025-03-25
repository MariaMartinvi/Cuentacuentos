import React from 'react';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
         
          <a href="/">🦉 Mi Cuenta Cuentos</a>
        </div>
        <div className="nav-links">
        <a href="/home">Home</a>
        <a href="/about">About</a>
        <a href="/services">Services</a>
        <a href="/contact">Contact</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;