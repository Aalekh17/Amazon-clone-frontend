import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Protectedroute = () => {
  const tokener = localStorage.getItem('token');
  let isloggedin = false;

  if (typeof tokener === 'string' && tokener.trim() !== '') {
    try {
      const decoded = jwtDecode(tokener);
      if (decoded) {
        isloggedin = true;
      }
    } catch (error) {
      console.log('Invalid token:', error);
    }
  }

  return isloggedin ? <Outlet /> : <Navigate to="/login" />
}

export default Protectedroute


