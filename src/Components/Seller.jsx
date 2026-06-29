import {useState} from 'react';
import './Seller.css'
import axios from 'axios';
import { Link,NavLink } from 'react-router-dom';
import { getApiUrl } from '../api'

const Seller = () => {

  // const [title, setTitle] = useState('');
  // const [price, setPrice] = useState('');   
  // const [description, setDescription] = useState('');
  
  // const [deliveryDate, setDeliveryDate] = useState('');
  // const [rating, setrating] = useState('');

  // const handletitlechange=(event)=>{
  //   setTitle(event.target.value);
  // };
  // const handledescriptionchange=(event)=>{
  //   setDescription(event.target.value);
  // };
  // const handlepricechange=(event)=>{
  //   setPrice(event.target.value);
  // };
  // const handledatechange=(event)=>{
  //   setDeliveryDate(event.target.value);
  // };
  
  // const handleratingchange=(event)=>{
  //   setrating(event.target.value);
  // };
  // const handleupload=async(e)=>{
  //   e.preventDefault();
  //   const data={
  //     title: title,
  //     price: price,
  //     description: description,
  //     deliveryDate: deliveryDate,
  //     rating: rating
  //   }
  //   // console.log(data);
  //   const response=await axios.post('http://localhost:3000/api/amazon',data
  //   );
  //   console.log(response.data);
    
  // }

  const data={title:'',description:'',rating:'',price:'',deliveryDate:'',image:null};

  const [inputdata,setdata]=useState(data);

  const handledata=(e)=>{
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
    setdata({...inputdata,[e.target.name]:value})
  }

  const handleupload=(e)=>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', inputdata.title);
    formData.append('price', inputdata.price);
    formData.append('description', inputdata.description);
    formData.append('deliveryDate', inputdata.deliveryDate);
    formData.append('rating', inputdata.rating);
    if (inputdata.image instanceof File) {
      formData.append('image', inputdata.image);
    }

    axios.post(getApiUrl('/upload'), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response)=>{
      console.log(response)
    })
    .catch(err=>{
      console.log("STATUS:", err.response?.status);
      console.log("DATA:", err.response?.data);
      console.log(err);
    })

  }







  return (
    <div id="seller">
      <img src="Amazon-logo.png"  height="100px" width="200px"/>
      <form onSubmit={handleupload} id="sell">
        <h1>Sell Your Product</h1><br /><br />
        <label id="field" htmlFor='title'>Product Title</label>
        <input id="ext" type="text" name='title' onChange={handledata} value={inputdata.title} /><br />
        <label id="field" htmlFor='description'>Product description</label>
        <textarea name="description" id="desc" onChange={handledata} value={inputdata.description} ></textarea><br />
        <label id="field" htmlFor='price'>Price</label>
        <input id="ext" type="text" name='price' onChange={handledata} value={inputdata.price}/><br />
        <label id="field" htmlFor='rating'>Rating</label>
        <input id="ext" type="text" name='rating' onChange={handledata} value={inputdata.rating} /><br />
        <label id="field" htmlFor='deliveryDate'>When you can deliver</label>
        <input id="ext" type="date" name='deliveryDate' onChange={handledata} value={inputdata.deliveryDate}/><br />
        <label id="field" htmlFor='image'>Upload an image of Product:</label>
        <input id="ext" type="file" name='image' onChange={handledata} /><br />
        <button id="but" type="submit">Upload</button>
        
        

      </form>
    </div>
  )
}

export default Seller
