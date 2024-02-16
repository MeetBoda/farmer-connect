import React from 'react';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import FreqAskQue from '../components/FreqAskQue';
import Footer from '../components/Footer';
import Map from '../components/Map';
import {image1, image2, image3} from '../assets/images/index'

export default function Home(){
    const slides = [
        {
            "image" : image1,
            "title" : "First Slide",
            "subtitle" : "First Slide subtitle",
            "interval": 1500
        },
        {
            "image" : image2,
            "title" : "Second Slide",
            "subtitle" : "Second Slide subtitle",
            "interval": 1500
        },
        {
            "image" : image3,
            "title" : "Third Slide",
            "subtitle" : "Third Slide subtitle",
            "interval": 1500
        }
    ]
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