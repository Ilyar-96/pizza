import { FC } from 'react';

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: FC = () => {
	return (
		<div className={styles.root}>
			<span>😕</span>
			<h2>Ничего не найдено</h2>
			<p className={styles.description}>К сожалению, такой страницы не существует в нашем интернет магазине</p>
		</div>
	)
}

export default NotFoundBlock;