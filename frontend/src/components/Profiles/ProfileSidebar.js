import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ProfileSidebar() {
    return (
        <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
            <div className="sidebar-sticky d-flex flex-column justify-content-between" style={{ height: "100vh" }}>
                <div className="sidebar-options">
                    <div className="sidebar-option mt-2 mb-3">
                        <NavLink className="nav-link" to="/profile/myquestions" style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '18px' }}>Questions</NavLink>
                    </div>
                    <div className="sidebar-option mb-3">
                        <NavLink className="nav-link" to="/profile/myanswers" style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '18px' }}>Answers</NavLink>
                    </div>
                    <div className="sidebar-option mb-3">
                        <NavLink className="nav-link" to="/profile/mycomplaints" style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '18px' }}>Complaints</NavLink>
                    </div>
                    <div className="sidebar-option mb-3">
                        <NavLink className="nav-link" to="/profile/myimages" style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '18px' }}>Crop Disease</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}
