import React from "react";
import Navbar from "../Navbar.js";
import ProfileSidebar from "./ProfileSidebar.js";
import { useLoaderData } from "react-router-dom";
import MyAnswerItem from './MyAnswerItem.js'
import '../../assets/css/profile.css'

const MyAnswers = () => {

    const questions = useLoaderData();

    return (
        <>
            <Navbar />
            {/* <div className='profile-container' style={{ marginTop:'0vh', zIndex: 1, backgroundColor: 'white' }}>
                <ProfileSidebar />
                <div className="header_and_content" Style="width:100%;">
                    {questions && questions.length > 0 && <><h2>Your Answers</h2>
                    <br></br>
                    <ul>
                        {questions.map((question) => (<MyAnswerItem question={question} key={question.question_id}/>))}
                    </ul>
                    </>
                    }
                    {questions && questions.length == 0 && <h3>No Answer Uploaded</h3>}
                </div>
            </div> */}
            <div className="d-flex" style={{ marginTop: '0vh' }}>
                <ProfileSidebar />
                <div style={{ width: '100%', marginTop: '25px', backgroundColor: 'white' }}>
                    {questions && questions.length > 0 ? (
                        <>
                            <h3 style={{ color: 'grey', fontWeight: '500', textAlign: 'center', paddingTop: '30px', paddingBottom: '10px' }}>Your Answers</h3>
                            <div className='mygrid'>
                                {questions.map((question) => (
                                    <MyAnswerItem question={question} key={question.question_id} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <h3>No Answer Uploaded</h3>
                    )}
                </div>
            </div>
        </>
    )
}

const fetchmyanswers = async () => {
    const id = localStorage.getItem("userid");
    const response = await fetch('/api/profile/myanswers?user_id=' + id);
    // console.log("Hi");
    // console.log(response);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // console.log(data);
    return data;
}

export {
    MyAnswers,
    fetchmyanswers
}