import { TSortType } from '../../../components/Sort';

export interface IFilterSliceState {
	categoryId: number;
	sortType: TSortType;
	searchValue: string;
	currentPage: number;
	isFiltersChanged?: boolean;
}
