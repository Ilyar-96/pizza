
export type TCartItem = {
	id: string;
	slug: string;
	imageUrl: string;
	title: string;
	price: number;
	type: string;
	size: number;
	totalCount: number;
	totalPrice: number;
};
export interface ICartSliceState {
	totalCount: number;
	totalPrice: number;
	items: TCartItem[];
}

