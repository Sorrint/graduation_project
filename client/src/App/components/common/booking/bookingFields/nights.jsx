import React from 'react';
import PropTypes from 'prop-types';
import { renderNights } from '../../../../utils/utils';
const RenderNights = ({ countDays }) => {
    return <>{renderNights(countDays)}</>;
};

RenderNights.propTypes = {
    countDays: PropTypes.number
};
export default RenderNights;
