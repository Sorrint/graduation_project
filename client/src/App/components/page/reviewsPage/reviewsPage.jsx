import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import usePaginate from '../../../hooks/usePaginate';
import { getReviews, getReviewsLoadingStatus, removeReview } from '../../../store/review';
import Footer from '../../common/footer';
import Loader from '../../common/loader';
import Pagination from '../../common/pagination';
import Header from '../../ui/header';
import ReviewsList from '../../ui/reviewsList';
const ReviewsPage = () => {
    const dispatch = useDispatch();
    const reviews = useSelector(getReviews());
    const reviewsLoadingStatus = useSelector(getReviewsLoadingStatus());

    const { itemsCrop, currentPage, currentPageSize, setCurrentPage, itemsList } = usePaginate(reviews || [], 5);
    const count = itemsList.length;
    const handleRemove = (id) => {
        dispatch(removeReview(id));
    };

    if (reviewsLoadingStatus) {
        return <Loader />;
    }
    if (itemsCrop) {
        return (
            <>
                <Header />
                <div className="wrapper">
                    <div className="content reviews-content">
                        <ReviewsList reviews={itemsCrop} onRemove={handleRemove} />
                        <div className="pagination__container">
                            <Pagination
                                itemCount={count}
                                pageSize={currentPageSize}
                                currentPage={currentPage}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
};

export default ReviewsPage;
