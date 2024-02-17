import React from 'react';
import ProfileSidebar from '../components/Profiles/ProfileSidebar';
import ProfileHeader from '../components/Profiles/ProfileHeader';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import img from '../assets/images/slider/jacques-barbary-4421377.jpg'

const Profile = () => {

    const blockquoteCustom = {
        position: 'relative',
        fontSize: '1.1rem'
    }

    const blockquoteCustomIcon = {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '-25px',
        left: '50px'
    }

    const info = useLoaderData();

    useEffect(() => {
        // Prevent scrolling when the component mounts
        document.body.style.overflow = 'hidden';

        // Re-enable scrolling when the component unmounts
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, []);

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    return (
        <>
            <Navbar />
            <Helmet>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
            </Helmet>
            <div className='profile-container' style={{ marginTop: '0vh', zIndex: 1, backgroundColor: 'white', display: 'flex' }}>
                <ProfileSidebar />
                <section className="py-5 d-flex justify-content-center align-items-center" style={{ flex: '1' }}>
                    <div className="col-lg-6">
                    <div style={{ position: 'relative', height: '25vh', overflow: 'hidden'}}>
                                <img src={img} alt="Profile Image" style={{ width: '100%' }} />
                            </div>
                        {/* CUSTOM BLOCKQUOTE */}
                        <blockquote className="blockquote blockquote-custom bg-white p-5 shadow rounded" style={blockquoteCustom}>
                            <div className="blockquote-custom-icon bg-secondary shadow-sm" style={blockquoteCustomIcon}><i className="fa fa-address-card-o text-white"></i></div>
                            <p className="mb-0 mt-2" style={{ fontSize: '1.1rem' }}><b>Email ID:</b> {info[0]?.email}</p>
                            <p className="mb-0 mt-2" style={{ fontSize: '1.1rem' }}><b>Rating:</b> {info[0]?.rating}</p>
                            <footer className="blockquote-footer pt-4 mt-4 border-top">Joined At : 
                                <cite title="Source Title"> {formatDate(info[0]?.createdAt)}</cite>
                            </footer>
                        </blockquote>{/* END */}
                    </div>
                </section>
            </div>
        </>

    )
}

const fetchpersonalinfo = async () => {
    const id = localStorage.getItem("userid");
    const response = await fetch('/api/profile/info?user_id=' + id);
    // console.log("Hi");
    console.log(response);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return data;
}

export {
    Profile,
    fetchpersonalinfo
}
