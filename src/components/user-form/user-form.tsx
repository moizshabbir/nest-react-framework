import { FC } from 'react';
import { UserResponse, UserRequest } from '../../app/types';
import { useForm } from 'react-hook-form';
import { useAddUserMutation, useEditUserMutation } from '../../app/services/api';
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
interface UserFormProps {
}

const UserForm: FC<UserFormProps> = () => {
   const roles = ["ADMIN", "ENGINEER", "INTERN"];
   const navigate = useNavigate();
   const {value} = useAppSelector(state => {console.log(state);return state.user});
   console.log("Edit user", value);
   const { register, handleSubmit } = useForm({
      defaultValues: value??{},
  });

  const [ addUser ] = useAddUserMutation();
  const [ editUser ] = useEditUserMutation();
   
   const submit = async (values: object) => {
      try{
         let resp: UserResponse;
         const data = values as UserRequest;
         if(value){
            resp = await editUser({user: data, id: value.id}).unwrap();
         } else {
            resp = await addUser(data).unwrap();
         }
         if(resp !== undefined) {
            navigate('/');
         }
      } catch (ex) {
         alert((ex as Error).message);
      }
   }

   return (<>
   <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
         {value?'Edit':'Add'} User
       </h2>
     </div>

     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
       <form className="space-y-6" onSubmit={handleSubmit(submit)}>
       <div>
           <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
             Email address
           </label>
           <div className="mt-2">
             <input
               id="name"
               required
               {...register('name')}
               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             />
           </div>
         </div>
         <div>
           <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
             Email address
           </label>
           <div className="mt-2">
             <input
               id="email"
               type="email"
               autoComplete="email"
               required
               {...register('email')}
               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             />
           </div>
         </div>

         <div>
           <div className="flex items-center justify-between">
             <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
               Password
             </label>
           </div>
           <div className="mt-2">
             <input
               id="password"
               type="password"
               autoComplete="current-password"
               required
               {...register('email')}
               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             />
           </div>
         </div>
         <div>
           <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
             Email address
           </label>
           <div className="mt-2">
             <select
               id="role"
               required
               {...register('role')}
               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
             >
               {roles.map((role, i) => (
                  <option key={i} value={role}>{role}</option>
               ))}
               </select>
           </div>
         </div>

         <div>
           <button
             type="submit"
             className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
           >
             Save
           </button>
         </div>
       </form>

       <button
         onClick={() => navigate('/')}
             type="submit"
             className="flex w-full justify-center rounded-md bg-dafault px-3 py-1.5 text-sm font-semibold leading-6 border-2 shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
           >
             back
           </button>
     </div>
   </div>
 </>
)
}

export default UserForm;
