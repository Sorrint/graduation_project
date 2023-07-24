import React from 'react';
import PropTypes from 'prop-types';
const BannerHandle = ({ name, text }) => {
    return (
        <>
            <div className="banner">
                <div className={`banner${name}`}>
                    <div className="banner__filter">
                        <div className="banner__title">
                            <h2 className="banner__text">{text}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

BannerHandle.propTypes = {
    name: PropTypes.string,
    text: PropTypes.string
};
export default BannerHandle;
