import { TSortType } from "../../../components/Sort/types";

export interface IFilterSliceState {
	categoryId: number;
	sortType: TSortType;
	searchValue: string;
	currentPage: number;
	isFiltersChanged?: boolean;
}
