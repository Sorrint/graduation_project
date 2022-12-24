import React from 'react';
import PropTypes from 'prop-types';
import RecordLabel from './recordLabel';
import RecordValue from './recordValue';
const RecordRow = ({ recordField, data, wrapperName }) => {
    const label = recordField.name;
    return (
        <div className={`${wrapperName}__record`}>
            <RecordLabel label={label} wrapperName={wrapperName} />
            <RecordValue recordField={recordField} data={data} wrapperName={wrapperName} />
        </div>
    );
};

RecordRow.propTypes = {
    recordField: PropTypes.object,
    data: PropTypes.object,
    wrapperName: PropTypes.string
};

export default RecordRow;
