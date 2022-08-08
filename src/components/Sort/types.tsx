enum SortProperties {
	RATING = 'rating',
	PRICE = 'price',
	TITLE = 'title'
}
enum Orders {
	ASC = 'asc',
	DESC = 'desc'
}

export type TSortType = {
	name: string;
	sortProperty: SortProperties;
	order: Orders;
};

export const sortList: TSortType[] = [
	{ name: 'популярности (по возрастанию)', sortProperty: SortProperties.RATING, order: Orders.ASC },
	{ name: 'популярности  (по убыванию)', sortProperty: SortProperties.RATING, order: Orders.DESC },
	{ name: 'цене (сначала дешевые)', sortProperty: SortProperties.PRICE, order: Orders.ASC },
	{ name: 'цене  (сначала дорогие)', sortProperty: SortProperties.PRICE, order: Orders.DESC },
	{ name: 'алфавиту (А-Я)', sortProperty: SortProperties.TITLE, order: Orders.ASC },
	{ name: 'алфавиту (Я-А)', sortProperty: SortProperties.TITLE, order: Orders.DESC },
];
export interface SortProps {
	value: TSortType;
	onChangeSort: (obj: TSortType) => void;
}
