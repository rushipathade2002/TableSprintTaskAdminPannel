import React, { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./store/Auth";
import logo from "../assets/imges/logo.jpg"


const URL = 'http://localhost:5000/api/auth/login';

export const Login = () => {
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();
  const [ user, setUser ] = useState({
    email:"",
    password:"",
  });

  const [ passwordVisible, setPasswordVisible ] = useState(false);

  const handleInput = (e)=>{
    let name = e.target.name;
    let value = e.target.value;
    setUser({
        ...user,
        [name]:value,
    })
  }

  const handleSubmit =async (e)=>{
    e.preventDefault();
    try {
        
          const response = await fetch(URL,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user),
        })

        console.log("login form", response);
        const res_data=await response.json();

        if(response.ok){
            // store the token in localstorage
            storeTokenInLS(res_data.token);
            toast.success("Login successful");
            // navigate to home page
            navigate("/Home");
            setUser({email:"",password:""});
            
        }else{
            toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        }
    } catch (error) {
        console.log("login : ",error);
    }
 }

 

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="title"> <img src={logo} className='loginLogo' alt="logo" /> </h2>
        <p className="subtitle">Welcome to TableSprint admin</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input 
                type="email" 
                placeholder="E-mail id" 
                name ="email"
                required 
                id='username'
                value={user.email}
                onChange={handleInput}
            />
          </div>
          <div className="input-group">
            <input
                type={passwordVisible ? 'text' : 'password'}
                id='password'
                autoComplete='off'
                name='password'
                placeholder="Password"
                required
                value={user.password}
                onChange={handleInput}
            />
            <span onClick={togglePasswordVisibility} className="password-toggle-icon">
              {passwordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
          <div className="forgot-password">
            <NavLink to={"/forgot-password"}>Forgot Password?</NavLink>
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>
      </div>
    </div>
  );
};

