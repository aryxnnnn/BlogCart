import React from 'react'

import { useDispatch } from 'react-redux' 
import authService from '../appwrite/auth'
import { AuthActions } from '../store/authSlice'

function Logoutbtn() {

  const dispatch  = useDispatch() ; 

  const handlelogout = () =>{
    authService.Logout()
    .then(()=>{
      dispatch(AuthActions.logout())
    })
  }

  return (
    // <button className=''>Logout</button> // not using the tailwind one 
    <button type="button" class="btn btn-primary hover:bg-blue-100" onClick={handlelogout}>Logout</button>
  )
}

export default Logoutbtn