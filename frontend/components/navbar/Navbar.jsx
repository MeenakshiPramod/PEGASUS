import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './navbar.css';

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="brand">MyBrand</Link>
        
     {/* <ul className="nav-links">
          <li><Link to="/home">Home</Link></li> 
          <li><Link to="/about">About</Link></li> 
          <li><Link to="/services">Services</Link></li> 
          <li><Link to="/contact">Contact</Link></li> 
        </ul> */}
        

        <button classNmae="login">login</button>
      </nav>
    </>
  );
}

export default Navbar;
