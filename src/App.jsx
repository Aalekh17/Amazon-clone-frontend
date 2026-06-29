import { useEffect, useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './Components/Nav.jsx'
import Login from './Components/Login.jsx'
import Signup from './Components/Signup.jsx'
import Product from './Components/Product.jsx'
import Seller from './Components/Seller.jsx'
import Productcard from './Components/Productcard.jsx'
import Cart from './Components/Cart.jsx'   
import Orders from './Components/Orders.jsx'
import Protectedroute from './Components/Protectedroute.jsx'
import axios from 'axios'
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Sellrouter from './Components/Sellrouter.jsx'
import Cartrouter from './Components/Cartrouter.jsx'
import Orderrouter from './Components/Orderrouter.jsx'







function App() {
  const [usertype,setusertype]=useState('')

  const [isloggedin,setisloggedin]=useState(false);

  const [loading,setloading]=useState(true);

    useEffect(()=>{
      const tokener=localStorage.getItem('token');
      if(typeof (tokener) === 'string' && tokener.trim()!==''){
        const decoded=jwtDecode(tokener);
      console.log(decoded);
      if(tokener){
      setisloggedin(true);
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
    setloading(false)

    },[])

  return (
    
      <Router>
      <div>
        <Nav isloggedin={isloggedin} usertype={usertype}/>
        {loading?(
          <div>Loading...</div>
        ):(
          <Routes>
        <Route path="/home" element={<Productcard/>}/>
        <Route path="/product/:productid" element={<Product/>}/>
          <Route path="*" element={<h1>error 404 page not found</h1>}/>

        
          {!isloggedin ? (
  <>
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Navigate to="/home" />} />
  </>
) : (
  <Route element={<Protectedroute />}>
    <Route path="/signup" element={<Navigate to="/" />} />
    <Route path="/login" element={<Navigate to="/" />} />
    <Route path="/" element={<Navigate to="/home" />} />

    <Route path="/cart" element={<Cart />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/sell" element={<Seller />} />
  </Route>
)}
          
          
          
        </Routes>
        )}
      </div>

      {/* <RouterProvider router={router} /> */}
      
    </Router>

    
    
  )
}

export default App
