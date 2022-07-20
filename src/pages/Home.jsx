import { useEffect, useState, useContext } from 'react';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
	const { searchValue } = useContext(SearchContext);
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [categoryId, setCategoryId] = useState(0);
	const [sortType, setSortType] = useState({
		name: 'популярности  (по убыванию)',
		sortProperty: 'rating',
		order: 'desc'
	});
	const [currentPage, setCurrentPage] = useState(1);
	const [pagesCount, setPagesCount] = useState(0);

	const urlParams = [
		categoryId !== 0 ? `category=${categoryId}` : '',
		sortType.sortProperty !== 0 ? `sortBy=${sortType.sortProperty}&order=${sortType.order}` : '',
		searchValue ? `title=${searchValue}` : '',
	].join('&');
	const itemsLimit = 4;

	const onRequest = async (params = '') => {
		const res = await fetch(`https://62d50136d4406e523550b12e.mockapi.io/items/?${params}`);

		if (!res.ok) throw new Error('Ошибка при получениие данных');

		return res.json();
	}

	useEffect(() => {
		setCurrentPage(1);
		setIsLoading(true);
		onRequest(urlParams)
			.then(res => {
				setIsLoading(false);
				setPagesCount(res.length / itemsLimit);
			});
	}, [categoryId, sortType, searchValue])

	useEffect(() => {
		setIsLoading(true);
		onRequest(`${urlParams}&page=${currentPage}&limit=${itemsLimit}`)
			.then(res => {
				setIsLoading(false);
				setItems(res);
			});
	}, [categoryId, sortType, searchValue, currentPage])

	const pizzas = !isLoading &&
		(
			pagesCount > 0 ?
				items.map((pizza) => (
					<PizzaBlock
						key={pizza.id}
						{...pizza} />
				)) :
				<h3>В данный момент пиццы отстуствуют</h3>
		);

	const skeleton = isLoading &&
		Array.from(Array(4), () => 0).map((_, i) => (
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
				{skeleton}
				{pizzas}
			</div>

			{pagesCount > 1 &&
				(<Pagination
					pagesCount={pagesCount}
					itemsLimit={itemsLimit}
					onChangePage={setCurrentPage} />)}
		</div>
	)
}

export default Home;