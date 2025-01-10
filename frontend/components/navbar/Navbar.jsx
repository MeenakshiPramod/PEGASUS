import React from 'react';
import './navbar.css';

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <a href="/" className="brand">MyBrand</a>  {/* Use a tag with href */}
        
        <button className="login">Login</button>
      </nav>
    </>
  );
}

export default Navbar;
