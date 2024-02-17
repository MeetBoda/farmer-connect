import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ProfileSidebar() {
    return (
        <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
            <div className="sidebar-sticky d-flex flex-column justify-content-between" style={{ height: "100vh" }}>
                <div className="sidebar-options">
                    {/* <div className="sidebar-option" Style="margin-bottom:5px;">
                        <NavLink className="sideLink" to="/profile/myblogs">Blog</NavLink>
                    </div> */}
                    <div className="mt-5 mb-3">
                        <NavLink className="nav-link" to="/profile/myquestions" style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '18px' }}>Questions</NavLink>
                    </div>
                    <div className="sidebar-option mb-3">
                        <NavLink className="nav-link" to="/profile/myanswers" style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '18px' }}>Answers</NavLink>
                    </div>
                </div>
                {/* <footer className="text-right pr-3 mb-5">
                    <p style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '14px', color: 'black' }}>{localStorage.getItem("username")}</p>
                </footer> */}
            </div>
        </nav>
    )
}
