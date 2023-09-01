import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jwtToken: localStorage.getItem('jwtToken') || null,
  userInfo: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.jwtToken = action.payload;
      localStorage.setItem('jwtToken', action.payload);
    },
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.jwtToken = null;
      state.userInfo = null;
      localStorage.removeItem('jwtToken');
    },
  },
});

export const { setToken, setUser, logout } = authSlice.actions;

export default authSlice.reducer;