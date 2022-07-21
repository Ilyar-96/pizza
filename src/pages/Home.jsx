import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId } from '../redux/slices/filterSlice';
import { setSortType } from "../redux/slices/filterSlice";

const Home = () => {
	const dispatch = useDispatch();
	const { categoryId, sortType } = useSelector(({ filters }) => filters);
	const { searchValue } = useContext(SearchContext);
	const [items, setItems] = useState([]);
	const [pagesCount, setPagesCount] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	const itemsPerPage = 4;
	const urlParams = [
		categoryId !== 0 ? `category=${categoryId}` : '',
		sortType.sortProperty !== 0 ? `sortBy=${sortType.sortProperty}&order=${sortType.order}` : '',
		searchValue ? `title=${searchValue}` : '',
	].join('&');

	const onChangeCategory = (index) => {
		dispatch(setCategoryId(index));
		setCurrentPage(1);
	}

	const onClickSort = (obj) => {
		dispatch(setSortType(obj));
		setCurrentPage(1);
	}

	const onRequest = async (params = '') => {
		const res = await fetch(`https://62d50136d4406e523550b12e.mockapi.io/items/?${params}`);

		if (!res.ok) throw new Error('Ошибка при получениие данных');

		return res.json();
	}

	useEffect(() => {
		onRequest(urlParams)
			.then(res => {
				setPagesCount(Math.ceil(res.length / itemsPerPage));
			});
	}, [categoryId, searchValue])

	useEffect(() => {
		const page = `&page=${currentPage}&limit=${itemsPerPage}`;

		setIsLoading(true);
		onRequest(`${urlParams}${page}`)
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
					onChangeCategory={onChangeCategory} />
				<Sort
					value={sortType}
					onChangeSort={onClickSort} />
			</div>
			<h2 className="content__title">Все пиццы</h2>

			<div className={itemsClass}>
				{skeleton}
				{pizzas}
			</div>

			{pagesCount > 1 &&
				(<Pagination
					pagesCount={pagesCount}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					onChangePage={setCurrentPage} />)}
		</div>
	)
}

export default Home;