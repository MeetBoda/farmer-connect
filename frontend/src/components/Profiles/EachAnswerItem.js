import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import '../../assets/css/profile.css'
import Modal from '../../Modal';
import { Helmet } from 'react-helmet';
import EditFormAns from './EditFormAns';

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
      <Helmet>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      </Helmet>
      {valid &&
        <div className="question-item" value={question.question_id}>
          {isEditing ? (
            // <form onSubmit={handleSubmit}>
            //   <label>
            //     New Answer:
            //     <textarea value={editAnswer.ans} onChange={handleAnswerChange} />
            //   </label>
            //   <button Style="margin-left:0px" type="submit">Save</button>
            // </form>
            <Modal onClose={handleToggleEdit}>
              <EditFormAns
                editAnswer={editAnswer}
                handleQuestionChange={handleAnswerChange}
                handleSubmit={handleSubmit}
              />
            </Modal>
          ) : (
            <>
              <div className="m-3 content-card">
                <div className="card-big-shadow">
                  <div className="card card-just-text" data-background="color" data-color="grey" data-radius="none">
                    <div style={{ backgroundColor: 'rgba(133, 162, 125, 0.4)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}></div>
                    <div className="content" style={{ position: 'relative', zIndex: 1 }}>
                      <h6 className="category" style={{ color: 'grey' }}>{question.question}</h6>
                      <p className="description" dangerouslySetInnerHTML={{ __html: answ.ans }} style={{ color: 'grey' }}></p>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button className="edit-icon" onClick={handleToggleEdit} style={{ border: 'none', backgroundColor: '#D8D8D8', borderRadius: '3px', padding: '2px 10px' }}>
                    <i className="fa fa-pencil-square-o fa-lg"></i>
                    <span style={{ marginLeft: '10px', verticalAlign: 'middle', fontSize: '16px', fontWeight: '500' }}>EDIT</span>
                  </button>
                </div>
              </div>
            </>
          )}
          </div>
      }
    </>
  );
};

export default EachAnswerItem;