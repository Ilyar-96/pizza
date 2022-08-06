import { FC, memo } from "react";

const categories: string[] = [
	'Все',
	'Мясные',
	'Вегетарианская',
	'Гриль',
	'Острые',
	'Закрытые'
]

type TCategoriesProps = {
	value: number;
	onChangeCategory: (i: number) => void;
}

const Categories: FC<TCategoriesProps> = ({ value, onChangeCategory }) => {
	return (
		<div className="categories">
			<ul>
				{
					categories.map((category, i) => (
						<li
							key={category}
							onClick={() => onChangeCategory(i)}
							className={value === i ? 'active' : ''}
						>{category}</li>
					))}
			</ul>
		</div >
	);
};

export default memo(Categories);