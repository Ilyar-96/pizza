import { FC, useEffect, useRef, useState } from 'react';

import styles from './ConfirmModal.module.scss';
import { clsx } from 'clsx';

interface IConfirmModalProps {
	isActive: boolean;
	setActive: (isActive: boolean) => void;
}

interface IRef {
	current: HTMLElement | null;
}

export const confirm = (resolve: () => {}) => {

}

// Hook
function useOnClickOutside(ref: IRef, handler: (event: MouseEvent | TouchEvent) => void) {
	useEffect(
		() => {
			const listener = (event: MouseEvent | TouchEvent) => {
				if (!ref.current || ref.current.contains(event.target as HTMLInputElement)) {
					return;
				}
				handler(event);
			};

			document.addEventListener("mousedown", listener);
			document.addEventListener("touchstart", listener);
			return () => {
				document.removeEventListener("mousedown", listener);
				document.removeEventListener("touchstart", listener);
			};
		},

		[ref, handler]
	);
}

export const ConfirmModal: FC = () => {
	const [isActive, setActive] = useState(false);

	const ref = useRef(null);

	useOnClickOutside(ref, () => setActive(false));

	useEffect(() => {
		const body = document.querySelector('body');

		if (isActive) {
			body?.classList.add('lock')
		} else {
			body?.classList.remove('lock')
		}
	}, [isActive])


	return (
		<div className={clsx(styles.root, [isActive && styles.active])}>
			<div ref={ref} className={styles.body}>
				<h2>Действительно хотите удалить?</h2>
				<button onClick={() => {
					return new Promise(res => {
						console.log(res);
					})
				}}>Да</button>
				<button>Отмена</button>
			</div>
		</div>
	)
}

export default ConfirmModal;