import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import filtersReducer from './slices/filter/slice';
import cartReducer from './slices/cart/slice';
import pizzaReducer from './slices/pizza/slice';

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