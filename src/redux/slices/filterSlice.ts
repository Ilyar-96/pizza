import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TSortType, sortList } from '../../components/Sort';
import { RootState } from '../store';

interface IFilterSliceState {
	categoryId: number;
	sortType: TSortType;
	searchValue: string;
	currentPage: number;
}

const initialState: IFilterSliceState = {
	categoryId: 0,
	sortType: sortList[0],
	searchValue: '',
	currentPage: 1
};

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		setSortType(state, action: PayloadAction<TSortType>) {
			state.sortType = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setFilters(state, action: PayloadAction<IFilterSliceState>) {
			if (Object.keys(action.payload).length) {
				state.currentPage = Number(action.payload.currentPage);
				state.categoryId = Number(action.payload.categoryId);
				state.sortType = action.payload.sortType;
			} else {
				state.currentPage = 1;
				state.categoryId = 0;
				state.sortType = sortList[0];
			}
		}
	},
});

export const selectFilters = (state: RootState) => state.filters;
export const selectSearchValue = (state: RootState) => state.filters.searchValue;

export const {
	setCategoryId,
	setSortType,
	setSearchValue,
	setCurrentPage,
	setFilters } = filterSlice.actions;

export default filterSlice.reducer;