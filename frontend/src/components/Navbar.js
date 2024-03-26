import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../assets/css/navbar.css'
import { Dropdown, initMDB } from 'mdb-ui-kit';
import { Helmet } from 'react-helmet';
import Modal_login from '../Modal_login';
import Login from './Login';
import UserSignup from '../screens/UserSignup';
import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, useDisclosure, useToast } from '@chakra-ui/react';

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef()

  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });

    const json = await response.json()

    if (!json.success) {
      console.log(json);
      // alert("Enter Valid credentials")
      onOpen()
    }
    else {
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("username", json.username);
      localStorage.setItem("userid", json.userid);
      localStorage.setItem("role", json.role)
      toast({
        title: 'SuccessFully Logged in',
        // description: 'This is a notification using Chakra-UI.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position : 'top-right',
    })
      setIsLogin(false);
      navigate('/')
    }
  }

  const onChange = (event) => {
    setCredentials((prevState) => { return { ...prevState, [event.target.name]: event.target.value } });
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate('/');
  }

  const handleClose = () => {
    onClose(); // Close the alert dialog
    setCredentials({ email: "", password: "" });
  }

  useEffect(() => {
    initMDB({ Dropdown });
  }, []);

  const handleLogin = () => {
    setIsLogin(!isLogin)
  }

  const handleSignupClick = () => {
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true)
  }

  const [credentialsSignup, setCredentialsSignup] = useState({ user_name: "", email: "", password: "", user_type: "" })

  const { isOpen: isOpenValidCredentials, onOpen: onOpenValidCredentials, onClose: onCloseValidCredentials} = useDisclosure();
  const { isOpen: isOpenEmail, onOpen: onOpenEmail, onClose: onCloseEmail} = useDisclosure();

  const handleCloseValidCredentials = () => {
    onCloseValidCredentials();
    setCredentialsSignup({ ...credentialsSignup, user_name: "", email: "",  password: "", user_type: "" }); 
  }

  const handleCloseEmail = () => {
    onCloseEmail();
    setCredentialsSignup({ ...credentialsSignup, email: "" }); 
  }

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_name: credentialsSignup.user_name,
        email: credentialsSignup.email,
        password: credentialsSignup.password,
        user_type: credentialsSignup.user_type
      })
    });

    const json = await response.json()

    if (json === "Email Already Registered") {
      // alert("Email already registered")
      onOpenEmail();
    }
    else if (!json.success) {
      // console.log(json);
      // alert("Enter valid credentials")
      onOpenValidCredentials();
    }
    else {
      setShowSignup(false);
      setShowLogin(true);
    }
  }

  const onChangeSignup = (event) => {
    setCredentialsSignup({ ...credentialsSignup, [event.target.name]: event.target.value })
  }

  const role = localStorage.getItem("role");

  return (
    <nav className="navbar navbar-expand-lg">
      <Helmet>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      </Helmet>
      {isLogin ? (
        <Modal_login onClose={handleLogin}>
          {showLogin ? (
            <Login
              handleSubmit={handleSubmit}
              credentials={credentials}
              onChange={onChange}
              onSignupClick={handleSignupClick}
            />
          ) : (
            <UserSignup
              handleSubmit={handleSubmitSignup}
              credentials={credentialsSignup}
              onChange={onChangeSignup}
              onLoginClick={handleLoginClick}
            />
          )}

        </Modal_login>
      ) : (
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
                {role === "Farmer" &&
                  <li className="nav-item">
                    <Link className="nav-link mx-lg-2" to='/img'>ImageUpload</Link>
                  </li>
                }
                {role === "Farmer" &&
                  <li className="nav-item">
                    <Link className="nav-link mx-lg-2" to='/complaint'>Complaint</Link>
                  </li>
                }
                {role === "Expert" &&
                  <li className="nav-item">
                    <Link className="nav-link mx-lg-2" to='/viewcomplaint'>View Complaints</Link>
                  </li>
                }
              </ul>
            </div>
          </div>
          {!localStorage.getItem("authToken") ? (
            <button className='login-button' onClick={handleLogin}>Login</button>
          ) : (
            <ul className="navbar-nav d-flex flex-row">
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
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/" onClick={handleLogout}>Logout</a>
                  </li>
                </ul>
              </li>
            </ul>
          )}
          <button className="navbar-toggler pe-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      )}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Error</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Invalid credentials. Please try again.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="green" onClick={handleClose}>OK</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        isOpen={isOpenValidCredentials}
        leastDestructiveRef={cancelRef}
        onClose={onCloseValidCredentials}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Error</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Please enter valid credentials.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="green" onClick={handleCloseValidCredentials}>OK</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        isOpen={isOpenEmail}
        leastDestructiveRef={cancelRef}
        onClose={onCloseEmail}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Error</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Email is already registered. Please use different email.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="green" onClick={handleCloseEmail}>OK</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </nav>
  );
};

export default Navbar;
