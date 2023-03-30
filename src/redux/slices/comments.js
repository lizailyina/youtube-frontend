import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  comments: null,
  loading: false,
  error: false
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.comments = null;
      state.loading = true;
    },
    fetchSucces: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    fetchError: (state) => {
      state.comments = null;
      state.loading = true;
      state.error = true;
    },
    addComment: (state, action) => {
      if (state.comments === null) {
        state.comments = [action.payload];
      } else {
        state.comments.push(action.payload);
      }
    }
  }
}
)

export const { fetchStart, fetchSucces, fetchError, addComment } = commentsSlice.actions

export default commentsSlice.reducer;