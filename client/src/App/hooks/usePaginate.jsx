import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const usePaginate = (items, pageSize = 3, page = 1) => {
    const [currentPageSize, setPageSize] = useState(pageSize);
    const [currentPage, setCurrentPage] = useState(page);

    useEffect(() => {
        if (items.length < pageSize) setCurrentPage(1);
    }, [items, pageSize]);

    const itemsCrop = [...items].splice((currentPage - 1) * currentPageSize, currentPageSize);

    return { itemsCrop, currentPage, setPageSize, setCurrentPage, currentPageSize, itemsList: items };
};

usePaginate.propTypes = {
    items: PropTypes.array,
    pageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    page: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
export default usePaginate;
