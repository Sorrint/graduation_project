import React from 'react';
import Footer from '../../common/footer';
import Header from '../../common/header/header';
import Banner from '../../common/banner/banner';
const NewsPage = () => {
    return (
        <>
            <Header />
            <div className="wrapper">
                <Banner />
                <div className="content"></div>
            </div>
            <Footer />
        </>
    );
};

export default NewsPage;
