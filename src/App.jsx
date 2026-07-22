import { useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import authService from './appwrite/auth'
import { AuthActions } from './store/authSlice';

import './App.css'


function App() {

  console.log(import.meta.env.VITE_APPWRITE_URL) ; 

  const [Loading , setLoading] = useState(true)
  const dispatch = useDispatch() ; 

  useEffect(()=>{
    if(!Loading) return ; 
    setLoading(false) ; 

    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(AuthActions.login({userData})) 
      }
      else{
        dispatch(AuthActions.logout()) 
      }
    })

  } , [])

  return (
    <>
      <div className='bg-slate-600 text-white'> A blog application with AppWrite </div>
    </>
  )
}

export default App
