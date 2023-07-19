import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getCurrentUserId, getUserById } from '../../../store/users';
import { displayDate } from '../../../utils/displayDate';

const ReviewItem = ({ flipped, content, createdAt, user: userId, _id: id, onRemove }) => {
    const user = useSelector(getUserById(userId));
    const getClassName = (name) => {
        return flipped ? `review-message ${name}_flipped` : name;
    };
    const currentUserId = useSelector(getCurrentUserId());
    if (user) {
        return (
            <div className={getClassName('review-message')} key={id}>
                    <div className="review__user">
                            <img src={user.avatar} className="review__avatar" alt="avatar" width="65" height="65" />
                        <div className='review__info'>
                            <p className="review__username">
                                {user && user.username}
                            </p>
                            {currentUserId === userId && <button className="remove-button review__remove" onClick={() => onRemove(id)} />}
                            <span className="small">{displayDate(createdAt)}</span>
                        </div>
                    </div>
                    <div className="review__content">
                        <p className="small mb-0" key={id}>
                            {content}
                        </p>
                    </div>
            </div>
        );
    }
};

export default ReviewItem;

ReviewItem.propTypes = {
    content: PropTypes.string,
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pageId: PropTypes.string,
    user: PropTypes.string,
    _id: PropTypes.string,
    onRemove: PropTypes.func,
    flipped: PropTypes.bool,
    createdAt: PropTypes.string
};
