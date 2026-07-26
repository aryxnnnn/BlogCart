import React from "react";
import Logoutbtn from "./Logoutbtn";
import Container from "./Container";
import Logo from "./Logo";
import authService from "../appwrite/auth";
import { AuthActions } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";


function Header() {

  const authStatus = useSelector((state)=> state.auth.Status)
  const navigate = useNavigate()
  const navItems = [
    { 
      name : "Home" , 
      slug : "/" , 
      active : true , 
    } ,
    { 
      name : "Login" , 
      slug : "/login" , 
      active : !authStatus , 
    } ,
    { 
      name : "Signup" , 
      slug : "/signup" , 
      active : !authStatus , 
    } ,
    { 
      name : "All Posts" , 
      slug : "/all-posts" , 
      active : authStatus , 
    } ,
    { 
      name : "Add Post" , 
      slug : "/add-post" , 
      active : authStatus , 
    } ,
    { 
      name : "Logout" , 
      slug : "/add-post" , 
      active : authStatus , 
    } ,
  ]

  return <div className="pt-[10px] shadow bg-gray-500">
    <Container>
      <nav className="flex">
        <div className="mr-4">
          <Link to ='/' className=" text-black text-decoration-none ">
            <Logo className="w-[70px] mx-2 "></Logo>
          </Link>
        </div>
        <ul className="flex ml-auto">
          {navItems.map((item)=>
            item.active ? <li key={item.name} className="mr-[10px]">
              <button onClick={() => navigate(item.slug)} className="btn btn-primary hover:bg-blue-300">{item.name}</button>
            </li> : null
          )}
        </ul>
        {authStatus &&(
          <li>
            <button onClick={() => navigate(item.slug)} className="btn btn-primary hover:bg-blue-300">Logout</button> 
            {/* // not sure about the navigate , it has to take us back to login page  */}
          </li>
        )}
      </nav>
    </Container>
  </div>;
}

export default Header;
