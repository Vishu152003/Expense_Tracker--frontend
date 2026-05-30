import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import Items from '../components/Items';
import { Chartss } from '../components/Chartss';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import LoadingBar from 'react-top-loading-bar';
// import { toast } from 'react-hot-toast';
import { createExpense, getUserExpenses } from '../utils/renders';
import NavBar from '../components/NavBar';
import { useRef } from 'react';


function Home() {
  const navigate = useNavigate();
  const [selectDate, setSelectedDate] = useState("");
  const [amount , setAmount] = useState(0);
  const [category , setCategory] = useState("");
  const [userdata , ] = useState(JSON.parse(localStorage.getItem('User')));
  const [userexp , setUserexp] = useState([]);
  const ref = useRef(null);


  document.title='Home'

  

  // logout

useEffect(()=>{
  // if delete from application in console
  // eslint-disable-next-line 
  if(!localStorage.getItem('User'))
  {
    navigate('/login')
  }
  // eslint-disable-next-line 
  setUserexp(Promise.resolve(getUserExpenses(userdata._id)).then((data)=>setUserexp(data)))

}, [userdata._id, navigate]);


const getTotal= ()=>{
    let sum = 0;
    for(const item in userexp)
    {
      sum += userexp[item].amount
    }
    return sum;
}

  // console.log(userexp)
  return (
    <div className='min-h-screen font-mont w-full bg-zinc-900 '>
      <LoadingBar color='orange' ref={ref}  ></LoadingBar>
      <NavBar data={userexp}></NavBar>

      {/* Feed */}
      <div className='Feed w-full mx-auto px-3 md:px-0 md:w-4/5 relative flex flex-col md:flex-row gap-5 py-4'>
        <div className='leftbox w-full md:w-1/2 h-full'>
          <div className='p-4 md:p-6 h-full w-full'>
            <Chartss exdata={userexp}></Chartss>
          </div>
        </div>

        <div className='rightbox flex flex-col gap-6 md:gap-10 items-center w-full md:w-1/2'>
          <div className='createnew bg-gray-800 w-full md:w-auto rounded-3xl p-5 md:p-10 pb-6 pt-6 flex flex-col justify-center items-center gap-2'>
            <div className='font-bold text-2xl md:text-3xl text-white font-mont text-center'>Create Transaction</div>

            <div className='flex flex-col sm:flex-row gap-4 w-full justify-center items-center'>
              <input
                type='number'
                onChange={(e)=>setAmount(e.target.value)}
                placeholder='Amount'
                className='h-12 w-full sm:w-auto text-base placeholder-black p-4 rounded-xl outline-none focus:focus-animation'
              />
              <select
                id="countries"
                onChange={(e)=>{setCategory(e.target.value); }}
                defaultValue='selected'
                className="bg-white w-full sm:w-auto outline-none border placeholder-black border-gray-300 text-gray-900 text-sm rounded-xl block p-2.5 focus:focus-animation"
              >
                <option value="" >--Select--</option>
                <option value="Grocery">Grocery</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Shopping">Shopping</option>
                <option value="Travel">Travel</option>
                <option value="Food" >Food</option>
                <option value="Fun" >Fun</option>
                <option value="Other" >Other</option>
              </select>
            </div>

            <div className='grid grid-flow-row w-full gap-3'>
              <div className='w-full'>
                <DatePicker
                  selected={selectDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="p-3 placeholder-black w-full rounded-xl outline-none bg-jp-black px-4 placeholder-rp-yellow h-fit text-jp-white focus:focus-animation"
                  placeholderText="Date"
                  showYearDropdown
                />
              </div>

              <a
                onClick={()=>{
                  const expInfo = {
                    usersid : userdata._id,
                    category ,
                    date : selectDate ,
                    amount 
                  }
                  ref.current.staticStart();
                  createExpense(expInfo);
                  ref.current.complete();
                }}
                href="#_"
                className="relative h-fit text-center w-full rounded-xl px-5 py-2 overflow-hidden group bg-gray-800 border-2 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-indigo-600 text-white hover:ring-2 hover:ring-offset-2 hover:ring-indigo-600 transition-all ease-out duration-300"
              >
                <span className="absolute right-0 w-8 h-10 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative font-bold text-2xl">+</span>
              </a>
            </div>
          </div>

            <div className='w-full md:w-5/6 p-5 md:p-7 relative rounded-xl h-auto border-white border-2 grid gap-5 md:gap-7 overflow-y-auto'>
            <div className='text-xl md:text-3xl text-white font-bold font-mont text-center break-words'>Total Expense : ₹ {getTotal()}</div>

            <div className='grid grid-cols-1 sm:grid-cols-2 listrr gap-7'>
              {Object.keys(userexp).map((items) => (
                <Items key={userexp[items]._id} data={userexp[items]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home