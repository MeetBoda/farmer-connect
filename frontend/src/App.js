import './App.css';
import {
  createBrowserRouter, RouterProvider 
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
import {QuestionItem, fetchquestion} from './components/Questions/QuestionItem';

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Home />
    },
    {
      path:"/login",
      element: <UserLogin />
    },
    {
      path:"/signup",
      element: <UserSignup />
    },
    {
      path:"/profile",
      element: <Profile />
    },
    {
      path:"/img",
      element: <ImageUpload />
    },
    {
      path:"/content",
      element: <Content />
    },
    {
      path:"/giveweather",
      element:<WeatherDetail />,
    },
    // {
    //   path:"/question",
    //   element:<Question />,
    //   children : [
    //     {
    //       path:":question_id",
    //       element:<QuestionItem />,
    //       // loader: fetchquestion
    //     }
    //   ]
    // },
    {
      path:"/question",
      element:<Question />,
    },
    {
      path:"/question/:question_id",
      element:<QuestionItem />,
      loader:fetchquestion
    },
    {
      path:"/askque",
      element:<AskQue />,
    }
  ])

  return (
    // <Router>
    //   <Routes>
    //   <Route exact path="/" element={<Home />} />
    //   <Route exact path="/login" element={<UserLogin />} />
    //   <Route exact path="/signup" element={<UserSignup />} />
    //   <Route exact path='/profile' element={<Profile/>}/>
    //   <Route exact path='/img' element={<ImageUpload/>}/>
    //   <Route exact path='/content' element={<Content/>}/>
    //   <Route exact path='/giveweather' element={<WeatherDetail/>}/>
    //   <Route exact path='/question' element={<Question/>}/>
    //   <Route exact path='/askque' element={<AskQue/>}/>
    //   </Routes>
    // </Router>
    <div className="App">
    <RouterProvider router={router} />
    </div>
  );
}

export default App;