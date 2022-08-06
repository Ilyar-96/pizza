import { RootState } from '../../store';

export const selectFilters = (state: RootState) => state.filters;
export const selectSearchValue = (state: RootState) => state.filters.searchValue;
