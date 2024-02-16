import React from "react";
import Navbar from "../Navbar";
import ProfileSidebar from "../Profiles/ProfileSidebar";
import { useLoaderData } from "react-router-dom";
import MyQuestionItem from "./MyQuestionItem";
import '../../assets/css/profile.css'

const MyQuestions = () => {

    const questions = useLoaderData();

    return (
        <>
            <Navbar />
            <div className="d-flex" style={{ marginTop: '0vh' }}>
                <ProfileSidebar />
                <div style={{ width: '100%', marginTop: '25px', backgroundColor: 'white' }}>
                    {questions && questions.length > 0 ? (
                        <>
                            <h3 style={{ color : 'grey', fontWeight: '500', textAlign : 'center', paddingTop :'30px', paddingBottom : '10px'}}>Your Questions</h3>
                            <div className= 'mygrid'>
                                {questions.map((question) => (
                                    <MyQuestionItem key={question.question_id} question={question} />
                                ))}
                                </div>
                        </>
                    ) : (
                        <h3>No Questions have been asked</h3>
                    )}
                </div>
            </div>
        </>
    )
}

const fetchmyquestions = async () => {
    const id = localStorage.getItem("userid");
    const response = await fetch('/api/profile/myques?user_id=' + id);
    console.log("Hi");
    console.log(response);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return data;
}

export {
    MyQuestions,
    fetchmyquestions
}