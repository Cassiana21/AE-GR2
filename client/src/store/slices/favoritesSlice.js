import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [], 
  },
  reducers: {
    setFavorites(state, action) {
      state.items = action.payload || [];
    },
    toggleFavorite(state, action) {
      const id = action.payload;
      if (state.items.includes(id)) {
        state.items = state.items.filter((favId) => favId !== id);
      } else {
        state.items.push(id);
      }
    },
  },
});

export const { setFavorites, toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
