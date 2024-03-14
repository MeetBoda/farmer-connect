import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { useToast } from '@chakra-ui/react'
import Modal from '../../Modal';
import ResolveComplaintForm from './ResolveComplaintForm';

const ViewComplaints = () => {
    
    // const complaints = useLoaderData();

    const [complaints, setComplaints] = useState([]);
    const [solveComplaint, setSolveComplaint] = useState({
        complaint_id:0,
        message:"",
        steps_taken:""
    });
    const [isComplaintSolving, setComplaintSolving] = useState(false);
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

    const HandleResolve = async(e, complaint) => {
        e.preventDefault();
        console.log(complaint);
        console.log(complaint.complaint_id);
        console.log(complaint.message);
        setSolveComplaint({complaint_id:complaint.complaint_id, message:complaint.message})
        setComplaintSolving(!isComplaintSolving);
    }

    const handleToggleEdit = () => {
        console.log("Edit button clicked");
        setComplaintSolving(!isComplaintSolving);
      };
    

    const HandleSteps = (e) => {
        setSolveComplaint((prevState) => {return {...prevState, steps_taken:e.target.value}})
    }

    const HandleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch('/api/update-status', {
            method:'POST',
            body: JSON.stringify(solveComplaint),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        const json = await response.json();
        if(json.message == "Complaint Resolved"){
            toast({
                title: 'Complaint Resolved',
                // description: 'This is a notification using Chakra-UI.',
                status: 'success',
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
        setComplaintSolving(!isComplaintSolving);
    }

    return (
        <>
        <Navbar />
        {isComplaintSolving && 
            <Modal onClose={handleToggleEdit}>
            <ResolveComplaintForm
            complaints={solveComplaint}
            handleSteps={HandleSteps}
            handleSubmit={HandleSubmit}
          />
          </Modal>
        }
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
                                            <th className="col-md-3 col-xs-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {complaints.map((complaint, index) => (
                                            <tr key={index} className="table-row custom-table-row">
                                                <td>{index + 1}</td>
                                                <td>{complaint.message}</td>
                                                <td>{complaint.posted_by}</td>
                                                <td>{complaint.status}</td>
                                                <td><button className='btn btn-sm' onClick={(e) => HandleResolve(e, complaint)} complaint={complaint}>Resolve</button></td>
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
