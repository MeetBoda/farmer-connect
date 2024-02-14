import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LikeDislike = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const handleLikeClick = () => {
    setLikes(likes + 1);
  };

  const handleDislikeClick = () => {
    setDislikes(dislikes + 1);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <button onClick={handleLikeClick} className="btn btn-primary mx-2">
        Like <span className="badge bg-secondary">{likes}</span>
      </button>
      <button onClick={handleDislikeClick} className="btn btn-danger mx-2">
        Dislike <span className="badge bg-secondary">{dislikes}</span>
      </button>
    </div>
  );
};

export default LikeDislike;