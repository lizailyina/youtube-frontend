import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: true,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggle: (state) => {
      state.theme = !state.theme;
    }
  }
}
)

export const { toggle } = themeSlice.actions

export default themeSlice.reducer;