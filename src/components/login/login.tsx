import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { login } from './login-slice';
import { useNavigate } from 'react-router-dom';
import { useSetLoginMutation } from '../../app/services/api';
import { useDispatch } from 'react-redux';

interface LoginProps {}

export const Login: FC<LoginProps> = () => {
   const [setLogin] = useSetLoginMutation();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   // const { sendpoints } = apiSlice
   const { register, handleSubmit } = useForm({
      defaultValues: {
         email: '',
         password: '',
      },
  });

  const onSubmit = async (values: {email:string, password: string}) => {
      try{
         const resp = await setLogin(values).unwrap();
         if(resp.access_token !== undefined) {
            dispatch(login(resp));
            setTimeout(() => {navigate('/')}, 500);
         }
      } catch (ex) {
         alert((ex as Error).message);
      }
      //endpoints.fetchLogin();
  }

   return (
   <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
   <div className="md:w-1/3 max-w-sm">
     <img
       src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
       alt="Sample image"
     />
   </div>
   <div className="md:w-1/3 max-w-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
     <input
       className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
       type="text"
       placeholder="Email Address"
       {...register('email')}
     />
     <input
       className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
       type="password"
       placeholder="Password"
       {...register('password')}
     />
     <div className="mt-4 flex justify-between font-semibold text-sm">
       <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
         <input className="mr-1" type="checkbox" />
         <span>Remember Me</span>
       </label>
       <a
         className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
         href="#"
       >
         Forgot Password?
       </a>
     </div>
     <div className="text-center md:text-left">
       <button
         className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
         type="submit"
       >
         Login
       </button>              
     </div>
     </form>
   </div>
 </section>
)}
