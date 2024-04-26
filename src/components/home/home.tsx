import { FC } from 'react';
import { useUserListQuery } from '../../app/services/api';
import { UserResponse } from '../../app/types';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { removeToken } from '../../app/auth.helper';
import { useDispatch } from 'react-redux';
import { user } from '../user-form/user-slice';

interface HomeProps { }

const TABLE_HEAD = ["ID", "Name", "Email", "Role", ""];
const Header: FC<{ setUser: (value: UserResponse) => any }> = ({ setUser }) => (
   <div className='flex justify-between items-center border-b'>
      <h1 className='mb-5 mt-0 text-3xl font-semibold leading-normal'>Users</h1>
      <a onClick={() => setUser({})} className="rounded bg-blue-600 px-6 py-2 font-medium leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)">Add User</a>
   </div>
);

const Home: FC<HomeProps> = () => {
   const navigate = useNavigate();
   const { data, error } = useUserListQuery({});
   const dispatch = useDispatch();
   const setUser = (value: UserResponse) => {
      dispatch(user(value));
      navigate('/user')
   }

   if (error?.status === 401) {
      removeToken();
      navigate('/login');
   }
   if (error) {
      return (
         <div className="card h-full w-full">
            <Header setUser={setUser} />
            <p>Oh no, there was an error {error?.status} {JSON.stringify(error?.data)}</p>
         </div>
      );
   }
   
   return (
      <div className="card h-full w-full">
         <Header setUser={setUser} />
         <table className="w-full min-w-max table-auto text-left">
            <thead>
               <tr>
                  {TABLE_HEAD.map((head) => (
                     <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                     >
                        {head}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {data?.map((row: UserResponse, index) => {
                  const isLast = index === data.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                     <tr key={index}>
                        <td className={classes}>
                           <span
                              color="blue-gray"
                              className="font-normal"
                           >
                              {row.id}
                           </span>
                        </td>
                        <td className={classes}>
                           <span
                              color="blue-gray"
                              className="font-normal"
                           >
                              {row.name}
                           </span>
                        </td>
                        <td className={classes}>
                           <span
                              color="blue-gray"
                              className="font-normal"
                           >
                              {row.email}
                           </span>
                        </td>
                        <td className={classes}>
                           <span
                              color="blue-gray"
                              className="font-normal"
                           >
                              {row.role}
                           </span>
                        </td>
                        <td className={classes}>
                           <a
                              color="blue-gray"
                              className="font-medium"
                              onClick={() => setUser(row)}
                           >
                              Edit
                           </a>
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </div>
   )
}

export default Home;
