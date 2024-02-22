import React, { useState, useEffect } from 'react';
import ProfileSidebar from '../Profiles/ProfileSidebar';
import '../../assets/css/myComplaint.css';
import Navbar from '../Navbar';
import { Helmet } from 'react-helmet';

const MyComplaints = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await fetch('/api/all-complaints'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch complaints');
                }
                const data = await response.json();
                setComplaints(data);
            } catch (error) {
                console.error('Error fetching complaints:', error);
            }
        };

        fetchComplaints();
    }, []); 

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const filteredComplaints = complaints.filter(complaint =>
        complaint.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Navbar />
            <Helmet>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
            </Helmet>
            <div className="d-flex" style={{ marginTop: '0vh', backgroundColor: "white" }}>
                <ProfileSidebar />
                <div className="container-fluid mt-4">
                    <h3 style={{ color: 'grey', fontWeight: '500', textAlign: 'center', paddingTop: '30px', paddingBottom: '10px' }}>Your Complaints</h3>
                    <div className="card mb-4" style={{ border: 'none' }}>
                        <div className="card-body">
                            <div className="form-group">
                                <input type="text" className="search form-control" placeholder="What you looking for?" onChange={handleSearch} />
                                <span className="pull-right">{filteredComplaints.length} item(s)</span>
                                <table className="table table-hover table-bordered results">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th className="col-md-4 col-xs-4">Message</th>
                                            <th className="col-md-3 col-xs-3">Status</th>
                                            <th className="col-md-3 col-xs-3">Uploaded At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredComplaints.map((complaint, index) => (
                                            <tr key={index} className="table-row custom-table-row">
                                                <td>{index + 1}</td>
                                                <td>{complaint.message}</td>
                                                <td>{complaint.status}</td>
                                                <td>{formatDate(complaint.createdAt)}</td>
                                            </tr>
                                        ))}
                                        {filteredComplaints.length === 0 && (
                                            <tr className="warning no-result">
                                                <td colSpan="5"><i className="fa fa-warning"></i> No result</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyComplaints;