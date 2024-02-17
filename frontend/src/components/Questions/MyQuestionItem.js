import React, { useState } from 'react';
import '../../assets/css/profile.css'
import EditForm from '../Profiles/EditForm';

const MyQuestionItem = ({ question }) => {
  const [ques, setQuestion] = useState(question);
  const [isEditing, setEditing] = useState(false);
  const [editQuestion, seteditQuestion] = useState({
    question: ques.question,
    question_title: ques.question_title,
    question_id: ques.question_id
  });

  const handleToggleEdit = () => {
    console.log("Edit button clicked");
    setEditing(!isEditing);
  };

  const handleTitleChange = (e) => {
    seteditQuestion((prevState) => ({ ...prevState, question_title: e.target.value }));
  };

  const handleQuestionChange = (e) => {
    seteditQuestion((prevState) => ({ ...prevState, question: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/edit-question', {
      method: 'POST',
      body: JSON.stringify(editQuestion),
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
      msg = json;
      if (msg !== '') {
        msg = "Question has been Updated Successfully"
      }
    }
    alert(msg);
    const newData = await fetch('/api/specific-question?question_id=' + ques.question_id);
    if (!newData.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await newData.json();
    setQuestion(data);
  };

  return (
    <>
      {isEditing ? (
        // <form onSubmit={handleSubmit}>
        //   <div className="form-group">
        //     <label>Question Title:</label>
        //     <input type="text" className="form-control" value={editQuestion.question_title} onChange={handleTitleChange} />
        //   </div>
        //   <div className="form-group">
        //     <label>Question:</label>
        //     <textarea className="form-control" value={editQuestion.question} onChange={handleQuestionChange} />
        //   </div>
        //   <button type="submit" className="btn btn-primary mr-2">Save</button>
        //   <button type="button" className="btn btn-secondary" onClick={handleToggleEdit}>Cancel</button>
        // </form>
        <EditForm 
        editQuestion={editQuestion}
        handleTitleChange={handleTitleChange}
        handleQuestionChange={handleQuestionChange}
        handleSubmit={handleSubmit}
        handleCancel={handleToggleEdit}
        />
      ) : (
        <div className="m-3 content-card">
          <div className="card-big-shadow">
            <div className="card card-just-text" data-background="color" data-color="grey" data-radius="none">
              <div style={{ backgroundColor: 'rgba(133, 162, 125, 0.4)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}></div>
              <div className="content" style={{ position: 'relative', zIndex: 1 }}>
                <h6 className="category" style={{ color: 'grey' }}>{ques.question_title}</h6>
                <p className="description" style={{ color: 'grey' }}>{ques.question}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="btn btn-secondary mb-3" style={{ width : '100px'}} onClick={handleToggleEdit}>Edit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyQuestionItem;
