import React from 'react'
import { useState } from 'react'
import '../assets/css/style.css'
import yourImage from '../assets/images/asian_farmers_03.jpg'
import { Link, useNavigate } from 'react-router-dom'

export default function UserSignup() {

    const backgroundStyle = {
        backgroundImage: `url(https://t3.ftcdn.net/jpg/05/77/91/88/240_F_577918823_Du0k5gFpLtUROvvJKRrZmK7hdnyhl6en.jpg)`, // Replace 'your-image-url.jpg' with the actual URL of your image
        backgroundSize: 'cover', // Adjust as needed
        backgroundPosition: 'center', // Adjust as needed
        backgroundRepeat: 'no-repeat' // Adjust as needed
      };

    const [credentials, setcredentials] = useState({ user_name: "", email: "", password: "", user_type: "" })
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_name: credentials.user_name,
                email: credentials.email,
                password: credentials.password,
                user_type: credentials.user_type
            })
        });

        const json = await response.json()//body se response mila hai

        if(json == "Email Already Registered"){
            alert("Email already registered")
        }
        else if (!json.success) {//value is false
            console.log(json);
            alert("enter valid credentials")
        }
        // document.location.reload();
        else{
            navigate('/login')
        }   
    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <>
            {/* <div className="main">
                <section className="signup">
                    <div className="container">
                        <div className="signup-content">
                            <div className="signup-form">
                                <h2 className="form-title">Sign Up</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label for="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                        <input type="text" name="user_name" id="name" placeholder="Your Name" value={credentials.user_name} onChange={onChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label for="email"><i className="zmdi zmdi-email"></i></label>
                                        <input type="email" name="email" id="email" placeholder="Your Email" value={credentials.email} onChange={onChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label for="pass"><i className="zmdi zmdi-lock"></i></label>
                                        <input type="password" name="password" id="pass" placeholder="Password" value={credentials.password} onChange={onChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="country">
                                            <i className="zmdi zmdi-globe"></i>
                                        </label>
                                        <select id="usertype" name="usertype" value={credentials.user_type} onChange={onChange}>
                                            <option value="Farmer">Farmer</option>
                                            <option value="Expert">Expert</option>
                                        </select>
                                    </div>
                                    <div className="form-group form-button">
                                        <input type="submit" name="signup" id="signup" className="form-submit" value="Register" />
                                    </div>
                                </form>
                            </div>
                            <div className="signup-image" style={{ width: '100%', maxWidth: '500px' }}>
                                <figure><img src={yourImage} alt="sing up image" /></figure>
                                <Link to="/login" className="signup-image-link">I am already member</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div> */}

            <section className="vh-100" style={{ ...backgroundStyle}}>
                <div className="h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-7">
                            <div className="card text-black" style={{ borderRadius: '25px' }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-5 col-xl-4 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form onSubmit={handleSubmit} className="mx-1 mx-md-4" style={{ width: '100%' }}>

                                                <div className="d-flex flex-row align-items-center mb-4" >
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" name="user_name" id="name" className="form-control" placeholder="Your Name" value={credentials.user_name} onChange={onChange} />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="email" name="email" id="email" className="form-control" placeholder="Your Email" value={credentials.email} onChange={onChange} />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" name="password" id="password" className="form-control" placeholder="Your Password" value={credentials.password} onChange={onChange} />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <select className="form-control" name="user_type" id="user_type" value={credentials.user_type} onChange={onChange} style={{ width : '100%'}}>
                                                            <option value="">Select Role</option>
                                                            <option value="Farmer">Farmer</option>
                                                            <option value="Expert">Expert</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <input type="submit" class="btn btn-secondary btn-lg" value="Signup" />
                                                </div>
                                                <Link to="/login" className="signup-image-link">Already user</Link>
                                            </form>
                                            {/* <Link to="/" className="text-secondary">Login as Admin</Link> */}

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2" style={{ width: '80%', maxWidth: '500px' }}>

                                            <img src={yourImage} alt=""/>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}