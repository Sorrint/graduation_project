import React from 'react';
import BannerByRoute from './bannerByRoute';
import BannerHandle from './bannerHandle';
import PropTypes from 'prop-types';
import BannerLoader from '../../ui/hoc/bannerLoader';

const Banner = ({ imgClassName, text }) => {
    return (
        <>
            <BannerLoader>
                {imgClassName ? <BannerHandle name={imgClassName} text={text} /> : <BannerByRoute />}
            </BannerLoader>
        </>
    );
};

Banner.propTypes = {
    imgClassName: PropTypes.string,
    text: PropTypes.string
};
export default Banner;
