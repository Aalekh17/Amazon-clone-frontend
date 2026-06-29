import React from 'react'
import Cart from './Cart';
import Productcard from './Productcard';
import { Navigate } from 'react-router-dom';

const Cartrouter = ({usertype}) => {
  if (usertype === "buyer") {
      return <Cart />;
    } else if (usertype === "seller") {
      return <Productcard />;
    } else {
      return <Navigate to="/home" />;
    }
}

export default Cartrouter
