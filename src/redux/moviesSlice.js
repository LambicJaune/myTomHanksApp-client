import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movies: [],       // Fetches all movies
    filter: {
        genre: '',       // The selected genre (e.g., 'Drama')
        director: ''     // The selected director (e.g., 'Steven Spielberg')
    }
};

/**
 * Redux slice to handle movie list and filters.
 */
const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        // replace full movie list
        setMovies(state, action) {
            state.movies = action.payload;
        },
        // filter movies by genre
        setGenreFilter(state, action) {
            state.filter.genre = action.payload;
            state.filter.director = ''; // clear director
        },
        // filter movies by director
        setDirectorFilter(state, action) {
            state.filter.director = action.payload;
            state.filter.genre = ''; // clear genre
        },
        // clear all filters
        clearFilter(state) {
            state.filter.genre = '';
            state.filter.director = '';
        }
    }
});

export const { setMovies, setGenreFilter, setDirectorFilter, clearFilter } = moviesSlice.actions;
export default moviesSlice.reducer;
