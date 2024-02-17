import React, { useState, useMemo, useRef, useCallback } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';
import JoditEditor from "jodit-react";
import DOMPurify from 'dompurify';
import QuestionComment from './QuestionComment';
import Navbar from '../Navbar';
import { Helmet } from 'react-helmet';
import Footer from '../Footer';

const QuestionItem = () => {

    const { question_id } = useParams();
    console.log(question_id);
    const [question, setQuestion] = useState(useLoaderData());
    const [showComments, setShowComments] = useState(false);

    const user_id = localStorage.getItem("userid");
    const user_name = localStorage.getItem("username");

    const [details, setDetails] = useState({
        ans: "",
        question_id: question_id,
        posted_by: user_name,
        posted_by_id: user_id
    });

    const [commentdetails, setcommentDetails] = useState({
        message: "",
        question_id: question_id,
        posted_by: user_name,
        posted_by_id: user_id
    });

    const [voteCount, setvoteCount] = useState(question.likes);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);

    const upvote = async () => {
        const formData = {
            question_id: question_id,
            liked_by_id: user_id
        };
        if (isUpvoted === false && isDownvoted === false) {
            setIsUpvoted(true);
            const response = await fetch('/api/like-question', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount + 1);
                } else {
                    console.log("Error while updating likes");
                }
            });
        }
        else if (isUpvoted === true && isDownvoted === false) {
            setIsUpvoted(false);
            const response = await fetch('/api/remove-like-question', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount - 1);
                } else {
                    console.log("Error while updating likes");
                }
            });
        }
        else if (isUpvoted === false && isDownvoted === true) {
            setIsUpvoted(true);
            setIsDownvoted(false);
            const response = await fetch('/api/convert-dislike-to-like-question', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount + 2);
                } else {
                    console.log("Error while updating likes");
                }
            });
        }
    }

    const downvote = async () => {
        const formData = {
            question_id: question_id,
            liked_by_id: user_id
        };
        if (isDownvoted === false && isUpvoted === false) {
            setIsDownvoted(true);
            const response = await fetch('/api/dislike-question', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount - 1);
                } else {
                    console.log("Error while updating likes");
                }
            });
        }
        else if (isDownvoted === true && isUpvoted === false) {
            setIsDownvoted(false);
            const response = await fetch('/api/remove-dislike-question', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount + 1);
                } else {
                    console.log("Error while updating likes");
                }
            });
        }
        else if (isDownvoted === false && isUpvoted === true) {
            setIsDownvoted(true);
            setIsUpvoted(false);
            const response = await fetch('/api/convert-like-to-dislike-question', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount - 2);
                } else {
                    console.log("Error while updating likes");
                }
            });
        }
    }

    const handelCommentChange = (e) => {
        setcommentDetails((prevState) => ({ ...prevState, message: e.target.value }));
        //console.log(details);
    }

    const handelCommentSubmit = async (e) => {
        e.preventDefault();
        if (commentdetails.message.trim() === '') {
            alert('Please enter your Comment before submitting.'); // Show an error message
        }
        else {
            const response = await fetch('/api/comment-on-question', {
                method: 'POST',
                body: JSON.stringify(commentdetails),
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
                setcommentDetails({
                    message: "",
                    question_id: question_id,
                    posted_by: user_name,
                    posted_by_id: user_id
                });
                msg = json;
                if (msg !== '') {
                    msg = "Comment has been Added Successfully"

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

    const toggleContainerStyle = {
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    };

    const toggleButtonStyle = {
        backgroundColor: '#a5b4a0',
        color: '#4e6f43',
        border: 'none',
        padding: '10px 20px',
        fontSize: '20px',
        cursor: 'pointer',
        width: '100%',
        textAlign: 'left',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        fontWeight: '500'
    };

    const answersStyle = {
        padding: '10px 20px',
        backgroundColor: '#f8f9fa',
        color: '#000000',
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px'
    };

    const backgroundStyle = {
        background: 'linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff'
    };

    const config = useMemo(() => ({
        buttons: ["bold", "italic", "link", "unlink", "ul", "ol", "underline", "image", "font", "fontsize", "brush", "redo", "undo", "eraser", "table"],
    }), []);

    const editor = useRef(null);

    const [showAnswers, setShowAnswers] = useState(false);
    const [viewComments, setViewComments] = useState(false);

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
                    posted_by: user_name,
                    posted_by_id: user_id
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

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    return (
        <div style={backgroundStyle}>
            <Helmet>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            </Helmet>
            <Navbar />
            <div style={{ maxWidth: '900px', margin: 'auto', paddingTop: '55px' }}>
                <div className="card-group-control card-group-control-right">
                    <div className="card mb-2 w-100">
                        <div className="card-header" style={{ borderBottom: '1px solid #ccc' }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="text-muted text-uppercase">
                                    <h6 className="card-title" style={{ fontSize: '20px', marginBottom: '0' }}>
                                        <i className="fa fa-question-circle-o mr-2 mt-0-20 pull-left"></i>
                                        {question.question_title}
                                    </h6>
                                </div>
                                <ul className="list-inline mb-0">
                                    <li className="list-inline-item">
                                        <a href="#" className="text-success mr-2" onClick={upvote}>
                                            <i className="fa fa-thumbs-up" style={{ fontSize: '26px' }}></i>
                                        </a>
                                        <span style={{ fontSize: '22px', fontWeight: '400' }}>{voteCount}</span>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#" className="text-muted mr-2" onClick={downvote}>
                                            <i className="fa fa-thumbs-down" style={{ fontSize: '26px' }}></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="collapse show">
                            <div className="card-body">
                                {question.question}
                            </div>
                            <div className="card-footer bg-transparent d-sm-flex align-items-sm-center border-top-0 pt-0">
                                <span className="text-muted">Posted By : {question.posted_by}</span>
                            </div>
                            <div className="d-flex justify-content-center">
                                <div className="text-center mb-3">
                                    <button
                                        className="btn btn-primary"
                                        onClick={toggleComments}
                                        style={{
                                            border: 'none',
                                            backgroundColor: '#799b6e',
                                            outline: 'none',
                                            boxShadow: 'none',
                                        }}
                                        tabIndex={0}
                                    >
                                        {showComments ? 'Hide Comments' : 'Show Comments'}
                                    </button>

                                </div>
                            </div>
                            {showComments && (
                                <div>
                                    <ul>
                                        {question.comments.map((comment) => (
                                            <QuestionComment key={comment.comment_id} comment={comment} />
                                        ))}
                                    </ul>
                                    <br></br>
                                    <form className="m-3">
                                        <input
                                            className="form-control"
                                            style={{ borderBottom: '1px solid #ccc', borderTop: 'none', borderLeft: 'none', borderRight: 'none', flex: '1', borderRadius: '0', boxShadow: 'none' }}
                                            placeholder="Your Comment"
                                            value={commentdetails.message}
                                            onChange={handelCommentChange}
                                            required
                                        />
                                        <button className="btn btn-primary m-2"
                                            type="submit"
                                            onClick={handelCommentSubmit}
                                            style={{
                                                border: 'none',
                                                backgroundColor: '#799b6e',
                                                outline: 'none',
                                                boxShadow: 'none',
                                            }}
                                            tabIndex={0}
                                        >Add Comment</button>
                                    </form>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                <div className="text-center m-3">
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowAnswers(!showAnswers)}
                        style={{
                            border: 'none',
                            backgroundColor: '#799b6e',
                            outline: 'none',
                            boxShadow: 'none',
                        }}
                        tabIndex={0}
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
                                        <div className="card-body" dangerouslySetInnerHTML={{ __html: val.ans }} style={{ backgroundColor: "#e4e3e3" }} />
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
                                    backgroundColor: '#799b6e',
                                    color: '#ffffff',
                                    borderRadius: '5px',
                                    placeItems: 'center',
                                    display: 'grid',
                                    border: 'none',
                                    marginBottom : '20px'
                                }}
                                onClick={handleSubmit}
                            >
                                Submit Answer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
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
