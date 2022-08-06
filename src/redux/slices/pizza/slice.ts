import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPizzas } from "./asyncActions";
import { IPizzasSliceState, Status, IPIzzaData } from "./types";

export const initialState: IPizzasSliceState = {
	items: [],
	status: Status.LOADING,
	itemsPerPage: 8,
	pageCount: 1,
};

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

export default pizzasSlice.reducer;