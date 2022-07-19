import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

const Pagination = ({ itemsLimit, pagesCount, onChangePage }) => {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=">"
			onPageChange={event => onChangePage(event.selected + 1)}
			pageRangeDisplayed={itemsLimit}
			pageCount={pagesCount}
			previousLabel="<"
			renderOnZeroPageCount={null}
		/>
	)
}

export default Pagination;