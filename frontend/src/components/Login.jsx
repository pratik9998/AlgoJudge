import React from 'react'
import logo from '../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useAuth } from './AuthContext';


const Login = () => {

   const navigate = useNavigate();
   const { login } = useAuth();

   const {
      register,
      handleSubmit,
      watch,
      setError,
      formState: { errors, isSubmitting },
   } = useForm();

   const onSubmit = async (data) => {
      try {
          const res = await axios.post('http://localhost:8000/login', data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (res.status === 201) {
            // console.log(res.data.user)
            login(res.data.user)
            navigate('/') // Navigate to home page on successful login
          }
          else{
            setError('myform', { type: 'manual', message: res.message });
            throw new Error(res.message);
          }
          console.log(res)
      } catch (error) {
         setError('myform', {message: error.message})
      } 
   }

   return (
      <div className="bg-[#ced8ff] bg-cover bg-center h-screen flex justify-center items-center" >

         <div className="bg-white overflow-hidden rounded-[8px] flex text-center">

            <div className="flex flex-col justify-center items-center p-[40px]">

               <img src={logo} alt='' className="w-[170px] cursor-pointer" />
               <span className="h-3"></span>

               <form onSubmit={handleSubmit(onSubmit)}>

                  <div>
                     <div className="relative my-4 border-black">
                        <input {...register("username", { required: { value: true, message: "*required" }, maxLength: { value: 26, message: "*Max Length is 26" } })} type="username" className="block w-72 py-2.4 text-sm text-black border border-gray-800 rounded-md px-4 py-2" placeholder="username" />
                        <label className="block text-sm text-gray-500 text-left">*Fill your AlgoJudge Handle.</label>
                        {errors.username && <div className=" block text-sm text-red-500 text-left">{errors.username.message}</div>}
                     </div>

                     <div className="relative my-4">
                        <input {...register("password", { required: { value: true, message: "*required" }, maxLength: { value: 26, message: "*Max Length is 26" }, minLength: { value: 6, message: "*Min Length is 6" } })} type="password" className="block w-72 py-2.4 text-sm text-black border border-gray-800 rounded-md px-4 py-2" placeholder="password" />
                        {errors.password && <div className=" block text-sm text-red-500 text-left">{errors.password.message}</div>}
                     </div>
                  </div>

                  <button disabled={isSubmitting} type='submit' className="cursor-pointer w-[150px] h-[40px] rounded-[5px] bg-[#445A6F] border-[1px] border-[#445A6F] text-white text-[20px] my-[30px]">Login</button>

                  <div>
                     <span>New Here? <Link to='/register'>Create An Account</Link> </span>
                  </div>
                  
                  {errors.myform && <div className="block text-sm text-red-500 text-center">{errors.myform.message}</div>}

               </form>
            </div>
         </div>
      </div>
   )
}

export default Login
