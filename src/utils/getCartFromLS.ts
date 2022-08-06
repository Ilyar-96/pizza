import { ICartSliceState } from "../redux/slices/cart/types";

export const getCartFromLS = () => {
	const json = localStorage.getItem('cart');
	if (json) {
		return JSON.parse(json) as ICartSliceState;
	}
} 