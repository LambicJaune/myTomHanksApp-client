import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movies: [],       // Fetches all movies
    filter: {
        genre: '',       // The selected genre (e.g., 'Drama')
        director: ''
    }
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies(state, action) {
            state.movies = action.payload;
        },
        setGenreFilter(state, action) {
            state.filter.genre = action.payload;
            state.filter.director = ''; // clear director
        },
        setDirectorFilter(state, action) {
            state.filter.director = action.payload;
            state.filter.genre = ''; // clear genre
        },
        clearFilter(state) {
            state.filter.genre = '';
            state.filter.director = '';
        }
    }
});

export const { setMovies, setGenreFilter, setDirectorFilter, clearFilter } = moviesSlice.actions;
export default moviesSlice.reducer;
