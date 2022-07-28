import { FC } from 'react';
import ReactPaginate from 'react-paginate';

import { Status } from '../../redux/slices/pizzasSlice';

import styles from './Pagination.module.scss';

type TPaginationProps = {
	itemsPerPage: number;
	pageCount: number;
	currentPage: number;
	onChangePage: (page: number) => void;
	status: Status;
}

const Pagination: FC<TPaginationProps> = ({ itemsPerPage, pageCount, currentPage, onChangePage, status }) => {
	return (
		<ReactPaginate
			className={`${styles.root} ${status === Status.LOADING ? styles.disabled : ''}`}
			breakLabel="..."
			nextLabel=">"
			onPageChange={(event) => onChangePage(event.selected + 1)}
			pageRangeDisplayed={itemsPerPage}
			pageCount={pageCount}
			previousLabel="<"
			forcePage={currentPage - 1}
		/>
	)
}

export default Pagination;