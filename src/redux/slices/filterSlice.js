import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	categoryId: 0,
	sortType: {
		name: 'популярности  (по убыванию)',
		sortProperty: 'rating',
		order: 'desc'
	},
	searchValue: '',
	currentPage: 1
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
		},
		setSearchValue(state, action) {
			console.log(action.payload);
			state.searchValue = action.payload;
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		}
	},
});

export const { setCategoryId, setSortType, setSearchValue, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;