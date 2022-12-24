import React from 'react';
import PropTypes from 'prop-types';
import Property from './property';
const PropertiesList = ({ icons, properties, wrapperName }) => {
    if (properties && icons) {
        return (
            <div className={`${wrapperName}__properties`}>
                {properties.map((property) => (
                    <Property property={property} icons={icons} wrapperName={wrapperName} key={property._id} />
                ))}
            </div>
        );
    }
};

PropertiesList.propTypes = {
    icons: PropTypes.array,
    properties: PropTypes.array,
    wrapperName: PropTypes.string
};
export default PropertiesList;
