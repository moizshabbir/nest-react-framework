import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { preloadState, saveToken } from '../../app/auth.helper';
import { LoginState } from '../../app/types';



const initialState: {value: LoginState} = {
    value:preloadState() || <LoginState>{}
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state: {value: LoginState}, action: PayloadAction<LoginState>) => {
            console.log("login done ", action.payload);
            state.value = action.payload;
            saveToken(action.payload);
        },
    },
})

export const {login} = loginSlice.actions;
export default loginSlice.reducer;
