import React, { useEffect, useState  } from "react";
import { faThumbsUp, faThumbsDown, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CommentInput from './CommentInput';
import AnswerComment from "./AnswerComment";
import { useDisclosure } from "@chakra-ui/react";

const AnswerItem = ({ans, id, islogin, pleaselogin, user_id, question_id, user_name}) => {

    const [showComments, setShowComments] = useState(false);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);
    const [answer, setAnswer] = useState(ans);
    const [totalComments, setTotalComments] = useState(answer.comments.length);
    const [voteCount, setvoteCount] = useState(answer.likes);
    
    const [commentdetails, setcommentDetails] = useState({
        message: "",
        question_id: question_id,
        answer_id : answer.answer_id,
        posted_by: user_name,
        posted_by_id: user_id
    });

    const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();

    useEffect(() => {
        setTotalComments(answer.comments.length);
        if(islogin){
            var value;
            var isvoted = false;
            for (var i of answer.likes_by) {
                if (i.liked_by_id == user_id) {
                    value = i.value;
                    isvoted = true;
                }
            }
            console.log(isvoted);
            if (isvoted) {
                if (value === 1) {
                    setIsUpvoted(true);
                }
                else {
                    setIsDownvoted(true);
                }
            } 
        }
    }, [])

    const upvote = async(e) => {
        var formData = {
            question_id: question_id,
            answer_id : e,
            liked_by_id: user_id
        };
        console.log(formData);
        if (isUpvoted === false && isDownvoted === false) {
            setIsUpvoted(true);
            const response = await fetch('/api/like-answer', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount + 1);
                    for(var a of data){
                        if(a.answer_id == answer.answer_id){
                            console.log(a);
                            setAnswer(a);
                            break;
                        }
                    }
                } else {
                    console.log("1. Error while updating likes");
                }
            });
        }
        else if (isUpvoted === true && isDownvoted === false) {
            setIsUpvoted(false);
            const response = await fetch('/api/remove-like-answer', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount - 1);
                    for(var a of data){
                        if(a.answer_id == answer.answer_id){
                            console.log(a);
                            setAnswer(a);
                            break;
                        }
                    }
                } else {
                    console.log("2. Error while updating likes");
                }
            });
        }
        else if (isUpvoted === false && isDownvoted === true) {
            setIsUpvoted(true);
            setIsDownvoted(false);
            const response = await fetch('/api/convert-dislike-to-like-answer', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount + 2);
                    for(var a of data){
                        if(a.answer_id == answer.answer_id){
                            console.log(a);
                            setAnswer(a);
                            break;
                        }
                    }
                } else {
                    console.log("3. Error while updating likes");
                }
            });
        }
        
    }

    const downvote = async(e) => {
        var formData = {
            question_id: question_id,
            answer_id : e,
            liked_by_id: user_id
        };
        if (isDownvoted === false && isUpvoted === false) {
            setIsDownvoted(true);
            const response = await fetch('/api/dislike-answer', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount - 1);
                    for(var a of data){
                        if(a.answer_id == answer.answer_id){
                            console.log(a);
                            setAnswer(a);
                            break;
                        }
                    }
                } else {
                    console.log("4. Error while updating likes");
                }
            });
        }
        else if (isDownvoted === true && isUpvoted === false) {
            setIsDownvoted(false);
            const response = await fetch('/api/remove-dislike-answer', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount + 1);
                    for(var a of data){
                        if(a.answer_id == answer.answer_id){
                            console.log(a);
                            setAnswer(a);
                            break;
                        }
                    }
                } else {
                    console.log("5. Error while updating likes");
                }
            });
        }
        else if (isDownvoted === false && isUpvoted === true) {
            setIsDownvoted(true);
            setIsUpvoted(false);
            const response = await fetch('/api/convert-like-to-dislike-answer', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            response.json().then(data => {
                if (response.ok) {
                    setvoteCount(voteCount - 2);
                    for(var a of data){
                        if(a.answer_id == answer.answer_id){
                            console.log(a);
                            setAnswer(a);
                            break;
                        }
                    }
                } else {
                    console.log("6. Error while updating likes");
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
        else if(user_id === null){
            // alert('Please login before adding a comment.');
            onOpen();
        }
        else {
            const response = await fetch('/api/comment-on-answer', {
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
                    answer_id : answer.answer_id,
                    question_id: question_id,
                    posted_by: user_name,
                    posted_by_id: user_id
                });
                for(var a of json){
                    if(a.answer_id == answer.answer_id){
                        console.log(a);
                        setAnswer(a);
                        break;
                    }
                }
                msg = json;
                if (msg !== '') {
                    msg = "Comment has been Added Successfully"
                }
            }
            alert(msg);
            setTotalComments(totalComments + 1);
        }
    }

    const toggleContainerStyle = {
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    };

    if(islogin){
        return (
            <div key={id} className="card mb-3">
                <div className="card-body" dangerouslySetInnerHTML={{ __html: answer.ans }} style={{ backgroundColor: "#e4e3e3" }} />
                <div className="card-footer text-muted" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                                <a href="#" className="text-success mr-2" onClick={() => upvote(answer.answer_id)}>
                                    <FontAwesomeIcon icon={faThumbsUp} />
                                </a>
                                <span style={{ fontSize: '22px', fontWeight: '400' }}>{voteCount}</span>
                            </li>
                            <li className="list-inline-item">
                                <a href="#" className="text-secondary mr-2" onClick={() => downvote(answer.answer_id)}>
                                    <FontAwesomeIcon icon={faThumbsDown} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card-footer text-muted" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '10px' }}>
                    <div>
                        Posted by: {answer.posted_by} {answer.is_expert == 1 && "  (Expert)"}
                    </div>
                    <div>
                        <a className="text-secondary" onClick={() => setShowComments(!showComments)}>
                            <i className="fa fa-comments" style={{ fontSize: '24px' }} aria-hidden="true"></i>&nbsp;
                            <span style={{ fontSize: '1.25rem' }}>{totalComments}</span>
                        </a> &nbsp; &nbsp;
                    </div>
                    <div>
                        {new Date(answer.time).toLocaleString()}
                    </div>
                </div>

                {showComments && (
                    <div className="toggle-container" style={toggleContainerStyle} >
                        <br />
                        <CommentInput
                            onSubmit={handelCommentSubmit}
                            value={commentdetails.message}
                            onChange={handelCommentChange}
                            className="flex-grow-2 mr-1"
                        ></CommentInput>
                        {answer.comments.map((comment) => (
                            <AnswerComment key={comment.comment_id} comment={comment} />
                        ))}
                        <br></br>
                    </div>
                )}
                <br/>
            </div>
        );
    }
    else{
        return (
            <div key={id} className="card mb-3">
                <div className="card-body" dangerouslySetInnerHTML={{ __html: answer.ans }} style={{ backgroundColor: "#e4e3e3" }} />
                <div className="card-footer text-muted" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                                <a href="#" className="text-success mr-2" onClick={pleaselogin}>
                                    <FontAwesomeIcon icon={faThumbsUp} />
                                </a>
                                <span style={{ fontSize: '22px', fontWeight: '400' }}>{voteCount}</span>
                            </li>
                            <li className="list-inline-item">
                                <a href="#" className="text-secondary mr-2" onClick={pleaselogin}>
                                    <FontAwesomeIcon icon={faThumbsDown} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card-footer text-muted" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '10px' }}>
                    <div>
                        Posted by: {answer.posted_by} {answer.is_expert == 1 && "  (Expert)"}
                    </div>
                    <div>
                        <a className="text-secondary" onClick={() => setShowComments(!showComments)}>
                            <i className="fa fa-comments" style={{ fontSize: '24px' }} aria-hidden="true"></i>&nbsp;
                            <span style={{ fontSize: '1.25rem' }}>{totalComments}</span>
                        </a> &nbsp; &nbsp;
                    </div>
                    <div>
                        {new Date(answer.time).toLocaleString()}
                    </div>
                </div>

                {showComments && (
                    <div className="toggle-container" style={toggleContainerStyle} >
                        <br />
                        <CommentInput
                            onSubmit={handelCommentSubmit}
                            value={commentdetails.message}
                            onChange={handelCommentChange}
                            className="flex-grow-2 mr-1"
                        ></CommentInput>
                        {answer.comments.map((comment) => (
                            <AnswerComment key={comment.comment_id} comment={comment} />
                        ))}
                        <br></br>
                    </div>
                )}
            </div>
        );
    }
};

export default AnswerItem;