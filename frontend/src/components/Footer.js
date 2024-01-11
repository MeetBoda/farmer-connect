import React from 'react';
import logo from '../assets/images/logo.png';

const Footer = () => {
    const containerStyle = {
        paddingTop: '20px', // Add your desired margin-top value
      };
  return (
    <>
      <footer id="footer" className="bg-dark text-white" style={containerStyle}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <h4>
                <a href="#">
                  <img className="img-responsive" src={logo} alt="" />
                </a>
              </h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias ullam numquam repudiandae repellat ex autem voluptas vel esse quo excepturi!</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, repellendus.</p>
            </div>
            <div className="col-md-4">
              <h4>Company</h4>
              <ul className="list-unstyled">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Jobs</a></li>
                <li><a href="#">Terms And Condition</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h4>Newsletter Signup</h4>
              <p>You will be among the first to know about hot new software and great deals on stuff to enhance and promote</p>
              <form action="#" method="post" className="subscribe-form wow animated fadeInUp">
                <div className="input-group">
                  <input type="email" className="form-control" placeholder="Enter Your Email..." />
                  <div className="input-group-append">
                    <button type="submit" className="btn btn-secondary">
                      <i className="fa fa-paper-plane fa-lg"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </footer>
      <section id="footer-bottom" className="bg-dark text-white">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <p className="text-center text-lg-left">
                COPYRIGHT © 2016, BLUE PRO | DIGITAL AGENCY
              </p>
            </div>
            <div className="col-md-6 text-right">
              <p className="text-center text-lg-left">
                Design and Developed By <a href="#">Themefisher</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;