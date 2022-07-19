import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';

const Home = ({ loading, pizzas }) => {
	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{loading}
				{pizzas}
			</div>
		</div>
	)
}

export default Home;