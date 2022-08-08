import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, FC } from 'react';
import axios from 'axios'

import { TPizzaItem } from '../components/PizzaBlock';
import { Spinner } from '../components';

const FullPizza: FC = () => {
	const { id } = useParams();
	const [item, setItem] = useState<TPizzaItem>()
	const navigate = useNavigate();


	useEffect(() => {
		axios.get(`https://62d50136d4406e523550b12e.mockapi.io/items/${id}`)
			.then(({ data }) => setItem(data))
			.catch(() => {
				alert('Ошибка при получении пиццы');
				navigate('/');
			});
		// eslint-disable-next-line
	}, [id])

	if (!item) {
		return (
			<Spinner />
		)
	}

	return (
		<div className='container'>
			<img width={200} height={200} src={item.imageUrl} alt={item.title} />
			<br />
			<br />
			<h2>{item.title}</h2>
			<br />
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, dolores. Labore illo itaque asperiores id veniam incidunt amet nam vero eligendi unde quasi, temporibus eum iusto error consectetur vitae nobis?</p>
			<br />
			<p><strong>{item.price} ₽</strong></p>
		</div>
	)
}

export default FullPizza;