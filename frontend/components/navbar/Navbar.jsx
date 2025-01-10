import React from 'react';
import './navbar.css';

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <a href="/" className="brand">MyBrand</a>  {/* Use a tag with href */}

        <ul className="nav-links">
          <li><a href="#home">Home</a></li> 
          <li><a href="#about">About</a></li> 
          <li><a href="#services">Services</a></li> 
          <li><a href="#contact">Contact</a></li> 
        </ul>

        <button className="login">Login</button>
      </nav>
    </>
  );
}

export default Navbar;
