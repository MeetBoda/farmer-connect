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
import Profile from './screens/Profile';
import Content from './components/Content';
import ImageUpload from './components/ImageUpload';
import Weather from './components/Weather';
import WeatherDetail from './screens/weather/WeatherDetail';
import Question from './screens/Question';
import AskQue from './components/AskQue';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<UserLogin />} />
      <Route exact path="/signup" element={<UserSignup />} />
      <Route exact path='/profile' element={<Profile/>}/>
      <Route exact path='/img' element={<ImageUpload/>}/>
      <Route exact path='/content' element={<Content/>}/>
      <Route exact path='/giveweather' element={<WeatherDetail/>}/>
      <Route exact path='/question' element={<Question/>}/>
      <Route exact path='/askque' element={<AskQue/>}/>
      </Routes>
    </Router>
  );
}

export default App;