import React from 'react'
import './Productcard.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link,NavLink } from 'react-router-dom';
import { getApiUrl, getImageUrl } from '../api';


const Productcard = () => {

  const [pro,setpro]= useState([]);
  useEffect(()=>{
    axios.get(getApiUrl('/getprod'))
    .then((response)=>{
      console.log(response)
      setpro(response.data)
    })
  },[])
  const token=localStorage.getItem('token');

  const handlepost=((product)=>{
    axios.post(getApiUrl('/postfav'),{
      
      id:product._id

    },{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    .then(response=>{
      alert('added to cart')
    })
    .catch(error=>{
      console.log(error)
      alert('fail to add')
    })

  })

  

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };


  return (
    <div id="ma">
      <div>
      
        {pro.map((pros) => {
          return(
            <div id="card5">
              <div id="left">
          <img id="image" src={getImageUrl(pros.image)}
      alt={pros.name}/>

        </div>
        
        <div id="right">
          <p id="tit">{pros.title}</p>
          <div id="star">
            <img src="star.webp" alt='star' height="15px" width="15px" />
           <p id="rat">{pros.rating}</p>

          </div>
          <p id="rupee">₹{pros.price}</p>
          <p id="cal"> Free Delivery: {formatDate(pros.deliveryDate)}</p>
          <p id="cal">Dispatched by: {pros.seller?.firstname} {pros.seller?.lastname}</p>
          <NavLink to="/cart"><button id="but" type="button" onClick={()=>handlepost(pros)}>Add to cart</button></NavLink>
          <NavLink to={`/product/${pros._id}`}><button id="but">Details</button></NavLink>
          

        </div>

            </div>
        )
        })}
        </div>
      
      
      
    </div>
  )
}

export default Productcard
