import React from 'react'
import Orders from './Orders';
import Productcard from './Productcard';
import { Navigate } from 'react-router-dom';

const Orderrouter = ({usertype}) => {
  
      if (usertype === "buyer") {
    return <Orders />;
  } else if (usertype === "seller") {
    return <Productcard />;
  } else {
    return <Navigate to="/home" />;
  }
}

export default Orderrouter
