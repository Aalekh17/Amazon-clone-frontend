import React from 'react'
import './Orders.css'
import { Link,NavLink,useParams } from 'react-router-dom' 
import { useState, useEffect } from 'react'
import axios from 'axios'
import { getApiUrl, getImageUrl } from '../api'

const Orders = () => {

  const [orders,setorders]=useState([]);

  useEffect(()=>{
    axios.get(getApiUrl('/getorder'), {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
    .then((response)=>{
      setorders(response.data.buyed)
    })
    .catch((error)=>{
      console.log('error occured',error)
    })
  },[])

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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

  const handledelete = async (ordering) => {
    try {
      const response = await axios.delete(`http://localhost:3000/deleteorder/${ordering._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        // Refresh orders after successful deletion
        const ordersResponse = await axios.get(`http://localhost:3000/getorder`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setorders(ordersResponse.data.buyed);
      }
    } catch (error) {
      console.log('Error deleting order:', error);
    }
  }


  return (
    <div>
      <div id="mainer">
      <h1>Your Orders</h1>
      <div id="content">
      {orders.map((order)=>{
        return(
          
            <div id="ordercart">
        <div id="left2">
          <img src={getImageUrl(order.image)} alt={order.name} height="200px" width="200px" id="imager" />
        </div>
        <div id="right2">
          <p id="tit">{order.title}</p>
          <p id="rateee">₹{order.price}</p>
          <p id="par">Delivered on {formatDate(order.deliveryDate)}</p>
          {/* <NavLink to="/cart"><button id="but" type="button" onClick={()=>handlepost(order)}>Add to cart</button></NavLink> */}
          <button type="button" onClick={()=>handledelete(order)} id="but">Remove from Orders</button>
          
          

        </div>
      </div>
            
          
        

          
        )
      })}

      </div>
      
    </div>

    </div>
    
  )
}

export default Orders
