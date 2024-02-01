import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AskQue from '../components/AskQue';
import AllQuestions from '../components/Questions/AllQuestions';
import Footer from '../components/Footer';

export default function Question() {

    const navigate = useNavigate();

    const backgroundStyle = {
        background: 'linear-gradient(to bottom, #e3ffe7, #d9e7ff)', // Replace with your gradient colors
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
    };
    const [data, setData] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    const handleOnClick = () => {
        navigate('/askque');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/display-all-questions');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setisLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <>
                <div className="question-page">
                    <section className="question-list">
                        <h2 className="text-center mt-5">All Questions</h2>
                        <div className="text-center mt-3">
                            <p>Loading....</p>
                        </div>
                    </section>
                </div>
            </>
        );
    } else {
        return (
            <>
            <Navbar/>
            <div style={backgroundStyle}>
                <div className="" style={{ maxWidth: '900px', margin: 'auto' }}>
                    <h2 className="text-center mt-5 pt-5">All Questions</h2>
                    <div className='mt-5'>
                        {data.map(question => (
                            <AllQuestions question={question} key={question.question_id} />
                        ))}
                    </div>
                </div>
                <button
                    className="btn btn-floating"
                    style={{ 
                        position: 'fixed', 
                        bottom: '50px', 
                        right: '50px', 
                        backgroundColor: '#638889', 
                        color: '#ffffff', 
                        borderRadius : '20px',
                        padding : '10px'
                     }}
                    onClick={handleOnClick}
                >
                    Ask a Question
                </button>
                </div>
            </>
        );
    }
}
