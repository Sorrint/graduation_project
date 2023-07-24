import React from 'react';
import ReviewForm from '../../ui/forms/reviewForm';
const Review = () => {
    return (
        <div className="reviews">
            <h2 className="reviews__title">Оставьте свой отзыв</h2>
            <ReviewForm />
        </div>
    );
};

export default Review;
