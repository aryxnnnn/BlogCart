import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../appwrite/auth";
import  {AuthActions}  from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Logo from "./Logo";
import Input from "./input";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [Error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.Login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(AuthActions.login(userData)) ; 
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center mx-[25%]">
      <div className="mx-auto w-full w-max-lg bg-gray-100 rounded-xl p-10 border border-slate-800 mt-7 shadow-xl ">
        <div className="mb-2 flex justify-center">
          {/* <span className="inline-block w-full w-max-[100px]">
            <Logo width="100%"></Logo>
          </span> */}
        </div>

        <h2 className="leading-tight text-center font-bold text-2xl">
          Sign in to your Account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don't have a account ?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {Error && <p className="text-red-500 text-center">{Error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="s-y-5">
            <Input
              className="mb-4"
              label="Email:"
              placeholder="Enter your mail"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid Email Address",
                },
              })}
            />
            <Input
              className="mb-4"
              label="Passowrd"
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <button type="submit"  className="btn btn-primary w-full">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
