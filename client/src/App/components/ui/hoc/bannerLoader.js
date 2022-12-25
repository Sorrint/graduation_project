import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getBannersLoadingStatus, loadBannersList } from '../../../store/banner';

const BannerLoader = ({ children }) => {
    const dispatch = useDispatch();
    const bannerStatusLoading = useSelector(getBannersLoadingStatus());
    useEffect(() => {
        dispatch(loadBannersList());
    }, []);
    if (bannerStatusLoading) return 'Loading...';
    return children;
};

BannerLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default BannerLoader;
