import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { TPizzaItem } from "../../components/PizzaBlock";
import { TSortType } from "../../components/Sort";
import { RootState } from "../store";

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}

interface IPizzasSliceState {
	items: TPizzaItem[],
	status: Status;
	itemsPerPage: number,
	pageCount: number,
}

const initialState: IPizzasSliceState = {
	items: [],
	status: Status.LOADING,
	itemsPerPage: 8,
	pageCount: 1,
};

interface IFetchPizzasArgs {
	categoryId: number;
	sortType: TSortType;
	currentPage: number;
}

interface IPIzzaData {
	allItems: TPizzaItem[];
	pageItems: TPizzaItem[];
}

export const fetchPizzas = createAsyncThunk<IPIzzaData, IFetchPizzasArgs>(
	'pizzas/fetchPizzas',
	async ({ categoryId, sortType, currentPage }) => {
		const _apiBase = 'https://62d50136d4406e523550b12e.mockapi.io/items/';
		const commonSearchParams = `sortBy=${sortType.sortProperty}&order=${sortType.order}&category=${categoryId > 0 ? categoryId : ''}`;

		const { data: allItems } = await axios.get<TPizzaItem[]>(`${_apiBase}?${commonSearchParams}`);
		const { data: pageItems } = await axios.get<TPizzaItem[]>(`${_apiBase}?${commonSearchParams}&page=${currentPage}&limit=${initialState.itemsPerPage}`);

		return { allItems, pageItems };
	}
)

export const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.status = Status.LOADING;
				state.items = [];
			})
			.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<IPIzzaData>) => {
				state.pageCount = Math.ceil(action.payload.allItems.length / state.itemsPerPage);
				state.items = action.payload.pageItems;
				state.status = Status.SUCCESS;
			})
			.addCase(fetchPizzas.rejected, (state) => {
				state.status = Status.ERROR;
				state.items = [];
			})
	}

});

export const selectPizzasData = (state: RootState) => state.pizzas;
export const selectPizzas = (state: RootState) => state.pizzas.items;

export default pizzasSlice.reducer;