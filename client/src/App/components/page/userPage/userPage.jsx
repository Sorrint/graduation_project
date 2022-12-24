import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../../common/footer';
import HeaderTop from '../../common/header/headerTop';
import SideBar from '../../ui/sideBar';

const UserPage = ({ children }) => {
    return (
        <>
            <HeaderTop />
            <div className="wrapper user-wrapper">
                <SideBar />
                {children}
            </div>
            <Footer />
        </>
    );
};

UserPage.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
export default UserPage;
