import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import logo from '../assets/images/logo.png'; 
import '../assets/css/navbar.css'

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
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    navigate('/');
  }

  return (
    // <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={navbarStyle}>
    //   <Link className="navbar-brand" to="/">
    //     <img src={logo} alt="Logo" className="img-fluid m-3" />
    //   </Link>

    //   <div className="collapse navbar-collapse">
    //     <ul className="navbar-nav ml-auto">
    //       <li className="nav-item">
    //         <Link className="nav-link text-info" style={linkStyle}
    //           activeStyle={hoverStyle} to="/">
    //           Home
    //         </Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link className="nav-link text-info" style={linkStyle}
    //           activeStyle={hoverStyle} to="/details">
    //           Details
    //         </Link>
    //       </li>
    //       <li className="nav-item">
    //         <Link className="nav-link text-info" style={linkStyle}
    //           activeStyle={hoverStyle} to="/contact">
    //           Contact
    //         </Link>
    //       </li>
    //       {localStorage.getItem("authToken") && 
    //         <li className="nav-item">
    //           <Link className="nav-link text-info" style={linkStyle} activeStyle={hoverStyle} to="/profile">👋 {localStorage.getItem("username")}</Link>
    //         </li>
    //       }
    //       <li className="nav-item">
    //         {(!localStorage.getItem("authToken")) ?  
    //         <Link className="nav-link text-info" style={linkStyle} activeStyle={hoverStyle} to="/signup">Login/SignUp</Link> :
    //          <Link className="nav-link text-info" style={linkStyle} activeStyle={hoverStyle} onClick={handleLogout}>Logout</Link>
    //         }
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand me-auto" to="/">
          <img src={logo} alt="Logo" className="img-fluid m-3" />
        </Link>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
          <img src={logo} alt="Logo" className="img-fluid m-3" />
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link mx-lg-2" aria-current="page" to='/'>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-lg-2" to='/question'>Question</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-lg-2" to='/'>Contact</Link>
              </li>
              {localStorage.getItem("authToken") &&
                <li className="nav-item">
                  <Link className="nav-link mx-lg-2" to="/profile">👋 {localStorage.getItem("username")}</Link>
                </li>}

                <li className="nav-item">
                {(!localStorage.getItem("authToken")) ?  
                <Link className="nav-link mx-lg-2" to="/signup">Login/SignUp</Link> : 
                <Link className="nav-link mx-lg-2" onClick={handleLogout}>Logout</Link> }
                </li>

              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li> */}
            </ul>
            {/* <form className="d-flex mt-3" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}
          </div>
        </div>
        <button to='/' className='login-button'>Login</button>
        <button className="navbar-toggler pe-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
