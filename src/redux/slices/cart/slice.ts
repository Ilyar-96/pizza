import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCartItem, ICartSliceState } from "./types";
import { getCartFromLS } from "../../../utils/getCartFromLS";

const initialState: ICartSliceState = {
	totalCount: getCartFromLS()?.totalCount || 0,
	totalPrice: getCartFromLS()?.totalPrice || 0,
	items: getCartFromLS()?.items || []
};

const getTargetItem = (items: TCartItem[], slug: string): [number, TCartItem] => {
	const targetItemIndex = items.findIndex(item => item.slug === slug);
	const targetItem = items[targetItemIndex];

	return [targetItemIndex, targetItem];
};

const changeStatePriceAndCount = (
	state: ICartSliceState,
	count: number,
	price: number,
	isInc = true
) => {
	if (isInc) {
		state.totalCount += count;
		state.totalPrice += price;
	} else {
		state.totalCount -= count;
		state.totalPrice -= price;
	}
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<TCartItem>) {
			const { payload } = action;
			const [targetItemIndex] = getTargetItem(state.items, payload.slug);

			if (targetItemIndex >= 0) {
				state.items[targetItemIndex].totalCount += 1;
				state.items[targetItemIndex].totalPrice += payload.price;
			} else {
				state.items.push({
					...payload,
					totalCount: 1,
					totalPrice: payload.price
				});
			}

			changeStatePriceAndCount(state, 1, payload.price);
		},
		minusItem(state, action: PayloadAction<string>) {
			const [targetItemIndex, targetItem] = getTargetItem(state.items, action.payload);

			if (targetItem.totalCount > 1) {
				targetItem.totalCount -= 1;
				targetItem.totalPrice -= targetItem.price;
			} else {
				state.items.splice(targetItemIndex, 1);
			}

			changeStatePriceAndCount(state, 1, targetItem.price, false);
		},
		removeItem(state, action: PayloadAction<string>) {
			const [targetItemIndex, targetItem] = getTargetItem(state.items, action.payload);

			state.items.splice(targetItemIndex, 1);
			changeStatePriceAndCount(state, targetItem.totalCount, targetItem.totalPrice, false);
		},
		clearItems(state) {
			state.items = [];
			state.totalCount = 0;
			state.totalPrice = 0;
		},
	}
});

export const {
	addItem,
	minusItem,
	removeItem,
	clearItems
} = cartSlice.actions;

export default cartSlice.reducer;