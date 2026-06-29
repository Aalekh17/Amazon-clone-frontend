import React from 'react'
import './Login.css'
import { useState } from 'react'
import axios from 'axios'
import {Link,NavLink, useNavigate} from 'react-router-dom'
import Productcard from './Productcard'
import { getApiUrl } from '../api'

const Login = () => {

  
  const navigate=useNavigate();


  const data={email:'',password:'',usertype:''}

  const [logined,setlogin]=useState(data);

  const handledata=(e)=>{
    setlogin({...logined,[e.target.name]:e.target.value})
  }


  const handlelogin=(e)=>{
    e.preventDefault();
    axios.post(getApiUrl('/postlogindata'),logined).then((res)=>(console.log(res.data),
  localStorage.setItem('token',res.data.token)))
    .catch(error=>console.log('error occured',error))
    

  }

  

  

  return (
    <div>
      <div>
        <div id="login">
        <img height="100px" width="200px" src="Amazon-Logo.png" />
        <form onSubmit={handlelogin}>
        <div id="card1">
          <h2 id="head">Sign in or create account</h2><br />
          
          
            <label htmlFor='email' id="mobile">Enter your email</label><br />
          <input id="input" name="email" onChange={handledata} type="email" /><br />
          <label htmlFor='password' id="mobile">Password</label><br />
          <input id="input" name="password" type="password" onChange={handledata} /><br />
          <div>
            <p id="mobile">Are you seller or Buyer?</p><br />
            <div id="side"><input type="radio" name="usertype" id="buyer" value="buyer" 
            onChange={handledata}/>
          <label htmlFor='buyer' id="txtx">Buyer</label></div>

          <div id="side"><input value="seller" id="seller" type="radio" name="usertype"  
          onChange={handledata}/>
          <label htmlFor="seller" id="txtx">Seller</label></div>
          </div><br />
          <button id="but"  type="submit" >Sign In</button>
            
          <br />
          
          <p id="text">By continuing,you agree to Amazon's </p>
          <div id="another">
            <a id="link" href="/conditions">Conditions of Use</a><p id="text">and </p><a id="link" href="/privacy">Privacy Notice</a>
            </div><br />
          <div id="another"><p id="text">Don't have an account?</p><a id="link" href="/signup">Register</a></div>
        </div>
        </form>
        

      </div>

      </div>
      <div id="foot">
        <div id="foothead">
        <div><a id="link" href="/conditions">Conditions of use</a></div>
        <div><a id="link" href="/privacy">Privacy Notice</a></div>
        <div><a id="link" href="/help">Help</a></div>
        </div>
        <div>
          <p>© 1996–2025, Amazon.com, Inc. or its affiliates</p>

        </div>

      </div>
      
        
      
      
      
    </div>
  )
}

export default Login
