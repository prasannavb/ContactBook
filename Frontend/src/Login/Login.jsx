//Dependencies
import { Link, useNavigate } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import axios from 'axios';

//CSS
import './Login.css';

//Image
import contactLogo from "../assets/contactLogo.webp"
import contactBook from "../assets/contactBook.webp"

const Login = () => {

    const [formData,setFormData]=useState({email:'',password:''})
    const [Errmsg,setErrMsg]=useState({emailErr:'',passwordErr:''})
    const navigate=useNavigate()


    const formDataChange=(e)=>
    {   
        const {name,value}=e.target
        setFormData({...formData,[name]:value.trim()})
    }
    useEffect(() => {
        AOS.init({
            duration:2000, // Animation duration in milliseconds
        });
    }, []);

    const LogIn = async () => {
        try {
            const { data } = await axios.post("http://localhost:8080/login", formData);
            sessionStorage.setItem("userId",data.id)
            navigate('/Home')
            
        } catch (error) {
            console.error("Login Failed:", error);
            if (error.response) {
                console.error("Error Response:", error.response.data);
            } else if (error.request) {
                console.error("No Response:", error.request);
            } else {
                console.error("Error Message:", error.message);
            }
        }
    };
    

    const validateForm=async()=>
    {
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

        if(formData.email!=null && formData.email!='' && formData.email.includes("@gmail.com") && formData.password!=null && formData.password!='')
        {
            LogIn()
        }
    }


    return (
        <div className="Login-container">
            <div className="Login-form" data-aos="zoom-in-up">
                <div className="Login-section-left">
                    <div className="Login-navbar">
                        <img
                            src={contactLogo}
                            alt="Logo"
                        />
                        <h4>Contact Book</h4>
                    </div>

                    <div className="Login-content">
                        <h1>Welcome back!</h1>
                        <p>Please Enter your details</p>
                        <div>
                            <label htmlFor="email">Email address</label>
                            <br />
                            <input type="email" name="email" onChange={formDataChange}  />
                            <br />
                            <span className='Login-error'>{Errmsg.emailErr}</span>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <br />
                            <input type="password" name="password" onChange={formDataChange} />
                            <br />
                            <span className='Login-error'>{Errmsg.passwordErr}</span>
                        </div>
                        <div className='Login-btns'>
                            <button onClick={validateForm} >Login</button>
                        </div>
                        <div className='Login-btns'>
                            <span>
                                Don't have an account? <Link to="/signup">Sign Up</Link>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="Login-section-right">
                    <img
                        src={contactBook}
                        alt="Illustration"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
