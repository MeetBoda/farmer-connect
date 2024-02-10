import React, { useState, useMemo, useRef, useCallback } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import JoditEditor from "jodit-react";
import DOMPurify from 'dompurify';

const QuestionItem = () => {
    const toggleContainerStyle = {
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    };

    const toggleButtonStyle = {
        backgroundColor: '#638889',
        color: '#ffffff',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px'
    };

    const answersStyle = {
        padding: '10px 20px',
        backgroundColor: '#f8f9fa',
        color: '#000000',
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px'
    };

    const backgroundStyle = {
        background: 'linear-gradient(to bottom, #e3ffe7, #d9e7ff)',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff'
    };

    const config = useMemo(() => ({
        buttons: ["bold", "italic", "link", "unlink", "ul", "ol", "underline", "image", "font", "fontsize", "brush", "redo", "undo", "eraser", "table"],
    }), []);

    const editor = useRef(null);

    const { question_id } = useParams();
    console.log(question_id);
    const [question, setQuestion] = useState(useLoaderData());

    const [details, setDetails] = useState({
        ans: "",
        question_id: question_id,
        posted_by: localStorage.getItem("username"),
        posted_by_id: localStorage.getItem('userid')
    });

    const [showAnswers, setShowAnswers] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (details.ans.trim() === '') {
            alert('Please enter your answer before submitting.');
        } else {
            const sanitizedContent = DOMPurify.sanitize(details.ans);
            const response = await fetch('/api/upload-answer', {
                method: 'POST',
                body: JSON.stringify({ ...details, ans: sanitizedContent }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            var msg;
            const json = await response.json();
            if (!response.ok) {
                msg = json.error;
            } else {
                setDetails({
                    ans: "",
                    question_id: question_id,
                    posted_by: localStorage.getItem("username"),
                    posted_by_id: localStorage.getItem('userid')
                });
                msg = json;
                if (msg !== '') {
                    msg = "Answer has been Added Successfully";
                }
            }
            alert(msg);
            const newData = await fetch('/api/specific-question?question_id=' + question_id);
            if (!newData.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await newData.json();
            setQuestion(data);
        }
    };

    const handelAnswerChange = useCallback((content) => {
        setDetails((prevState) => ({ ...prevState, ans: content }));
    }, []);

    return (
        <div style={backgroundStyle}>
            <div style={{ maxWidth: '900px', margin: 'auto' }}>
                <li className="list-group-item mb-4" style={{ margin: '10px 0' }}>
                    <div className="card">
                        <div className="card-header" style={{ backgroundColor: '#638889', color: '#ffffff', fontSize: '13px' }}>
                            <h5 className="card-title">{question.question_title}</h5>
                        </div>
                        <div className="card-body" style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
                            <p className="card-text" style={{ marginBottom: '10px' }}>{question.question}</p>
                            <div className="meta">
                                <span className="user">Posted by: {question.posted_by}</span>
                            </div>
                        </div>
                    </div>
                </li>

                <div className="text-center m-3">
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowAnswers(!showAnswers)}
                    >
                        {showAnswers ? 'Hide Answers' : 'Show Answers'}
                    </button>
                </div>

                {showAnswers && (
                    <div className="toggle-container" style={toggleContainerStyle}>
                        <button className="toggle-button" style={toggleButtonStyle}>Answers</button>
                        <div className="answers" style={answersStyle}>
                            <div className='mt-2'>
                                {question.answer && question.answer.map((val, index) => (
                                    <div key={index} className="card mb-3">
                                        <div className="card-body" dangerouslySetInnerHTML={{ __html: val.ans }} style={{ backgroundColor: "#e3ffe7" }} />
                                        <div className="card-footer text-muted" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '10px' }}>
                                            <div>
                                                Posted by: {val.posted_by}
                                            </div>
                                            <div>
                                                {new Date(val.time).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="jodit-editor-container mt-5">
                    <form>
                        <JoditEditor
                            value={details.ans}
                            config={config}
                            ref={editor}
                            onChange={handelAnswerChange}
                        />

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <button
                                className="btn btn-floating"
                                type="submit"
                                style={{
                                    backgroundColor: '#638889',
                                    color: '#ffffff',
                                    borderRadius: '20px',
                                    placeItems: 'center',
                                    display: 'grid'
                                }}
                                onClick={handleSubmit}
                            >
                                Submit Answer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const fetchquestion = async ({ params }) => {
    const { question_id } = params;
    const response = await fetch('/api/specific-question?question_id=' + question_id);
    console.log(response);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    return data;
};

export {
    fetchquestion,
    QuestionItem
};
