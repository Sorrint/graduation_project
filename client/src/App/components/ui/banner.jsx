import React from 'react';
import PropTypes from 'prop-types';
import BannerLoader from './hoc/bannerLoader';
import BannerHandle from '../common/banner/bannerHandle';
import BannerByRoute from '../common/banner/bannerByRoute';

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
