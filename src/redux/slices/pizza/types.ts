import { TPizzaItem } from "../../../components/PizzaBlock";
import { TSortType } from "../../../components/Sort/types";


export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}
export interface IPizzasSliceState {
	items: TPizzaItem[];
	status: Status;
	itemsPerPage: number;
	pageCount: number;
}
export interface IFetchPizzasArgs {
	categoryId: number;
	sortType: TSortType;
	currentPage: number;
	searchValue: string;
}
export interface IPIzzaData {
	allItems: TPizzaItem[];
	pageItems: TPizzaItem[];
}
