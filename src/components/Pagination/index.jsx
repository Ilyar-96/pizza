import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

const Pagination = ({ itemsPerPage, pagesCount, currentPage, onChangePage }) => {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=">"
			onPageChange={event => onChangePage(event.selected + 1)}
			pageRangeDisplayed={itemsPerPage}
			pageCount={pagesCount}
			previousLabel="<"
			renderOnZeroPageCount={null}
			forcePage={currentPage - 1}
		/>
	)
}

export default Pagination;