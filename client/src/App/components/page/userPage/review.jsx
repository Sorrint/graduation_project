import React from 'react';
import ReviewForm from '../../ui/forms/reviewForm';
const Review = () => {
    return (
        <div className="admin-panel">
            <h1 className="admin-panel__title">Оставьте свой отзыв</h1>
            <ReviewForm />
        </div>
    );
};

export default Review;
