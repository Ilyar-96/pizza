import React, { FC, useEffect, useRef, useState } from "react";

enum SortProperties {
	RATING = 'rating',
	PRICE = 'price',
	TITLE = 'title'
}

enum Orders {
	ASC = 'asc',
	DESC = 'desc',
}

export type TSortType = {
	name: string;
	sortProperty: SortProperties;
	order: Orders;
}

export const sortList: TSortType[] = [
	{ name: 'популярности (по возрастанию)', sortProperty: SortProperties.RATING, order: Orders.ASC },
	{ name: 'популярности  (по убыванию)', sortProperty: SortProperties.RATING, order: Orders.DESC },
	{ name: 'цене (сначала дешевые)', sortProperty: SortProperties.PRICE, order: Orders.ASC },
	{ name: 'цене  (сначала дорогие)', sortProperty: SortProperties.PRICE, order: Orders.DESC },
	{ name: 'алфавиту (А-Я)', sortProperty: SortProperties.TITLE, order: Orders.ASC },
	{ name: 'алфавиту (Я-А)', sortProperty: SortProperties.TITLE, order: Orders.DESC },
];

interface SortProps {
	value: TSortType;
	onChangeSort: (obj: TSortType) => void;
}

const Sort: FC<SortProps> = ({ value, onChangeSort }) => {
	const [open, setOpen] = useState(false);
	const popupRef = useRef<HTMLDivElement>(null);

	const handleOutsideClick = (e: MouseEvent) => {
		if (popupRef.current && !e.composedPath().includes(popupRef.current)) {
			setOpen(false);
		}
	}

	useEffect(() => {
		const body = document.body;

		body.addEventListener('click', handleOutsideClick);

		return () => body.removeEventListener('click', handleOutsideClick);
	}, [])

	const onClickListItem = (obj: TSortType) => {
		onChangeSort(obj);
		setOpen(false);
	}

	return (
		<div
			ref={popupRef}
			className="sort"
		>
			<div
				className={['sort__label', open ? 'active' : ''].join(' ')}>
				<svg width={10} height={6} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z" fill="#2C2C2C" />
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => setOpen(!open)}>{value.name}</span>
			</div>
			{
				open && (
					<div className="sort__popup">
						<ul>
							{sortList.map((obj) => (
								<li
									onClick={() => onClickListItem(obj)}
									key={obj.name}
									className={value.name === obj.name ? 'active' : ''}
								>{obj.name}</li>
							))}
						</ul>
					</div>
				)
			}
		</div >);
};

export default React.memo(Sort);