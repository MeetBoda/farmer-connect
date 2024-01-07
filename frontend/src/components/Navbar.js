import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation
import logo from '../assets/images/logo.png'; // Replace with your actual logo path

const Navbar = () => {

    const navbarStyle = {
        backgroundColor: '#343a40', // Background color of the navbar
        padding: '10px 20px',      // Padding around the content
      };
    
      const linkStyle = {
        color: 'white',            // Default text color
        marginRight: '15px',       // Margin to separate links
        fontSize: '15px',          // Font size of links
        textDecoration: 'none',    // Remove underline
      };
    
      const hoverStyle = {
        color: 'red',              // Color on hover
      };
    
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={navbarStyle}>
      <Link className="navbar-brand" to="/">
        <img src={logo} alt="Logo" className="img-fluid m-3" />
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link text-info" style={linkStyle}
              activeStyle={hoverStyle} to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-info" style={linkStyle}
              activeStyle={hoverStyle} to="/details">
              Details
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-info" style={linkStyle}
              activeStyle={hoverStyle} to="/contact">
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-danger" style={linkStyle}
              activeStyle={hoverStyle} to="/logout">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
