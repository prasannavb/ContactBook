import { Link, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';

//CSS
import './SignUp.css';

const SignUp = () => {

    const [formData,setFormData]=useState({name:'',email:'',password:''})
    const [Errmsg,setErrMsg]=useState({nameErr:'',emailErr:'',passwordErr:''})
    const navigate=useNavigate()

    useEffect(() => {
        AOS.init({
            duration:2000, // Animation duration in milliseconds
        });
    }, []);


    const formDataChange=(e)=>
    {   
        const {name,value}=e.target
        setFormData({...formData,[name]:value.trim()})
    }

    const SignUp = async () => {
        try {
            const { data } = await axios.post("http://localhost:8080/signup", formData);
            alert(data.message)
            navigate('/')
        } catch (error) {
            console.error("Login Failed:", error);
            if (error.response) {
                console.error("Error Response:", error.response.data);
            } else if (error.request) {
                console.error("No Response:", error.request);
            } else {
                console.error("Error Message:", error.message);
            }
            alert('Error in account creation')
        }
    };
    

    const validateForm=async()=>
    {
        if(formData.name==null || formData.name=='')
        {
            setErrMsg((prev)=>({...prev,nameErr:'Enter your name'}))
        }
        else
        {
            setErrMsg((prev)=>({...prev,nameErr:''}))
        }
        if(formData.email==null || formData.email=='')
        {
            setErrMsg((prev)=>({...prev,emailErr:'Enter your email address'}))
        }
        else if(!formData.email.includes("@gmail.com"))
        {
            setErrMsg((prev)=>({...prev,emailErr:'Enter a valid email address'}))
        }
        else
        {
            setErrMsg((prev)=>({...prev,emailErr:''}))
        }
        if(formData.password==null || formData.password=='')
        {
            setErrMsg((prev)=>({...prev,passwordErr:'Enter your password'}))
        }
        else
        {
            setErrMsg((prev)=>({...prev,passwordErr:''}))
        }

        if(formData.name!=null & formData.name!='' && formData.email!=null && formData.email!='' && formData.email.includes("@gmail.com") && formData.password!=null && formData.password!='')
        {
            SignUp()
        }
    }


    return (
        <div className="SignUp-container" >
            <div className="SignUp-form"  data-aos="zoom-in-up">
                <div className="SignUp-section-left">
                    <div className="SignUp-navbar">
                        <img
                            src="https://cdn3d.iconscout.com/3d/premium/thumb/book-reading-schedule-3d-icon-download-in-png-blend-fbx-gltf-file-formats--study-learning-studying-school-and-education-pack-stationary-icons-7864745.png?f=webp"
                            alt="Logo"
                        />
                        <h4>Contact Book</h4>
                    </div>

                    <div className="SignUp-content">
                        <h1>Create your account</h1>
                        <p>Please Enter your details</p>
                        <div>
                            <label htmlFor="name">Name</label>
                            <br />
                            <input type="text" name="name" onChange={formDataChange}  />
                            <br />
                            <span className='SignUp-error'>{Errmsg.nameErr}</span>
                        </div>
                        <div>
                            <label htmlFor="email">Email address</label>
                            <br />
                            <input type="email" name="email" onChange={formDataChange}  />
                            <br />
                            <span className='SignUp-error'>{Errmsg.emailErr}</span>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <br />
                            <input type="password" name="password" onChange={formDataChange} />
                            <br />
                            <span className='SignUp-error'>{Errmsg.passwordErr}</span>
                        </div>
                        <div className='Signup-btns'>
                            <button onClick={validateForm} >SignUp</button>
                        </div>
                        <div className='Signup-btns'>
                            <span>
                                Already have an account? <Link to="/">Login</Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="SignUp-section-right">
                    <img
                        src="https://cdn3d.iconscout.com/3d/premium/thumb/contact-book-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--phonebook-contacts-communication-user-interface-pack-illustrations-4352344.png"
                        alt="Illustration"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
