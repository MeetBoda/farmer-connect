import React from 'react';
import { Helmet } from 'react-helmet';
import '../../assets/css/lorem.css'

const Lorem = () => {
    return (
        <div className="container d-flex justify-content-center mt-50 mb-50">
            <Helmet>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            </Helmet>
            <div className="w-100 overflow-auto order-2 order-md-1">
                <div className="card-group-control card-group-control-right">
                    <div className="card mb-2 w-100">
                        <div className="card-header">
                            <h6 className="card-title">
                                <a className="text-muted text-uppercase" data-toggle="collapse" href="#question1" >
                                    <i className="fa fa-question-circle-o mr-2 mt-0-20 pull-left"></i>
                                    What is Lorem Ipsum?
                                    <i className="fa fa-minus mr-2 text-slate pull-right"></i>
                                </a>
                            </h6>
                        </div>
                        <div id="question1" className="collapse hide" style={{}}>
                            <div className="card-body">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                            </div>
                            <div className="card-footer bg-transparent d-sm-flex align-items-sm-center border-top-0 pt-0">
                                <span className="text-muted">Latest update: May 25, 2019</span>
                                <ul className="list-inline text-nowrap mb-0 ml-auto mt-2 mt-sm-0">
                                    <li className="list-inline-item"><a href="#" className="text-primary mr-2" data-abc="true"><i className="fa fa-thumbs-up"></i></a> 3120</li>
                                    <li className="list-inline-item"><a href="#" className="text-muted mr-2" data-abc="true"><i className="fa fa-thumbs-down"></i></a> 114</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-2 w-100">
                        <div className="card-header">
                            <h6 className="card-title">
                                <a className="text-muted text-uppercase" data-toggle="collapse" href="#question2" >
                                    <i className="fa fa-question-circle-o mr-2 mt-0-20 pull-left"></i>
                                    What is Lorem Ipsum?
                                    <i className="fa fa-minus mr-2 text-slate pull-right"></i>
                                </a>
                            </h6>
                        </div>
                        <div id="question2" className="collapse hide" style={{}}>
                            <div className="card-body">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                            </div>
                            <div className="card-footer bg-transparent d-sm-flex align-items-sm-center border-top-0 pt-0">
                                <span className="text-muted">Latest update: May 25, 2019</span>
                                <ul className="list-inline text-nowrap mb-0 ml-auto mt-2 mt-sm-0">
                                    <li className="list-inline-item"><a href="#" className="text-primary mr-2" data-abc="true"><i className="fa fa-thumbs-up"></i></a> 3120</li>
                                    <li className="list-inline-item"><a href="#" className="text-muted mr-2" data-abc="true"><i className="fa fa-thumbs-down"></i></a> 114</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* Other cards go here */}
                </div>
            </div>
        </div>
    );
};

export default Lorem;
