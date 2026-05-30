import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {BsSendFill} from 'react-icons/bs'
import { sendEmail } from '../utils/renders';
import LoadingBar from 'react-top-loading-bar';
import { useRef } from 'react';

function NavBar(props) {

  const [isPressed,setIsPressed] = useState(false);
  // eslint-disable-next-line
  const [userEmail , setUserEmail] = useState('');
  const ref = useRef(null);

  // eslint-disable-next-line
  const userData = props.data;


  const navigate = useNavigate();
  const logoutHandle = async ()=>{
    try {
      ref.current.staticStart();

      localStorage.removeItem('User');
      toast.success("Logout Successfully!!")
      ref.current.complete();

      navigate('/login');
    } catch (error) {
      console.log(error.message)
    }
  }


  return (
    <div>
            <LoadingBar color='orange' ref={ref}  ></LoadingBar>

         <div className='w-full flex flex-row items-center justify-between bg-neutral-950 px-3 md:px-0 h-20 md:h-24'>
          <div className='left text-red-500 font-bold font-Handjet tracking-wider text-4xl sm:text-5xl md:text-6xl relative'>
            <p className='text-white'><span className='text-yellow-500' >Expense</span> Tracker</p>
          </div>

          <div className='flex flex-row justify-end items-center gap-3 w-full md:w-1/3'>
            <div className='w-auto rounded-xl mt-0 md:mt-6 mb-0 md:mb-6'>
              <div className="relative z-50 inline-flex group" onClick={()=>setIsPressed(!isPressed)} >
                <div className="absolute transitiona-all duration-700 opacity-70 inset-16 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:inset-1 group-hover:duration-200 animate-tilt">
                </div>
                <div
                  title=""
                  className="relative inline-flex items-center justify-center px-5 sm:px-7 py-3 md:px-8 md:py-4 text-xs sm:text-sm tracking-wider font-bold text-white transition-all duration-200 bg-neutral-950 font-pj rounded-xl focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-900"
                  role="button"
                >
                  Send Email
                </div>
              </div>

              <div className={`flex flex-col overflow-hidden ${isPressed ? 'opacity-100 mt-2 md:mt-8 w-[18rem] md:w-1/4' : 'opacity-0 w-0 h-0 -mt-2 md:-mt-10'} justify-between transition-all duration-500 bg-blue-500 gap-3 absolute md:relative p-3 z-40 rounded-xl right-3 md:right-0`}>
                <div className='text-white absolute -inset-x-2 -inset-y-2 bg-black font-bold rounded-full w-6 pt-0.5 text-center left-0.5 top-1 cursor-pointer h-fit border-2' onClick={()=>setIsPressed(!isPressed)}>
                  <p className='-mt-1'>x</p>
                </div>
                <div className='flex flex-row gap-3 justify-between'>
                  <input
                    placeholder='Your Email'
                    onChange={(e)=>setUserEmail(e.target.value)}
                    type='email'
                    className='outline-none p-2 pl-4 w-full rounded-2xl'
                  ></input>
                  <button
                    onClick={()=>sendEmail(userEmail, userData)}
                    className='rounded-xl w-fit bg-neutral-800 p-3 text-xl sm:text-2xl text-white'
                  >
                    <BsSendFill></BsSendFill>
                  </button>
                </div>
                <p className='text-[10px] sm:text-xs text-center text-white whitespace-nowrap'>**Get your expenses in <b>one month</b>, On Your Email</p>
              </div>
            </div>

            <div>
              <a
                onClick={logoutHandle}
                href="#_"
                className="text-base sm:text-xl mt-0 md:mt-5 mb-0 md:mb-5 relative inline-flex items-center justify-center p-3 sm:p-4 px-5 sm:px-6 py-2 sm:py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">LogOut</span>
                <span className="relative invisible">LogOut</span>
              </a>
            </div>
          </div>
        </div>
    </div>
  )
}

export default NavBar