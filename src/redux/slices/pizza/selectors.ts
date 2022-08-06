import { RootState } from "../../store";

export const selectPizzasData = (state: RootState) => state.pizzas;
export const selectPizzas = (state: RootState) => state.pizzas.items;
