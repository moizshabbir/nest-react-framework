import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { UserResponse } from '../../app/types';

const initialState: {value:UserResponse} = {
    value: <UserResponse>{}
};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        user: (state: {value:UserResponse}, action: PayloadAction<UserResponse>) => {
            state.value = action.payload;
            console.log("Setting USer", action.payload);
        },
    },
})

export const {user} = UserSlice.actions;
export default UserSlice.reducer;
