import React from 'react'

import './Signup.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getApiUrl } from '../api'


const Signup = () => {

  const navigate=useNavigate();

  const da={firstname:'',lastname:'',email:'',password:'',confirmpassword:'',city:'',pincode:'',usertype:''}

  const [data,setdata]=useState(da);

  const handledata=(e)=>{
    setdata({...data,[e.target.name]:e.target.value})
  }


  const handlesignup=(e)=>{
    e.preventDefault();
    axios.post(getApiUrl('/postuserdata'),data).then((res)=>console.log(res.data))
    .catch(error=>console.log('error occured',error))

  }

  const handleclick=()=>{
    navigate('/login');
  }

  return (
    <div>
      <div>
        <div id="login">
        <img height="100px" width="200px" src="Amazon-Logo.png" />
        <form onSubmit={handlesignup}>
        <div id="card">
          <h2 id="head">Create your account</h2><br />
          
          <label id="mobile" htmlFor='firstname'>First Name</label><br />
          <input id="input" type="text" name="firstname" onChange={handledata} value={data.firstname} /><br />
          <label id="mobile" htmlFor='lastname'>Last Name</label><br />
          <input id="input" type="text" name="lastname" onChange={handledata} value={data.lastname}/><br />
          <label id="mobile" htmlFor='email'>Enter your email</label><br />
          <input id="input" type="email" name="email"  onChange={handledata} value={data.email}/><br />
          <label id="mobile" htmlFor='city'>City Name</label><br />
          <input id="input" type="text" name="city" onChange={handledata} value={data.city}/><br />
          <label id="mobile" htmlFor='pincode'>Pincode</label><br />
          <input id="input" type="number" name="pincode" onChange={handledata} value={data.pincode}/><br />
          <label id="mobile" htmlFor='password'>Create a Password</label><br />
          <input id="input" type="password" name="password" onChange={handledata} value={data.password}/><br />
          <label id="mobile" htmlFor='confirmpassword'>Confirm Password</label><br />
          <input id="input" type="password" name="confirmpassword" onChange={handledata} value={data.confirmpassword}/><br />
          <div>
            <p id="mobile">Are you seller or Buyer?</p><br />
            <div id="side"><input type="radio" name="usertype" id="buyer" value="buyer" 
            onChange={handledata}/>
          <label htmlFor='buyer' id="txtx">Buyer</label></div>

          <div id="side"><input value="seller" id="seller" type="radio" name="usertype"  
          onChange={handledata}/>
          <label htmlFor="seller" id="txtx">Seller</label></div>
          </div><br />
          

          <button id="but" type="submit" onClick={handleclick}>Continue</button><br />
          
          
          
            <p id="text">By continuing,you agree to Amazon's </p>
            <div id="terms">
              <a id="link" href="/conditions">Conditions of Use</a><p id="text">and </p><a id="link" href="/privacy">Privacy Notice</a>
          </div><br />
          
          <div id="another"><p id="text">Already have an account?</p><a id="link" href="/login">Login</a></div>
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

export default Signup
