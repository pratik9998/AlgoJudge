import React from 'react'
import logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
      <div class="bg-[#ced8ff] bg-cover bg-center h-screen flex justify-center items-center" >
  
         <div class="bg-white overflow-hidden rounded-[8px] flex text-center">

            <div class="flex flex-col justify-center items-center p-[40px]">
               
               <img src={logo} alt='' class="w-[170px] cursor-pointer"/>
               <span class="h-3"></span>

               <form action=''>

               <div>
                  <div class="relative my-4 border-black">
                  <input type="username" class="block w-72 py-2.4 text-sm text-black border border-gray-800 rounded-md px-4 py-2" placeholder="username"/>
                  <label class="block text-sm text-gray-500 text-left">*Fill your AlgoJudge Handle.</label>
               </div>

               <div class="relative my-4">
                  <input type="password" class="block w-72 py-2.4 text-sm text-black border border-gray-800 rounded-md px-4 py-2" placeholder="password"/>
               </div>
               </div>

               <button type='submit' class="w-[150px] h-[40px] rounded-[5px] bg-[#445A6F] border-[1px] border-[#445A6F] text-white text-[20px] my-[30px]">Login</button>

               <div>
                  <span>New Here? <Link to='/register'>Create An Account</Link> </span>
               </div>

               </form>
            </div>
         </div>
      </div>
  )
}

export default Login
