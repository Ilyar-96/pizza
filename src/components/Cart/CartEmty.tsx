import { FC } from 'react';
import { Link } from 'react-router-dom';

import emtyImg from '../../assets/img/empty-cart.png';

export const CartEmty: FC = () => (
	<div className="container container--cart">
		<div className="cart cart--empty">
			<h2>Корзина пустая <span>😕</span></h2>
			<p>
				Вероятнее всего, вы ещё не заказывали пиццу.<br />
				Для того, чтобы заказать пиццу, перейдите на главную страницу.
			</p>
			<img src={emtyImg} alt="Empty cart" />
			<Link to="/" className="button button--black">
				<span>Вернуться назад</span>
			</Link>
		</div>
	</div>
);