import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios'

const FullPizza = () => {
	const { id } = useParams();
	const [item, setItem] = useState()
	const navigate = useNavigate();


	useEffect(() => {
		axios.get(`https://62d50136d4406e523550b12e.mockapi.io/items/${id}`)
			.then(({ data }) => setItem(data))
			.catch((err) => {
				alert('Ошибка при получении пиццы');
				navigate('/');
			});
	}, [id])

	if (!item) {
		return (
			<div className='container'>
				<h2>Загрузка...</h2>
			</div>
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