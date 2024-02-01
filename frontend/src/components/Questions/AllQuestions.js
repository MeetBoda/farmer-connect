import React from 'react';
import { Link } from 'react-router-dom';

const AllQuestions = ({ question }) => {
    return (
        <li className="list-group-item mb-4" style={{ margin: '10px 0' }}>
            <Link to={`/question/${question.question_id}`} key={question.question_id} style={{ textDecoration : 'none'}}>
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
            </Link>
        </li>

    );
}

export default AllQuestions;
