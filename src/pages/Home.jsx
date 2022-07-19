import { useEffect, useState } from 'react';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [categoryId, setCategoryId] = useState(0);
	const [sortType, setSortType] = useState({
		name: 'популярности  (по убыванию)',
		sortProperty: 'rating',
		order: 'desc'
	});

	const onRequest = async (params = '') => {
		const res = await fetch(`https://62d50136d4406e523550b12e.mockapi.io/items/?${params}`);

		if (!res.ok) throw new Error('Ошибка при получениие данных');

		return res.json();
	}

	useEffect(() => {
		const params = [
			categoryId !== 0 ? `category=${categoryId}` : '',
			sortType.sortProperty !== 0 ? `sortBy=${sortType.sortProperty}&order=${sortType.order}` : ''
		].join('&');

		setIsLoading(true);
		onRequest(params)
			.then(res => {
				setIsLoading(false);
				setItems(res);
			});
	}, [categoryId, sortType])

	const pizzas = !isLoading &&
		(
			items.length > 0 ?
				items.map((pizza) => (
					<PizzaBlock
						key={pizza.id}
						{...pizza} />
				)) :
				<h3>В данный момент пиццы отстуствуют</h3>
		);

	const loading = isLoading &&
		Array.from(Array(12), () => 0).map((_, i) => (
			<Skeleton key={i} />
		));

	const itemsClass = [
		'content__items',
		items.length <= 0 && !isLoading ? 'content__items--empty' : ''
	].join(' ');

	return (
		<div className="container">
			<div className="content__top">
				<Categories
					value={categoryId}
					onClickCategory={(index) => setCategoryId(index)} />
				<Sort
					value={sortType}
					onChangeSort={(index) => setSortType(index)} />
			</div>
			<h2 className="content__title">Все пиццы</h2>

			<div className={itemsClass}>
				{loading}
				{pizzas}
			</div>
		</div>
	)
}

export default Home;