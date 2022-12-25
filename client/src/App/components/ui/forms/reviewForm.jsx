import React, { useState } from 'react';

import TextAreaField from '../../common/form/textAreaField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../../../store/review';
import { getUserId } from '../../../services/localStorage.service';
import OverlayingPopup from '../../common/portal/overlayingPopup';

const ReviewForm = () => {
    const dispatch = useDispatch();
    const userId = useSelector(getUserId);

    const [active, setActive] = useState(false);
    const showPopup = () => {
        setActive((prevState) => !prevState);
    };

    const validationSchema = {
        review: {
            required: { value: true, message: 'Поле обязательно для заполнения' },
            minLength: { value: 6, message: 'Длина должна быть не менее 6 символов' }
        }
    };
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue
    } = useForm({ mode: 'onChange' });

    const onSubmit = (data) => {
        dispatch(createReview({ payload: data, userId }));
        setValue('content', '');
        showPopup();
    };
    return (
        <>
            <div className="review__container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextAreaField
                        rows={7}
                        label="Отзыв"
                        type="text"
                        name="review"
                        placeholder="Введите сюда текст"
                        register={register('content', { ...validationSchema.review })}
                        error={errors.content?.message}
                    />
                    <div className="review__button">
                        <button className="info-button" disabled={!isValid}>
                            Опубликовать
                        </button>
                    </div>
                </form>
            </div>
            <OverlayingPopup isOpened={active} onClose={showPopup}>
                <div className="popup__content">
                    <div className="popup__message">
                        <p className="popup__text">
                            {'Ваш отзыв успешно опубликован! Все отзывы можете посмотреть на странице отзывов))'}
                        </p>
                    </div>
                    <button className="confirm-button" onClick={showPopup}>
                        Отлично!
                    </button>
                </div>
            </OverlayingPopup>
        </>
    );
};

export default ReviewForm;

ReviewForm.propTypes = {
    onSubmit: PropTypes.func
};
