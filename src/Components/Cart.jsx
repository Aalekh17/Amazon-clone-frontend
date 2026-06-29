import React, { useEffect, useState } from 'react'
import './Cart.css'
import axios from 'axios'
import { Link,NavLink, useParams } from 'react-router-dom';
import { getApiUrl, getImageUrl } from '../api';

const Cart = () => {

  const [cartitem,setcartitem]=useState([]);
  const [sum,setsum]=useState(0);

  useEffect(() => {
    axios.get(getApiUrl('/getcarttotal'),{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }})
    .then(
      (response)=>{
        console.log(response)
        setsum(response.data)
      
   })
    .catch(error=>{
      console.log("Error fetching total:", error);
    })
  }, []);

  useEffect(()=>{
    axios.get(getApiUrl('/getfav'),{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response)=>{
      setcartitem(response.data.cart)
    })
    .catch((error)=>{
      console.log('error occured',error)
    })
  },[])

  const token=localStorage.getItem('token');

  const handlesubmit=((product)=>{
    axios.post(getApiUrl('/postorder'),{
      
      
      id:product._id

    },{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }

    )
    .then(response=>{
      alert('added to orders')
    })
    .catch(error=>{
      console.log(error)
      alert('fail to add')
    })

  })

  const handledeletecart = async (carten) => {
    try {
      const response = await axios.delete(getApiUrl(`/deletecart/${carten._id}`), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log("Delete response:", response.data);
      
      if (response.data.success) {
        // Refresh cart items after successful deletion
        const cartResponse = await axios.get(getApiUrl('/getfav'), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setcartitem(cartResponse.data.cart);
      }
    } catch (error) {
      console.log('Error deleting cart item:', error);
    }
  }



  return (
    <div>
    
    <div id="mained">
      <h1>Shopping Cart</h1>
      <h2 style={{ color: 'red' }}>Cart Total Price: ₹{sum}</h2>
      {cartitem.map((carti)=>{
      return(
      <div id="cartcard">
        <div id="left1">
          <img src={getImageUrl(carti.image)}
      alt={carti.name} height="250px" width="250px" id="imager"/>

        </div>
        
              <div id="right">
          
              <p id="tit">{carti.title}</p>
              <p id="st">In Stock</p>
              <p id="rateee">₹{carti.price}</p>
              <NavLink to="/orders"><button id="but2" type="button" onClick={()=>handlesubmit(carti)}>Buy Now</button></NavLink>
              <button id="but" type="button" onClick={()=>handledeletecart(carti)}>Remove from Cart</button>

              </div>
            

        
      </div>
      )

            

    })}
      
    </div>
    
    </div>
          
  )
}

export default Cart
