import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { setCategoryId, setCurrentPage, setSortType } from '../redux/slices/filterSlice';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
	const dispatch = useDispatch();
	const { categoryId, sortType, searchValue, currentPage } = useSelector(({ filters }) => filters);
	const [items, setItems] = useState([]);
	const [pageCount, setPageCount] = useState(1);
	const [isLoading, setIsLoading] = useState(true);

	const itemsPerPage = 4;
	const urlParams = [
		categoryId !== 0 ? `category=${categoryId}` : '',
		sortType.sortProperty !== 0 ? `sortBy=${sortType.sortProperty}&order=${sortType.order}` : '',
		searchValue ? `title=${searchValue}` : '',
	].join('&');

	const onChangeCategory = (index) => {
		dispatch(setCategoryId(index));
		dispatch(setCurrentPage(1));
	}

	const onClickSort = (obj) => {
		dispatch(setSortType(obj));
		dispatch(setCurrentPage(1));
	}

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	}

	useEffect(() => {
		console.log(urlParams);
		axios
			.get(`https://62d50136d4406e523550b12e.mockapi.io/items/?${urlParams}`)
			.then(({ data }) => setPageCount(Math.ceil(data.length / itemsPerPage)));
		// eslint-disable-next-line
	}, [categoryId, searchValue])

	useEffect(() => {
		const page = `&page=${currentPage}&limit=${itemsPerPage}`;

		setIsLoading(true);
		axios
			.get(`https://62d50136d4406e523550b12e.mockapi.io/items/?${urlParams}${page}`)
			.then(({ data }) => {
				setIsLoading(false);
				setItems(data);
			});
		// eslint-disable-next-line
	}, [categoryId, sortType, searchValue, currentPage])

	const pizzas = !isLoading &&
		(
			pageCount > 0 ?
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

			{pageCount > 1 &&
				(<Pagination
					pageCount={pageCount}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					onChangePage={onChangePage} />)}
		</div>
	)
}

export default Home;