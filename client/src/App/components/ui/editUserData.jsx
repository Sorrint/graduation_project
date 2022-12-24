import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import TextField from '../common/form/textField';
import RadioField from '../common/form/radioField';
import Avatar from '../common/form/avatar';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUserId, getUserById, updateUserData } from '../../store/users';
import BackHistoryButton from '../common/backButton';

const EditUserData = () => {
    const userId = useSelector(getCurrentUserId());
    const user = useSelector(getUserById(userId));
    const gender = [
        { name: 'male', value: 'мужской' },
        { name: 'female', value: 'женский' }
    ];
    const dispatch = useDispatch();
    const formName = 'edit-user-Form';
    const { username, avatar, email, sex } = user;
    const validationSchema = {
        username: {
            required: { value: true, message: 'Поле обязательно для заполнения' },
            minLength: { value: 6, message: 'Длина должна быть не менее 6 символов' }
        },
        email: {
            required: { value: true, message: 'Поле обязательно для заполнения' },
            pattern: { value: /^\S+@\S+\.\S+$/g, message: 'Некорректный e-mail' }
        }
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            username,
            avatar,
            email
        }
    });

    const onSubmit = (data) => {
        const updateData = { ...data, _id: user._id };
        dispatch(updateUserData(updateData));
    };
    return (
        <div className="content user-content">
            <div className="form-container__user-edit">
                <BackHistoryButton />
                <form className="form-container__form " onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="form-container__title">РЕДАКТИРОВАТЬ ПРОФИЛЬ</h1>
                    <TextField
                        label="Имя"
                        type="text"
                        name="username"
                        placeholder="имя"
                        register={register('username', { ...validationSchema.username })}
                        error={errors.username?.message}
                    />
                    <TextField
                        type="email"
                        name="email"
                        placeholder="email"
                        label="E-mail"
                        register={register('email', { ...validationSchema.email })}
                        formName={formName}
                        error={errors.email?.message}
                        autoComplete="new-password"
                    />

                    <RadioField label="Пол" name="sex" register={register} options={gender} value={sex} />
                    <Avatar name="avatar" label="Аватар" value={avatar} register={register} setValue={setValue} />
                    <button className="form-container__button">ОБНОВИТЬ</button>
                </form>
            </div>
        </div>
    );
};

EditUserData.propTypes = {
    user: PropTypes.object
};

export default EditUserData;
