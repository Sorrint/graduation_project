import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getCurrentUserId, getUserById } from '../../../store/users';
import { displayDate } from '../../../utils/displayDate';

const ReviewItem = ({ flipped, content, createdAt, user: userId, _id: id, onRemove }) => {
    const user = useSelector(getUserById(userId));
    const getClassName = (name) => {
        return flipped ? `${name}__flipped` : name;
    };
    const currentUserId = useSelector(getCurrentUserId());
    if (user) {
        return (
            <div className={getClassName('review-message')} key={id}>
                <div className="message">
                    <div className="message__user">
                        <img src={user.avatar} className="message__avatar" alt="avatar" width="65" height="65" />
                        <p className="message__info">
                            {user && user.username}
                            <span className="small">{displayDate(createdAt)}</span>
                        </p>
                        {currentUserId === userId && <button className="remove-button" onClick={() => onRemove(id)} />}
                    </div>
                    <div className="message__content">
                        <div className="d-flex justify-content-between align-items-center"></div>
                        <p className="small mb-0" key={id}>
                            {content}
                        </p>
                    </div>
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
