import React from 'react';
import Footer from '../../common/footer';
import Banner from '../../ui/banner';
import Header from '../../ui/header';

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
