import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { icons } from '../../../api/icons';

const TableHeader = ({ columns, onSort, selectedSort, tableName }) => {
    const handleSort = (item) => {
        if (selectedSort) {
            if (selectedSort.path === item) {
                onSort((selectedSort) => ({ ...selectedSort, order: selectedSort.order === 'asc' ? 'desc' : 'asc' }));
            } else {
                onSort({ path: item, order: 'asc' });
            }
        }
    };

    const renderArrow = (selectedSort, column) => {
        if (selectedSort) {
            if (selectedSort.path === columns[column].path) {
                return selectedSort.order === 'asc' ? (
                    <i className="sort-direction">{parse(icons.downArrow)}</i>
                ) : (
                    <i className="sort-direction">{parse(icons.upArrow)} </i>
                );
            }
        }
    };
    return (
        <thead className={`${tableName}__header`}>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        className={`${tableName}__title`}
                        key={columns[column].name}
                        onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
                        {...{ role: columns[column].path && 'button' }}
                        scope="col"
                    >
                        {columns[column].name} {renderArrow(selectedSort, column)}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    columns: PropTypes.object,
    tableName: PropTypes.string,
    onSort: PropTypes.func,
    selectedSort: PropTypes.object
};
export default TableHeader;
