import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React from 'react';
import Home from './screens/Home'
import UserLogin from './screens/UserLogin'
import UserSignup from './screens/UserSignup';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<UserLogin />} />
      <Route exact path="/signup" element={<UserSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
