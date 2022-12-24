import React from 'react';
import PropTypes from 'prop-types';

const TableBody = ({ columns, data, tableName }) => {
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === 'function') {
                return component(item);
            }
            return component;
        }
        return item[columns[column].path];
    };
    return (
        <tbody>
            {data.map((item) => (
                <tr key={item._id} className={`${tableName}__row`}>
                    {Object.keys(columns).map((column) => (
                        <td key={column} className={`${tableName}__value`}>
                            {renderContent(item, column)}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

TableBody.propTypes = {
    columns: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    tableName: PropTypes.string
};
export default TableBody;
