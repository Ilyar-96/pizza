import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	categoryId: 0,
	sortType: {
		name: 'популярности  (по убыванию)',
		sortProperty: 'rating',
		order: 'desc'
	}
};

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload;
		},
		setSortType(state, action) {
			state.sortType = action.payload;
		}
	},
});

export const { setCategoryId, setSortType } = filterSlice.actions;

export default filterSlice.reducer;