import React from 'react';
import ReviewForm from '../../ui/forms/reviewForm';
const Review = () => {
    return (
        <div className="reviews">
            <h1 className="reviews__title">Оставьте свой отзыв</h1>
            <ReviewForm />
        </div>
    );
};

export default Review;
