import { React, useState, useMemo, useRef, useCallback } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { useParams, useLoaderData } from 'react-router-dom'
import JoditEditor from "jodit-react";
import DOMPurify from 'dompurify';

const QuestionItem = () => {

    const backgroundStyle = {
        background: 'linear-gradient(to bottom, #e3ffe7, #d9e7ff)', // Replace with your gradient colors
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
    };

    const config = useMemo(() => ({
        buttons: ["bold", "italic", "link", "unlink", "ul", "ol", "underline", "image", "font", "fontsize", "brush", "redo", "undo", "eraser", "table"],
    }), []);

    const editor = useRef(null);

    const { question_id } = useParams();
    console.log(question_id)
    const [question, setQuestion] = useState(useLoaderData());

    const [details, setDetails] = useState({
        ans: "",
        question_id: question_id,
        posted_by: localStorage.getItem("username"),
        posted_by_id: localStorage.getItem('userid')
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (details.ans.trim() === '') {
            alert('Please enter your answer before submitting.'); // Show an error message
        }
        else {
            const sanitizedContent = DOMPurify.sanitize(details.ans);
            const response = await fetch('/api/upload-answer', {
                method: 'POST',
                body: JSON.stringify({ ...details, ans: sanitizedContent }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            var msg;
            const json = await response.json();
            if (!response.ok) {
                msg = json.error;
            }
            else {
                setDetails({
                    ans: "",
                    question_id: question_id,
                    posted_by: localStorage.getItem("username"),
                    posted_by_id: localStorage.getItem('userid')
                });
                msg = json;
                if (msg !== '') {
                    msg = "Answer has been Added Successfully"
                }
            }
            alert(msg);
            const newData = await fetch('/api/specific-question?question_id=' + question_id);
            // console.log(response);
            if (!newData.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await newData.json();
            // console.log(data);           // setTempComment(tempComment + 1);
            setQuestion(data);
        }
    }

    const handelAnswerChange = useCallback((content) => {
        setDetails((prevState) => ({ ...prevState, ans: content }));
        console.log(details);
    }, []);

    return (
        <>
            {/* <Navbar /> */}
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

                    <div>
                        {/* {
                        question.answer && question.answer.map((val, index) => (
                            <div key={index}>
                                <div key={index} dangerouslySetInnerHTML={{ __html: val.ans }} />
                            </div>
                        ))
                    } */}
                        <h2 className="text-center">All Answers</h2>
                        <div className='mt-2'>
                            {question.answer && question.answer.map((val, index) => (
                                <div key={index} className="card mb-3">
                                    <div className="card-body" dangerouslySetInnerHTML={{ __html: val.ans }} style={{ backgroundColor: "#e3ffe7" }} />
                                    <div className="card-footer text-muted">
                                        Posted by: {val.posted_by}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                        <div className="jodit-editor-container">
                            <form>
                                <JoditEditor
                                    value={details.ans}
                                    config={config}
                                    ref={editor}
                                    onChange={handelAnswerChange}
                                />

                                <button
                                    className="btn btn-floating"
                                    type="submit"
                                    style={{
                                        backgroundColor: '#638889',
                                        color: '#ffffff',
                                        borderRadius: '20px',
                                        marginBottom: '20px',
                                        placeItems : 'center',
                                        display : 'grid'
                                    }}
                                    onClick={handleSubmit}
                                >
                                    Submit Answer
                                </button>
                            </form>
                        </div>
                    </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

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
}

export {
    fetchquestion,
    QuestionItem
}


