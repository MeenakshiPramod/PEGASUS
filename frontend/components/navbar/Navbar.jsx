import React from 'react';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoePrints } from '@fortawesome/free-solid-svg-icons';


function Navbar() {
  return (
    <>
      <nav className="navbar">
        <a href="/" className="brand">CodeSteps <FontAwesomeIcon icon={faShoePrints} size="1px" color="#bb86fc" />
        </a>  {/* Use a tag with href */}
     
        <button className="login">Login</button>
      </nav>
    </>
  );
}

export default Navbar;
