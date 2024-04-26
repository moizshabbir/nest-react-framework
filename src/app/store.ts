import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../components/login/login-slice";
import userReducer from "../components/user-form/user-slice";
import { Api } from "./services/api";


export const store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,
        [Api.reducerPath]: Api.reducer,
        //users: usersReducer
    },
    middleware: (getDefaultMiddleware) => (getDefaultMiddleware().concat(Api.middleware)), 
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;