import React from 'react'
import Productcard from './Productcard';
import Seller from './Seller';
import { Navigate } from 'react-router-dom';

const Sellrouter = ({usertype}) => {
  console.log(`usertype:"${usertype}"`);
  if(!usertype)return <div>Loading...</div>
  if (usertype === "buyer") {
    return <Productcard />;
  } else if (usertype === "seller") {
    return <Seller/>;
  } else {
    return <Navigate to="/home" />;
  }
}

export default Sellrouter
