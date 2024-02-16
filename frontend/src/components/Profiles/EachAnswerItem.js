import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import '../../assets/css/profile.css'

const EachAnswerItem = ({ question, answer }) => {
  const [answ, setAns] = useState(answer);
  const [isEditing, setEditing] = useState(false);
  const [editAnswer, seteditAnswer] = useState({
    ans: answ.ans,
    question_id: question.question_id,
    answer_id: answ.answer_id
  })

  const valid = answ.posted_by_id == localStorage.getItem('userid');

  const handleToggleEdit = () => {
    setEditing(!isEditing);
  };

  const handleAnswerChange = (e) => {
    seteditAnswer((prevState) => ({ ...prevState, ans: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/edit-answer', {
      method: 'POST',
      body: JSON.stringify(editAnswer),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log("Shru");
    var msg;
    const json = await response.json();

    if (!response.ok) {
      msg = json.error;
    }
    else {
      msg = json;
      if (msg !== '') {
        msg = "Answer has been Updated Successfully"
      }
    }
    alert(msg);
    const newData = await fetch('/api/specific-answer?answer_id=' + answ.answer_id + '&question_id=' + question.question_id);
    if (!newData.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await newData.json();
    for (var a of data) {
      if (a.answer_id == answ.answer_id) {
        console.log(a);
        setAns(a);
        break;
      }
    }
  };

  return (
    <>
      {valid &&
        <div className="question-item" value={question.question_id}>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <label>
                New Answer:
                <textarea value={editAnswer.ans} onChange={handleAnswerChange} />
              </label>
              <button Style="margin-left:0px" type="submit">Save</button>
            </form>
          ) : (
            <>
              {/* <h3 className="question-title">{question.question_title}</h3>
            <div className="question-content"></div>
            <p>Your Answer :</p> 
            <p className='myanswer-item' dangerouslySetInnerHTML={{ __html: answ.ans }}></p> */}
              <div className="m-3 content-card">
                <div className="card-big-shadow">
                  <div className="card card-just-text" data-background="color" data-color="grey" data-radius="none">
                    <div style={{ backgroundColor: 'rgba(133, 162, 125, 0.4)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}></div>
                    <div className="content" style={{ position: 'relative', zIndex: 1 }}>
                      <h6 className="category" style={{ color: 'grey' }}>{question.question_title}</h6>
                      <p className="description" dangerouslySetInnerHTML={{ __html: answ.ans }} style={{ color: 'grey' }}></p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button className="btn btn-secondary mb-3" style={{ width: '100px' }} onClick={handleToggleEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {/* <button Style="width: 100px;margin-left: 1100px;" onClick={handleToggleEdit}>{isEditing ? 'Cancel' : 'Edit'}</button> */}
        </div>
      }
    </>
  );
};

export default EachAnswerItem;