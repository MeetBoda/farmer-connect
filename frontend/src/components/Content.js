import React, { useEffect, useState, useRef, useMemo } from 'react';
import JoditEditor from "jodit-react";

export default function Content() {
    const [state, setState] = useState(false);
    const config = useMemo(() => ({
        buttons: ["bold", "italic", "link", "unlink", "ul", "ol", "underline", "image", "font", "fontsize", "brush", "redo", "undo", "eraser", "table"],
    }), []);
    const [commentState, setCommentState] = useState(false);
    const editor = useRef(null);
    const [value, setValue] = useState("");

  return (
    <div Style="height:100vh; margin-top:13vh; z-index:1; background-color:white">
            {(
                () => {
                    if (state === true) {

                        return (<>
                            <div className="alert alert-success alert-dismissible" role="alert">
                                Your Answer is Posted <strong>Successfully</strong>
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        </>)

                    }
                }
            )()}

            {(
                () => {
                    if (commentState === true) {

                        return (<>
                            <div className="alert alert-success alert-dismissible" role="alert">
                                Your Comment is Posted <strong>Successfully</strong>
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        </>)

                    }
                }
            )()}
            <div className="container" Style="height:100vh;width:70%;display:block; margin:auto;">

                {/* <div className="d-flex flex-row">
                    <div className="d-flex flex-column col-md-0 mt-0 mx-0">
                        
                    <button className='btn btn-white' id="queupvotebtn" onClick={(e) => upvoteQue(e, question._id)} style={{ width: '30px', height: '30px', backgroundColor: 'transparent', border: 'none', color: 'grey' }}>
                    &#9650;
                    </button>
                        <center><div className='mx-3'>{queVote}</div></center>
                        <button className='btn btn-white' id="quedownvotbtn" onClick={(e) => downvoteQue(e, question._id)} style={{ width: '30px', height: '30px', backgroundColor: 'transparent', border: 'none', color: 'grey' }}>
                        &#9660;
                        </button>   
                        


                    </div>
                    <div className="d-flex flex-column flex-shrink-0 col-md-9 mx-0">
                        <h1>{question.title}</h1>
                        <div className='mt-5'>{html}</div>
                    </div>
                </div>
                <hr Style={{
                    background: "black",
                    height: "2px",
                    border: "none",
                }}
                /><hr />

                <h4>{answers.length}  Answers</h4>
                {answers.length > 0 && (
                    <div className='mt-5'>
                        {answers.map(ans => (
                            <div className="">

                                <div className="d-flex flex-row">
                                    <div className="d-flex flex-column col-md-0 mt-0 mx-0">
                                        <button className='btn btn-black' id={"ansupvotebtn" + ans._id} onClick={(e) => upvote(e, ans._id)} Style="width:15px; border:none;"><i className="fa fa-caret-up" Style="font-size: 35px;"></i></button>
                                        <div className='mx-3'>{vote[ans._id]}</div>
                                        <button className='btn btn-black' id = {"ansdownvotebtn" + ans._id} onClick={(e) => downvote(e, ans._id)} Style="width:15px; border:none;"><i className="fa fa-caret-down" Style="font-size: 35px;"></i></button>
                                        {(
                                            () => {
                                                if (ans.status === "Accepted") {
                                                    return (<><button className='btn btn-white'><i className="fa fa-check" Style="font-size:25px;color:lightgreen;"></i></button></>)
                                                }
                                            }
                                        )()}
                                    </div>
                                    <div className="d-flex flex-column flex-shrink-0 col-md-9 mx-0">
                                        <p>{parse(ans.answer)}</p>

                                        <small className='d-flex flex-row-reverse'>Posted By : {ans.postedBy}</small>

                                        <div className="comments" Style="display:relative; bottom:0px;">
                                            <div className="comment">

                                                
                                            </div>
                                            {
                                                show && (
                                                    <div className="title">
                                                        <form method="POST" onSubmit={(e) => addComment(e, ans._id)}>
                                                            <textarea type="text" placeholder="Add Your comment.." rows={5} cols={100} name="comment" onChange={onChange}></textarea><br></br>
                                                            <button type="submit" className='btn btn-primary'>Add comment</button>
                                                        </form>
                                                    </div>
                                                )
                                            }
                                        </div>


                                    </div>
                                </div>

                               

                                <hr Style={{
                                    background: "#959595",
                                    height: "2px",
                                    border: "none",
                                }}
                                /><hr />

                            </div>
                        ))}
                    </div>
                )} */}

                <h4>Your Answer</h4>
                <form method='POST'>
                    <JoditEditor
                        ref={editor}
                        config={config}
                        tabIndex={1}
                        value={value}
                        // onBlur={(newContent) => getValue(newContent)}

                    />


                    {/* {
                        loginstatus === true ? (<button type='submit' className="btn btn-primary mt-5 mb-3">Post Your Answer</button>) : <></>
                    } */}

                </form>
            </div>
        </div>
  )
}
