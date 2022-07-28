import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import filtersReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import pizzaReducer from './slices/pizzasSlice';

export const store = configureStore({
	reducer: {
		filters: filtersReducer,
		cart: cartReducer,
		pizzas: pizzaReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch