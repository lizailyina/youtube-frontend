import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  video: null,
  loading: false,
  error: false
}

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true
    },
    fetchSucces: (state, action) => {
      state.loading = false;
      state.video = action.payload;
    },
    fetchError: (state) => {
      state.loading = true;
      state.error = true;
    },
    like: (state, action) => {
      if (!state.video.likes.find((userId) => (userId === action.payload._id))) {
        state.video.likes.push(action.payload._id);
      }
      if (state.video.dislikes.find((userId) => (userId === action.payload._id))) {
        state.video.dislikes.splice(
          state.video.dislikes.findIndex((userId) => (userId === action.payload._id)), 1);
      }
    },
    dislike: (state, action) => {
      if (!state.video.dislikes.find((userId) => (userId === action.payload._id))) {
        state.video.dislikes.push(action.payload._id);
      }
      if (state.video.likes.find((userId) => (userId === action.payload._id))) {
        state.video.likes.splice(
          state.video.likes.findIndex((userId) => (userId === action.payload._id)), 1);
      }
    },
    unlike: (state, action) => {
      if (state.video.likes.find((userId) => (userId === action.payload._id))) {
        state.video.likes.splice(
          state.video.likes.findIndex((userId) => (userId === action.payload._id)), 1);
      }
    },
    undislike: (state, action) => {
      if (state.video.dislikes.find((userId) => (userId === action.payload._id))) {
        state.video.dislikes.splice(
          state.video.dislikes.findIndex((userId) => (userId === action.payload._id)), 1);
      }
    }
  }
})

export const { fetchStart, fetchSucces, fetchError, like, unlike, dislike, undislike } = videoSlice.actions

export default videoSlice.reducer;