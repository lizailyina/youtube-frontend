import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  loading: false,
  error: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
    },
    loginSucces: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginError: (state) => {
      state.loading = true;
      state.error = true;
    },
    logout: () => initialState,
    sub: (state, action) => {
      if (!state.user.subscribed.includes(action.payload._id)) {
        state.user.subscribed.push(action.payload._id);
      }
    },
    unsub: (state, action) => {
      state.user.subscribed.splice(state.user.subscribed.findIndex(
        (userId) => (userId === action.payload._id)), 1);
    },
  }
})

export const { loginStart, loginSucces, loginError, logout, sub, unsub } = userSlice.actions

export default userSlice.reducer;