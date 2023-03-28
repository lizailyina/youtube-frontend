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
    logout: () => initialState
  }
})

export const { loginStart, loginSucces, loginError, logout } = userSlice.actions

export default userSlice.reducer;