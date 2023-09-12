import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    // add to []
    addFavorite: (state, action) => {
   
      state.push(action.payload);
    },
    // remove from 
    removeFavorite: (state, action) => {
      return state.filter((movie) => movie.id !== action.payload);
   
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;