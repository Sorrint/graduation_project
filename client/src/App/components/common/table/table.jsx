import React from 'react';
import PropTypes from 'prop-types';
import TableBody from './tableBody';
import TableHeader from './tableHeader';

const Table = ({ onSort, selectedSort, columns, data, children, tableName }) => {
    return (
        <>
            <table className={tableName || 'table'}>
                {children || (
                    <>
                        <TableHeader {...{ onSort, selectedSort, columns, tableName }} />
                        <TableBody {...{ columns, data, tableName }} />
                    </>
                )}
            </table>
        </>
    );
};

Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array,
    tableName: PropTypes.string
};

export default Table;
