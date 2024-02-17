import React, { useState } from 'react';

const EditForm = ({ editQuestion, handleTitleChange, handleQuestionChange, handleSubmit, handleCancel }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        {/* <label>Question Title:</label> */}
        <input type="text" className="form-control" value={editQuestion.question_title} onChange={handleTitleChange} />
      </div>
      <div className="form-group">
        {/* <label>Question:</label> */}
        <textarea className="form-control" value={editQuestion.question} onChange={handleQuestionChange} />
      </div>
      <button type="submit" className="btn btn-primary mr-2">Save</button>
      <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default EditForm;
