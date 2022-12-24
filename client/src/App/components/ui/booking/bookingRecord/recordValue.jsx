import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const RecordValue = ({ recordField, data, wrapperName }) => {
    const renderContent = (field, data) => {
        if (field.component && typeof field.component === 'function') {
            const component = field.component;
            return component(data);
        }
        return _.get(data, field.path);
    };

    return <div className={`${wrapperName}__value`}>{renderContent(recordField, data)}</div>;
};

RecordValue.propTypes = {
    recordField: PropTypes.object,
    data: PropTypes.object,
    wrapperName: PropTypes.string
};
export default RecordValue;
