import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { LoginInput, LoginState, UserRequest, UserResponse } from "../types";
const { VITE_API_URL } = import.meta.env;

export const Api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).login.value.access_token
            if (token)
                headers.set('Authorization', `Bearer ${token}`)
            return headers;
        }
    }),
    tagTypes: ['User'],
    endpoints(builder) {
        return {
            setLogin: builder.mutation<LoginState, LoginInput>({
                query: (login) => ({
                    url: 'users/login',
                    method: 'POST',
                    body: login
                }),
            }),
            userList: builder.query<UserResponse[], any>({
                query: () => ({
                    url: 'users',
                })
            }),
            getUser: builder.query<UserResponse, number>({
                query: (id) => ({
                    url: `users/${id}`,
                })
            }),
            addUser: builder.mutation<UserResponse, UserRequest>({
                query: (user) => ({
                    url: `users`,
                    method: 'POST',
                    body: user
                })
            }),
            editUser: builder.mutation<UserResponse, {user: UserRequest, id: number}>({
                query: (args) => ({
                    url: `users/${args.id}`,
                    method: 'PUT',
                    body: args.user
                })
            })
        }
    }
});

export const { 
    useSetLoginMutation,
    useUserListQuery,
    useGetUserQuery,
    useAddUserMutation,
    useEditUserMutation,
 } = Api;