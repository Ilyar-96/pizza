import { FC, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs'
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../redux/store';
import Categories from '../components/Categories';
import Sort, { TSortType, sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { selectFilters, setCategoryId, setCurrentPage, setFilters, setSortType } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzasData, Status } from '../redux/slices/pizzasSlice';

const Home: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isSearch = useRef(false);
	const isMounted = useRef(false);
	const location = useLocation();

	const { categoryId, sortType, searchValue, currentPage } = useSelector(selectFilters);
	const { items, pageCount, itemsPerPage, status } = useSelector(selectPizzasData);

	const onChangeCategory = useCallback((category: number) => {
		dispatch(setCategoryId(category));
		dispatch(setCurrentPage(1));
		// eslint-disable-next-line
	}, []);

	const onClickSort = useCallback((obj: TSortType) => {
		dispatch(setSortType(obj));
		dispatch(setCurrentPage(1));
		// eslint-disable-next-line
	}, []);

	const onChangePage = useCallback((page: number) => {
		dispatch(setCurrentPage(page));
		// eslint-disable-next-line
	}, []);

	const getPizzas = async () => {
		await dispatch(
			fetchPizzas({
				categoryId,
				currentPage,
				sortType
			}));

		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		})
	};

	useEffect(() => {
		if (location.search) {
			const params = qs.parse(location.search.substring(1));
			const searchCategoryId = Number(params.category);
			const searchCurrentPage = Number(params.page);

			const searchSortType = sortList.find(obj => {
				const sortProperty = params.sortBy;
				const order = params.order;

				return obj.sortProperty === sortProperty && obj.order === order;
			})

			dispatch(setFilters({
				categoryId: searchCategoryId,
				searchValue,
				currentPage: searchCategoryId < 1 ? searchCurrentPage : 1,
				sortType: searchSortType?.order ? searchSortType : sortType
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
				category: categoryId,
				page: currentPage,
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

	const pizzas = (status === Status.SUCCESS) &&
		(
			pageCount > 0 ?
				items.map((pizza: any) => (
					<PizzaBlock
						key={pizza.id}
						{...pizza} />
				)) : (
					<div className='cart--empty'>
						<h2>Ну удалось найти пиццы <span>😕</span></h2>
					</div>
				)
		);

	const skeleton = (status === Status.LOADING) &&
		Array.from(Array(itemsPerPage), () => 0).map((_, i) => (
			<Skeleton key={i} />
		));

	const error = (status === Status.ERROR) &&
		(
			<div className='cart--empty'>
				<h2>Произошла ошибка <span>😕</span></h2>
				<p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
			</div>
		)

	const itemsClass = [
		'content__items',
		(items.length <= 0 && (status !== Status.LOADING)) ? 'content__items--empty' : ''
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
				(
					<Pagination
						pageCount={pageCount}
						itemsPerPage={itemsPerPage}
						currentPage={currentPage}
						onChangePage={onChangePage}
						status={status}
					/>
				)}
		</div>
	)
}

export default Home;