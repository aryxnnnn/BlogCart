import React from 'react'

import { useDispatch } from 'react-redux' 
import authService from '../appwrite/auth'
import { AuthActions } from '../store/authSlice'

function Logoutbtn() {

  const dispatch  = useDispatch() ; 

  const handlelogout = async () => {
    try {
      await authService.Logout();
      dispatch(AuthActions.logout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <button className=''>Logout</button> // not using the tailwind one 
    <button type="button" className="btn btn-primary hover:bg-blue-100" onClick={handlelogout}>Logout</button>
  )
}

export default Logoutbtn