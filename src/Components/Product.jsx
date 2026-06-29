import React, { useEffect, useState } from 'react'
import './Product.css'
import axios from 'axios';
import { Link,NavLink, useParams } from 'react-router-dom';
import { getApiUrl, getImageUrl } from '../api';


const Product = () =>{

  

  const params=useParams();
  const productdetail=params.productid;

  const [item,setitem]= useState([]);

  useEffect(() => {
    axios.get(getApiUrl(`/getprod/${productdetail}`))
    .then(
      (response)=>
        setitem(response.data)
      
    )
    .catch(error=>{
      console.log("Error fetching products:", error);
    })
  }, []);
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




  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  
  const handlepostfrommain=((product)=>{
    axios.post(getApiUrl('/postfrommain'),{
      
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

  return (
    <div>
      {[item].map((items)=>{
        return(
          <div id="card2">
          <div id="img">
            <img id="img" src={getImageUrl(items.image)}
      alt={items.name} height="400px" width="500px" />
          </div>
          <div id="details">
            <h2>{items.title}</h2>
            <br />
            <p>{items.description}</p>
            <br />
            <div id="rate">
              <img src="amazon-clone\star.webp" alt="star" height="15px" width="15px" />
              <p id="rating">{items.rating}</p>
            </div>
            <br />
            <h1> ₹{items.price}</h1>
          </div>
          <div id="buy">
          <p id="stock">In stock</p>
          <p id="del">Free Delivery: {formatDate(items.deliveryDate)}</p>
          <div id="sellerinfo">
            <p id="selltxt">Dispatched by: {items.seller?.firstname} {items.seller?.lastname}</p>
          <p id="selltxt">Email Id: {items.seller?.email}</p>
          <p id="selltxt">Address: {items.seller?.city}, {items.seller?.pincode}</p>
          </div>
          <div id="quant">
            <p id="txt">Quantity</p>
            <select name="quantity" id="quan">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <NavLink to="/cart">
            <button id="but" type="button" onClick={()=>{handlepostfrommain(items)}}>Add to Cart</button>
          </NavLink>
          <NavLink to="/orders"><button id="but2" type="button" onClick={()=>handlesubmit(items)}>Buy Now</button></NavLink>
          </div>
        </div>
        )
      })}
        
    </div>
  )
}

export default Product
