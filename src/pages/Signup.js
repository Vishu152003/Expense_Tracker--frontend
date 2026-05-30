import React, { useEffect, useState } from 'react'
import { axiosClient } from '../utils/axiosClient';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { useRef } from 'react';


function Signup() {
  document.title = 'SignUp'
  const navigate = useNavigate();
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [email , setEmail] = useState("");
  const ref = useRef(null);

  // pervent login again
  useEffect(()=>{
    if(localStorage.getItem("User"))
    {
      navigate("/");
    }
  },[navigate]);

  const submitForm =async (e)=>{
    e.preventDefault();
    try {
      ref.current.staticStart();
      await axiosClient.post('/auth/signup',{
        username,
       email,
       password
      });
      // console.log(response.data.message);
      toast.success("Registerd Successfully!!")
      ref.current.complete();
      navigate("/login");

    } catch (error) {
      console.log(error.message)
    }
  }



  return (
    <div className='bg-slate-800 min-h-screen w-full flex flex-col md:flex-row'>
      <LoadingBar color='orange' ref={ref}  ></LoadingBar>

      <div className='left w-full md:w-2/5 h-auto md:h-screen flex items-center justify-center p-6'>
        <h1 className='text-white font-thin w-full md:w-3/4 pl-0 md:pl-10 text-5xl sm:text-6xl md:text-7xl leading-tight relative whitespace-pre-wrap text-center md:text-left'>
          <span className='font-medium text-yellow-500'>Expense</span>
          <br />Tracker App!!
        </h1>
      </div>

      <hr className='w-0.5 h-0 md:h-3/4 bg-white hidden md:block' ></hr>

      <div className='flex justify-center items-center w-full md:w-3/5 h-auto md:h-screen p-6'>
        <div className='flex flex-col gap-7 w-full sm:w-3/5 md:w-3/5 h-auto pt-10 md:pt-20 items-center'>
          <h1 className='text-3xl sm:text-4xl text-white font-bold -top-10 relative'>SignUp</h1>
          <input placeholder='UserName' onChange={(e)=>setUsername(e.target.value)} className='w-full max-w-md h-12 pl-6 rounded-2xl transition-all outline-none focus:outline-2 focus:outline-white focus:outline-offset-4' ></input>
          <input placeholder='Email' onChange={(e)=>setEmail(e.target.value)} className='w-full max-w-md h-12 pl-6 rounded-2xl transition-all outline-none focus:outline-2 focus:outline-white focus:outline-offset-4' ></input>
          <input placeholder='Password' type='password' onChange={(e)=>setPassword(e.target.value)} className='w-full max-w-md h-12 pl-6 rounded-2xl outline-none transition-all focus:outline-2 focus:outline-white focus:outline-offset-4' ></input>
          <button onClick={submitForm} className='w-full max-w-md h-12 justify-center text-lg rounded-2xl bg-yellow-600 text-center flex items-center font-bold' >Submit</button>
          <p className='text-white text-sm sm:text-lg -mt-2 sm:-mt-4' >Already Registred!! ,<a href='/login' className='underline'>Login</a></p>
        </div>
      </div>
    </div>
  )
}

export default Signup