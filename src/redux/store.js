import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';

/**
 * Redux store configuration.
 * 
 * Currently only manages `movies` state via moviesSlice reducer.
 */
const store = configureStore({
    reducer: {
        movies: moviesReducer
    }
});

export default store;
