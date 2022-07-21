import filtersReducer from './slices/filterSlice';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: {
		filters: filtersReducer
	},
});

