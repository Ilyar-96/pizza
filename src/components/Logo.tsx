import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

import logoSvg from '../assets/img/pizza-logo.svg';

export const Logo: FC = () => {
	const location = useLocation();

	const inner = (
		<>
			<img width={38} src={logoSvg} alt="Pizza logo" />
			<div>
				<h1>React Pizza</h1>
				<p>самая вкусная пицца во вселенной</p>
			</div>
		</>
	);

	if (location.pathname === '/') {
		return (
			<div className="header__logo">
				{inner}
			</div>
		)
	}

	return (
		<Link to="/" className="header__logo">
			{inner}
		</Link>
	);
};
