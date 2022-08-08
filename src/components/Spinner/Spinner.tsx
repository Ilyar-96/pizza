import { FC } from 'react';

import styles from './Spinner.module.scss';
import spinner from '../../assets/img/spinner.svg'

export const Spinner: FC = () => {
	return (
		<div className={styles.root}>
			<img className={styles.img} src={spinner} alt="" />
		</div>
	)
}