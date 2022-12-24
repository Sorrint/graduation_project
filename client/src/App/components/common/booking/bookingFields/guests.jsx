import React from 'react';
import PropTypes from 'prop-types';
import { renderGuests } from '../../../../utils/utils';
const RenderGuests = ({ numberOfGuests }) => {
    return <>{renderGuests(numberOfGuests)}</>;
};

RenderGuests.propTypes = {
    numberOfGuests: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
export default RenderGuests;
