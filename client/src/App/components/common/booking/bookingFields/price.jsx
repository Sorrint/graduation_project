import React from 'react';
import PropTypes from 'prop-types';
const RenderPrice = ({ cost }) => {
    return <>{cost} ₽</>;
};
RenderPrice.propTypes = {
    cost: PropTypes.number
};
export default RenderPrice;
