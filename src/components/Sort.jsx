import { useEffect, useRef, useState } from "react";

const list = [
	{ name: 'популярности (по возрастанию)', sortProperty: 'rating', order: 'asc' },
	{ name: 'популярности  (по убыванию)', sortProperty: 'rating', order: 'desc' },
	{ name: 'цене (сначала дешевые)', sortProperty: 'price', order: 'asc' },
	{ name: 'цене  (сначала дорогие)', sortProperty: 'price', order: 'desc' },
	{ name: 'алфавиту (А-Я)', sortProperty: 'title', order: 'asc' },
	{ name: 'алфавиту (Я-А)', sortProperty: 'title', order: 'desc' },
];

export function Sort({ value, onChangeSort }) {
	const [open, setOpen] = useState(false);
	const popupRef = useRef(null);


	const handleOutsideClick = e => {
		const path = e.path || (e.composedPath && e.composedPath());
		if (!path.includes(popupRef.current)) {
			setOpen(false);
		}
	}

	useEffect(() => {
		const body = document.body;

		body.addEventListener('click', handleOutsideClick);

		return () => body.removeEventListener('click', handleOutsideClick);
	}, [])

	const onClickListItem = (obj) => {
		onChangeSort(obj);
		setOpen(false);
	}

	return (<div className="sort" ref={popupRef} >
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
						{list.map((obj, i) => (
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
}
