import React from 'react';
import PropTypes from 'prop-types';
import { getIconContent } from '../../../../utils/utils';
const Property = ({ property, wrapperName, icons }) => {
    return (
        <div className={`${wrapperName}__property`} key={property.icon}>
            <i className={`${wrapperName}__icon`}>{getIconContent(icons, property.icon)}</i>
            <span className={`${wrapperName}__text`}>{property.text}</span>
        </div>
    );
};

Property.propTypes = {
    property: PropTypes.object,
    wrapperName: PropTypes.string,
    icons: PropTypes.array
};
export default Property;
