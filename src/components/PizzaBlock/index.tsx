import { FC, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from '../../redux/slices/cart/slice';
import { Link } from 'react-router-dom';
import { ICartItem } from "../Cart/types";
import { selectCartItems } from "../../redux/slices/cart/selectors";

const typeNames = ['тонкое', 'традиционное'];

export type TPizzaItem = {
	id: string;
	imageUrl: string;
	title: string;
	price: number;
	types: number[];
	sizes: number[];
	category: number;
	rating: number;
}

export const PizzaBlock: FC<TPizzaItem> = memo(({ id, title, price, imageUrl, sizes, types }) => {
	const dispatch = useDispatch();
	const [activeType, setActiveType] = useState(Math.min(...types));
	const [activeSize, setActiveSize] = useState(Math.min(...sizes));
	const items: ICartItem[] = useSelector(selectCartItems);
	const slug = `${title}_${typeNames[activeType]}_${activeSize}`;
	const targetItems = items.filter(item => item.id === id);
	const addedCount = targetItems.reduce((sum, obj) => sum + obj.totalCount, 0);

	const onClickAdd = () => {
		const item = {
			id,
			slug,
			title,
			price,
			imageUrl,
			type: typeNames[activeType],
			size: activeSize,
			totalCount: 0,
			totalPrice: 0
		};

		dispatch(addItem(item));
	}

	return (
		<div className="pizza-block">
			<Link to={`/pizza/${id}`}>
				<div className="pizza-block__image-wrapper" >
					<img className="pizza-block__image" src={imageUrl} alt="Pizza" />
				</div>

				<h4 className="pizza-block__title">{title}</h4>
			</Link>
			<div className="pizza-block__selector">
				<ul>
					{
						types.map(type => (
							<li
								onClick={() => setActiveType(type)}
								key={`${id}-${type}`}
								className={activeType === type ? "active" : ''}
							>{typeNames[type]}</li>
						))
					}
				</ul>
				<ul>
					{
						sizes.map(size => (
							<li
								onClick={() => setActiveSize(size)}
								key={`${id}-${size}`}
								className={activeSize === size ? 'active' : ''}
							>{size} см</li>
						))
					}
				</ul>
			</div>
			<div className="pizza-block__bottom">
				<div className="pizza-block__price">от {price} ₽</div>
				<button
					onClick={onClickAdd}
					className="button button--outline button--add"
				>
					<svg width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" fill="white" />
					</svg>
					<span>Добавить</span>
					{addedCount > 0 && <i>{addedCount}</i>}
				</button>
			</div>
		</div>
	);
});