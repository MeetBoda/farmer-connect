import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ProfileSidebar() {

    const role = localStorage.getItem("role");
    return (
        <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
            <div className="sidebar-sticky d-flex flex-column justify-content-between" style={{ height: "100vh" }}>
                <div className="sidebar-options">
                    {role == "Farmer" &&
                        <div className="sidebar-option mb-3 mt-3">
                        <NavLink className="nav-link" to="/profile/myquestions" style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '18px' }}>
                            <i className="fa fa-question-circle" aria-hidden="true"></i> Question
                        </NavLink>
                    </div>
                    }
                    <div className="sidebar-option mb-3">
                        <NavLink className="nav-link" to="/profile/myanswers" style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '18px' }}>
                            <i className="fa fa-reply" aria-hidden="true"></i> Answers
                        </NavLink>
                    </div>
                    {role == "Farmer" &&
                        <div className="sidebar-option mb-3">
                            <NavLink className="nav-link" to="/profile/mycomplaints" style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '18px' }}>
                                <i className="fa fa-exclamation-triangle" aria-hidden="true"></i> Complaints
                            </NavLink>
                        </div>
                    }
                    {role == "Farmer" &&
                        <div className="sidebar-option mb-3">
                            <NavLink className="nav-link" to="/profile/myimages" style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '18px' }}>
                                <i className="fa fa-medkit" aria-hidden="true"></i> Crop Disease
                            </NavLink>
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}
