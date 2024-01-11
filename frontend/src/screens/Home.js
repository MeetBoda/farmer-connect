import react from 'react';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import slides from '../assets/mock.json'
import FreqAskQue from '../components/FreqAskQue';
import UserProfile from '../components/UserProfile';

export default function Home(){
    return(
        <>
        <Navbar/>
        <Slider slides={slides}/>
        <FreqAskQue/>
            Home page
        </>
    );
}