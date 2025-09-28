import { createSlice } from '@reduxjs/toolkit';

/**
 * Initial state for the movies slice.
 * 
 * @typedef {Object} MoviesState
 * @property {Array<Object>} movies - List of all movies
 * @property {Object} filter - Active filters
 * @property {string} filter.genre - Selected genre filter
 * @property {string} filter.director - Selected director filter
 */
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
        /**
             * Replace the full movie list.
             *
             * @function setMovies
             * @param {MoviesState} state - Current slice state
             * @param {Object} action - Redux action
             * @param {Array<Object>} action.payload - New list of movies
             */
        setMovies(state, action) {
            state.movies = action.payload;
        },
        /**
      * Set the active genre filter (and clear director filter).
      *
      * @function setGenreFilter
      * @param {MoviesState} state - Current slice state
      * @param {Object} action - Redux action
      * @param {string} action.payload - Selected genre
      */
        setGenreFilter(state, action) {
            state.filter.genre = action.payload;
            state.filter.director = ''; // clear director
        },
        /**
     * Set the active director filter (and clear genre filter).
     *
     * @function setDirectorFilter
     * @param {MoviesState} state - Current slice state
     * @param {Object} action - Redux action
     * @param {string} action.payload - Selected director
     */
        setDirectorFilter(state, action) {
            state.filter.director = action.payload;
            state.filter.genre = ''; // clear genre
        },
        /**
     * Clear all active filters.
     *
     * @function clearFilter
     * @param {MoviesState} state - Current slice state
     */
        clearFilter(state) {
            state.filter.genre = '';
            state.filter.director = '';
        }
    }
});

export const { setMovies, setGenreFilter, setDirectorFilter, clearFilter } = moviesSlice.actions;
export default moviesSlice.reducer;
