import { useRef, useCallback, useState, FC, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import { setSearchValue } from '../../redux/slices/filter/slice';
import { selectSearchValue } from "../../redux/slices/filter/selectors";

import styles from './Search.module.scss';

export const Search: FC = () => {
	const dispatch = useDispatch();
	const searchValue = useSelector(selectSearchValue);
	const [value, setValue] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const onClickClear = () => {
		dispatch(setSearchValue(''));
		setValue('');
		inputRef.current?.focus();
	}

	// eslint-disable-next-line
	const updateSearchValue = useCallback(
		debounce((str: string) => {
			dispatch(setSearchValue(str));
		}, 250),
		[]
	);

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		updateSearchValue(e.target.value);
	}

	return (
		<div className={styles.root}>
			<label>
				<svg className={styles.icon} enableBackground="new 0 0 32 32" id="Glyph" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_" /></svg>
				<input
					ref={inputRef}
					value={value}
					onChange={onChangeInput}
					className={styles.input}
					type="text"
					placeholder='Поиск пиццы...'
				/>
			</label>

			{searchValue && (<svg
				onClick={onClickClear}
				className={styles.clearIcon} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" /></svg>
			)}
		</div>
	)
}