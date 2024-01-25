import React from 'react';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import slides from '../assets/mock.json'
import FreqAskQue from '../components/FreqAskQue';
import Footer from '../components/Footer';
import Map from '../components/Map';

export default function Home(){
    return(
        <>
        <Navbar/>
        <Slider slides={slides}/>
        {/* <FreqAskQue/> */}
        <Map />
        <Footer/>
        </>
    );
}