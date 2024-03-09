import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../assets/css/navbar.css'
import { Dropdown, initMDB } from 'mdb-ui-kit';
import { Helmet } from 'react-helmet';
// import {loadGoogleTranslate} from '../Modal_lang.js'

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate('/');
  }

  useEffect(() => {
    // Initialization code inside the useEffect hook
    initMDB({ Dropdown });
    // loadGoogleTranslate();
  }, []);

  const handleLogin = () => {
    navigate('/login')
  }

  const role = localStorage.getItem("role");

  return (
    <nav className="navbar navbar-expand-lg">
      <Helmet>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      </Helmet>
      <div className="container-fluid">
        <Link className="navbar-brand me-auto" to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <img src={logo} alt="Logo" className="logo" />
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link mx-lg-2" aria-current="page" to='/'>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-lg-2" to='/question'>Question</Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link mx-lg-2" to='/'>Contact</Link>
              </li> */}
              {role == "Farmer" &&
                <li className="nav-item">
                  <Link className="nav-link mx-lg-2" to='/img'>ImageUpload</Link>
                </li>
              }
              {role == "Farmer" && 
                <li className="nav-item">
                  <Link className="nav-link mx-lg-2" to='/complaint'>Complaint</Link>
                </li>
              }
              {role == "Expert" && 
                <li className="nav-item">
                  <Link className="nav-link mx-lg-2" to='/viewcomplaint'>View Complaints</Link>
                </li>
              }
            </ul>
          </div>
        </div>
        {/* <div id="google_element"></div> */}
        {!localStorage.getItem("authToken") ? (
          <button className='login-button' onClick={handleLogin}>Login</button>
        ) : (
          // <div className="d-flex align-items-center">
          //   <Link className="nav-link mx-lg-2" to="/profile">👋 {localStorage.getItem("username")}</Link>
          //   <button className='logout-button' onClick={handleLogout}>Logout</button>
          // </div>
          <ul class="navbar-nav d-flex flex-row">
            <li className="nav-item me-3 me-lg-0 dropdown">
              <a
                data-mdb-dropdown-init
                className="nav-link dropdown-toggle"
                href="/"
                id="navbarDropdown"
                role="button"
                aria-expanded="false"
              >
                <i className="fa fa-user"></i>&nbsp;
                {localStorage.getItem("username")}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="/profile">Profile</a>
                </li>
                {/* <li>
                  <a className="dropdown-item" href="#">Another action</a>
                </li> */}
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <a className="dropdown-item" href="/" onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </li>
            {/* <button className='logout-button' style={{ marginRight: '10px' }} onClick={handleLogout}>Logout</button> */}
          </ul>
        )}

        <button className="navbar-toggler pe-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;