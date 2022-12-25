import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({ itemCount, pageSize, currentPage, onPageChange }) => {
    const pageCount = Math.ceil(itemCount / pageSize);

    const pages = _.range(1, pageCount + 1);
    if (pageCount > 1) {
        return (
            <nav>
                <ul className="pagination">
                    <div className="pagination__text">Страница</div>
                    {pages.map((page) => {
                        return (
                            <li key={'page_' + page} className={'page-item' + (page === currentPage ? ' active' : '')}>
                                <button
                                    className="page-link"
                                    onClick={() => {
                                        onPageChange(page);
                                    }}
                                >
                                    {page}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );
    }
    return null;
};
Pagination.propTypes = {
    itemCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;
