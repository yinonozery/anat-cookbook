import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    userInfo: {}, // for user object
    userToken: null, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userInfo = action.payload;
        },
        logout: (state) => {
            state.userInfo = null;
        },
    },
    extraReducers: {},
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.userInfo;

export default userSlice.reducer;
