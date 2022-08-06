import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { TPizzaItem } from "../../../components/PizzaBlock";
import { IPIzzaData, IFetchPizzasArgs } from "./types";
import { initialState } from "./slice";


export const fetchPizzas = createAsyncThunk<IPIzzaData, IFetchPizzasArgs>(
	'pizzas/fetchPizzas',
	async ({ categoryId, sortType, currentPage, searchValue }) => {
		const _apiBase = 'https://62d50136d4406e523550b12e.mockapi.io/items/';
		const commonSearchParams = `sortBy=${sortType.sortProperty}&order=${sortType.order}${categoryId > 0 ? '&category=' + categoryId : ''}${searchValue ? '&title=' + searchValue : ''}`;

		const { data: allItems } = await axios.get<TPizzaItem[]>(`${_apiBase}?${commonSearchParams}`);
		const { data: pageItems } = await axios.get<TPizzaItem[]>(`${_apiBase}?${commonSearchParams}&page=${currentPage}&limit=${initialState.itemsPerPage}`);

		return { allItems, pageItems };
	}
);
