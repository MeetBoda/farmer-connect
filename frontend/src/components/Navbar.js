import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you are using React Router for navigation
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
      const navigate = useNavigate();
      const handleLogout = ()=>{
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        navigate('/');
      }
    
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
          {localStorage.getItem("authToken") && 
            <li className="nav-item">
              <Link className="nav-link text-info" style={linkStyle} activeStyle={hoverStyle} to="/profile">👋 {localStorage.getItem("username")}</Link>
            </li>
          }
          <li className="nav-item">
            {(!localStorage.getItem("authToken")) ?  
            <Link className="nav-link text-info" style={linkStyle} activeStyle={hoverStyle} to="/signup">Login/SignUp</Link> :
             <Link className="nav-link text-info" style={linkStyle} activeStyle={hoverStyle} onClick={handleLogout}>Logout</Link>
            }
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
