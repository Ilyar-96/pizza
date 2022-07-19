import { useEffect, useState } from 'react';
import {
	Routes,
	Route,
} from "react-router-dom";

import { Header } from './components/Header';
import { PizzaBlock } from './components/PizzaBlock';
import Skeleton from './components/PizzaBlock/Skeleton';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

import './scss/app.scss';
import Cart from './pages/Cart';

function App() {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const request = async () => {
		const res = await fetch('https://62d50136d4406e523550b12e.mockapi.io/items');

		if (!res.ok) throw new Error('Ошибка при получениие данных');

		return res.json();
	}

	useEffect(() => {
		request()
			.then(res => {
				setIsLoading(false);
				setItems(res);
			});
	}, [])

	const pizzas = !isLoading &&
		(items.map((pizza) => (
			<PizzaBlock
				key={pizza.id}
				{...pizza} />
		)));

	const loading = isLoading &&
		Array.from(Array(12), () => 0).map((_, i) => (
			<Skeleton key={i} />
		));

	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<Routes>
					<Route path="/" element={<Home loading={loading} pizzas={pizzas} />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</div >
	);
}

export default App;
