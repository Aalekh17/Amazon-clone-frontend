import React, { useEffect } from 'react'
import './Nav.css'
import {Link,NavLink, useNavigate} from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import axios from 'axios';
import { getApiUrl } from '../api';

const Nav = () => {
  const [usertype,setusertype]=useState('')

  const [isloggedin,setisloggedin]=useState(false);
  const [name,setname]=useState('');
  const [city,setcity]=useState('');
  const [pincode,setpincode]=useState('');
  const [size,setsize]=useState(0);

  useEffect(() => {
    axios.get(getApiUrl('/getcartsize'),{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }})
    .then(
      (response)=>{
        console.log(response)
        setsize(response.data)
      
   })
    .catch(error=>{
      console.log("Error fetching size:", error);
    })
  }, []);


  

    useEffect(()=>{
      const tokener=localStorage.getItem('token');
      let decoded=null;
      if(typeof (tokener) === 'string' && tokener.trim()!==''){
        decoded=jwtDecode(tokener);
      console.log(decoded);
      
      if(tokener){

      setisloggedin(true);
      setcity(decoded.city)
      setname(decoded.name)
      setpincode(decoded.pincode)
      if(decoded.type==='buyer'){
        setusertype('buyer')
      }
      else{
        setusertype('seller')
      }
      

      }
      else{
        console.log('no valid token')
      }
      
      


    }
    

    },[])
  const navigate=useNavigate();

  const handleclick=(e)=>{
    localStorage.removeItem('token');
    console.log('token removed');
    navigate('/login');

  }
  return(
    
    
    <div>
      
      {!isloggedin && (
        <div id="nav">
      <div id="amazon"><NavLink to="/home"><img height="60px" src="cb668cd9b0bf1220046193aa966a19cc.jpg" alt="logo" /></NavLink></div>
      <div id="loc">
        <div><img height="30px" width="30px" src="OIP.webp"/></div>
        <div>
          <div><p id="location">Deliver to Guest</p></div>
        <div><p id="location">Update your Location</p></div>

        </div>
         

      </div>
      <div id="field">
        <div >
          <select name="category" id="category">
          <option value="">All categories</option>
          <option value="">Alexa skills</option>
          <option value="">Amazon Devices</option>
          <option value="">Amazon Fashion</option>
          <option value=""> Apps and Games</option>
          <option value="">Computer and Accessiories</option>
        </select>
          </div>
          <div>
            <input id="search" type="text" />

          </div>
          <div>
            <button><img height="30px" width="30px" src="logo.jpg"/></button>
          </div>
        
      </div>
      <div id="india">
        <div>
        <img src="R.png" height="15px" width="20px"/>
      </div>
      <div>
        <select name="language" id="language">
          <option value="">English</option>
          <option value="">Hindi</option>
          <option value="">French</option>
          <option value="">Spanish</option>
          <option value=""> Dutch</option>
          <option value="">Arabic  </option>
        </select>

      </div>
      </div>

     
      
      <div>
        <p id="hello">Hello,Guest</p>
        <a id="login" href="/login">Account & Lists</a>
      </div>
      {/* <div><a id="lo" href="/orders"><p id="sm">Returns</p><p id="la">& Orders</p></a></div> */}
      <div id="cartdiv"><img src="cart.avif" height="60px" width="60px" />
      <div id="gap"><p id="cart">Cart</p> <div><p id="num">X</p></div></div></div>
    </div>
      )}
      {isloggedin && usertype==="buyer"?(
        <div id="nav">
      <div id="amazon"><NavLink to="/home"><img height="60px" src="cb668cd9b0bf1220046193aa966a19cc.jpg" alt="logo" /></NavLink></div>
      <div id="loc">
        <div><img height="30px" width="30px" src="OIP.webp"/></div>
        <div>
          <div><p id="location">Deliver to {name}</p></div>
        <div><p id="location">{city}-{pincode}</p></div>

        </div>
         

      </div>
      <div id="field">
        <div >
          <select name="category" id="category">
          <option value="">All categories</option>
          <option value="">Alexa skills</option>
          <option value="">Amazon Devices</option>
          <option value="">Amazon Fashion</option>
          <option value=""> Apps and Games</option>
          <option value="">Computer and Accessiories</option>
        </select>
          </div>
          <div>
            <input id="search" type="text" />

          </div>
          <div>
            <button><img height="30px" width="30px" src="logo.jpg"/></button>
          </div>
        
      </div>
      <div id="india">
        <div>
        <img src="R.png" height="15px" width="20px"/>
      </div>
      <div>
        <select name="language" id="language">
          <option value="">English</option>
          <option value="">Hindi</option>
          <option value="">French</option>
          <option value="">Spanish</option>
          <option value=""> Dutch</option>
          <option value="">Arabic  </option>
        </select>

      </div>
      </div>

     
      
      <div>
        <p id="hello">Hello,{name}</p>
        <button id="log" onClick={handleclick}>Logout</button>
      </div>
      <div><a id="lo" href="/orders"><p id="sm">Returns</p><p id="la">& Orders</p></a></div>
      <div id="cartdiv"><img src="cart.avif" height="60px" width="60px" />
      <div id="gap"><NavLink to="/cart" id="cart">Cart</NavLink> <div><p id="num">{size}</p></div></div></div>
    </div>

      ):(isloggedin && (
        <div id="nav">
      <div id="amazon"><NavLink to="/home"><img height="60px" src="cb668cd9b0bf1220046193aa966a19cc.jpg" alt="logo" /></NavLink></div>
      <div id="loc">
        <div><img height="30px" width="30px" src="OIP.webp"/></div>
        <div>
          <div><p id="location">Dispatched from {name}</p></div>
        <div><p id="location">{city}-{pincode}</p></div>

        </div>
         

      </div>
      <div id="field">
        <div >
          <select name="category" id="category">
          <option value="">All categories</option>
          <option value="">Alexa skills</option>
          <option value="">Amazon Devices</option>
          <option value="">Amazon Fashion</option>
          <option value=""> Apps and Games</option>
          <option value="">Computer and Accessiories</option>
        </select>
          </div>
          <div>
            <input id="search" type="text" />

          </div>
          <div>
            <button><img height="30px" width="30px" src="logo.jpg"/></button>
          </div>
        
      </div>
      <div id="india">
        <div>
        <img src="R.png" height="15px" width="20px"/>
      </div>
      <div>
        <select name="language" id="language">
          <option value="">English</option>
          <option value="">Hindi</option>
          <option value="">French</option>
          <option value="">Spanish</option>
          <option value=""> Dutch</option>
          <option value="">Arabic  </option>
        </select>

      </div>
      </div>

     
      
      <div>
        <p id="hello">Hello,{name}</p>
        <button id="log" onClick={handleclick}>Logout</button>
      </div>
      <div><a id="lo" href="/sell"><p id="sm">Sell</p><p id="la">your Product</p></a></div>
      
    </div>
      )
      )}
    </div>
    
  )
}

export default Nav
