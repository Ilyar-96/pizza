import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs'
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { selectFilters, setCategoryId, setCurrentPage, setFilters, setSortType } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzasData } from '../redux/slices/pizzasSlice';

const Home = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const { categoryId, sortType, searchValue, currentPage } = useSelector(selectFilters);
	const { items, pageCount, itemsPerPage, status } = useSelector(selectPizzasData);

	const urlParams = [
		categoryId !== 0 ? `category=${categoryId}` : '',
		sortType.sortProperty !== 0 ? `sortBy=${sortType.sortProperty}&order=${sortType.order}` : '',
		searchValue ? `title=${searchValue}` : '',
	].join('&');

	const onChangeCategory = useCallback((index) => {
		dispatch(setCategoryId(index));
		dispatch(setCurrentPage(1));
		// eslint-disable-next-line
	}, []);

	const onClickSort = useCallback((obj) => {
		dispatch(setSortType(obj));
		dispatch(setCurrentPage(1));
		// eslint-disable-next-line
	}, []);

	const onChangePage = useCallback((number) => {
		dispatch(setCurrentPage(number));
		// eslint-disable-next-line
	}, []);

	const getPizzas = async () => {
		const page = `&page=${currentPage}&limit=${itemsPerPage}`;

		await dispatch(fetchPizzas({
			urlParams,
			page
		}));

		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		})
	};

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));

			const sortType = sortList.find(obj => {
				const sortProperty = params.sortBy;
				const order = params.order;

				return obj.sortProperty === sortProperty && obj.order === order;
			})


			dispatch(setFilters({
				...params,
				currentPage: currentPage < pageCount ? pageCount : 1,
				sortType
			}));
			isSearch.current = true;
		}
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortBy: sortType.sortProperty,
				order: sortType.order,
				categoryId,
				currentPage: currentPage < pageCount ? pageCount : 1
			});

			navigate(`?${queryString}`);
		}
		// eslint-disable-next-line
	}, [categoryId, sortType, currentPage])

	useEffect(() => {
		if (!isSearch.current) {
			getPizzas();
		}

		isSearch.current = false;
		isMounted.current = true;
		// eslint-disable-next-line
	}, [categoryId, sortType, searchValue, currentPage])

	const pizzas = (status === 'success') &&
		(
			pageCount > 0 ?
				items.map((pizza) => (
					<PizzaBlock
						key={pizza.id}
						{...pizza} />
				)) : (
					<div className='cart--empty'>
						<h2>Ну удалось найти пиццы <span>😕</span></h2>
					</div>
				)
		);

	const skeleton = (status === 'loading') &&
		Array.from(Array(itemsPerPage), () => 0).map((_, i) => (
			<Skeleton key={i} />
		));

	const error = (status === 'error') &&
		(
			<div className='cart--empty'>
				<h2>Произошла ошибка <span>😕</span></h2>
				<p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
			</div>
		)

	const itemsClass = [
		'content__items',
		(items.length <= 0 && (status !== 'loading')) ? 'content__items--empty' : ''
	].join(' ');

	return (
		<div className="container container--home" >
			<div className="content__top">
				<Categories
					value={categoryId}
					onChangeCategory={onChangeCategory} />
				<Sort
					value={sortType}
					onChangeSort={onClickSort} />
			</div>
			<h2 className="content__title">Все пиццы</h2>

			<div className={itemsClass} >
				{skeleton}
				{pizzas}
				{error}
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