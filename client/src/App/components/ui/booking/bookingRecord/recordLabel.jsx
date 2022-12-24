import React from 'react';
import PropTypes from 'prop-types';

const RecordLabel = ({ label, wrapperName }) => {
    return <div className={`${wrapperName}__label`}>{label}</div>;
};

RecordLabel.propTypes = {
    label: PropTypes.string,
    wrapperName: PropTypes.string
};
export default RecordLabel;
