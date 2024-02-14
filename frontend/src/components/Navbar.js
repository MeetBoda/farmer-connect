import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../assets/css/navbar.css'

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    navigate('/');
  }

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
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

            </ul>
          </div>
        </div>
        {!localStorage.getItem("authToken") ? (
          <button className='login-button' onClick={handleLogin}>Login</button>
        ) : (
          <button className='logout-button' onClick={handleLogout}>Logout</button>
        )}

        <button className="navbar-toggler pe-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
