import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useLoaderData } from 'react-router-dom';
import { background } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'

const ViewComplaints = () => {
    
    // const complaints = useLoaderData();

    const [complaints, setComplaints] = useState([]);
    // const user_id = localStorage.getItem("userid");
    const toast = useToast()

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await fetch('/api/fetch-all-complaints'); 
                if (!response.ok) {
                    throw new Error('Failed to fetch complaints');
                }
                const data = await response.json();
                setComplaints(data);
            } 
            catch (error) {
                console.error('Error fetching complaints:', error);
            }
        };

        fetchComplaints();
    }, []); 

    const HandleResolve = async(e) => {
        e.preventDefault();
        const response = await fetch('/api/update-status', {
            method:'POST',
            body: JSON.stringify({complaint_id:e.target.value}),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const json = await response.json();
        if(json.message == "Complaint Resolved"){
            toast({
                title: 'Complaint Resolved',
                // description: 'This is a notification using Chakra-UI.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position : 'top-right',
            })
        }
        else{
            toast({
                title: 'Error Occured while Resolving Complaint',
                // description: 'This is a notification using Chakra-UI.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position : 'top-right',
            })
        }
        setComplaints(json.complaints);
    }

    return (
        <>
        <Navbar />
        <div className="container-fluid mt-4">
                    <h3 style={{ color: 'grey', fontWeight: '500', textAlign: 'center', paddingTop: '30px', paddingBottom: '10px' }}>All Complaints</h3>
                    <div className="card mb-4" style={{ border: 'none' }}>
                        <div className="card-body">
                            <div className="form-group">
                                {/* <input type="text" className="search form-control" placeholder="What you looking for?" onChange={handleSearch} /> */}
                                <span className="pull-right">{complaints.length} item(s)</span>
                                <table className="table table-hover table-bordered results">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th className="col-md-3 col-xs-4">Message</th>
                                            <th className="col-md-3 col-xs-4">Uploaded By</th>
                                            <th className="col-md-3 col-xs-3">Status</th>
                                            <th className="col-md-3 col-xs-3">Resolve</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {complaints.map((complaint, index) => (
                                            <tr key={index} className="table-row custom-table-row">
                                                <td>{index + 1}</td>
                                                <td>{complaint.message}</td>
                                                <td>{complaint.posted_by}</td>
                                                <td>{complaint.status}</td>
                                                <td><button onClick={HandleResolve} value={complaint.complaint_id}>Resolved</button></td>
                                            </tr>
                                        ))}
                                        {complaints.length === 0 && (
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
        <Footer />
        </>
    );
};

// const fetchallcomplaints = async() => {
//     const response = await fetch('/api/fetch-all-complaints');
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     const data = await response.json();
//     // console.log(data);
//     return data;
// }

export{
    ViewComplaints
    // fetchallcomplaints
};
