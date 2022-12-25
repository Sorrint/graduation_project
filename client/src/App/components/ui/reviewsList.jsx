import React from 'react';
import PropTypes from 'prop-types';
import ReviewItem from '../common/reviews/reviewItem';
const ReviewsList = ({ reviews, onRemove }) => {
    const transformedReviews = reviews.map((item, index) => {
        return index % 2 === 0 ? { ...item, flipped: false } : { ...item, flipped: true };
    });
    return transformedReviews.map((review) => <ReviewItem {...review} key={review._id} onRemove={onRemove} />);
};

export default ReviewsList;

ReviewsList.propTypes = {
    reviews: PropTypes.array,
    onRemove: PropTypes.func
};
