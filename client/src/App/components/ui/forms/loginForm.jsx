import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/users';
import PropTypes from 'prop-types';

import history from '../../../utils/history';
import TextField from '../../common/form/textField';

const LoginForm = ({ setType }) => {
    const [apiError, setApiError] = useState('');
    const dispatch = useDispatch();
    const formName = 'sign-in-Form';

    const validationSchema = {
        email: {
            required: { value: true, message: 'Поле обязательно для заполнения' },
            pattern: { value: /^\S+@\S+\.\S+$/g, message: 'Некорректный e-mail' }
        },
        password: {
            required: { value: true, message: 'Поле обязательно для заполнения' }
        }
    };
    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({ mode: 'onChange' });
    const onSubmit = (data) => {
        const redirect = history.location?.state ? history.location.state.from.pathname : '/';
        dispatch(login({ payload: data, redirect, setApiError }));
    };

    return (
        <div className="form-container sign-in-container">
            <form className="form-container__form" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="form-container__title">ВХОД</h1>
                <div className='form-container__fields'>
                    <TextField
                    type="email"
                    name="email"
                    placeholder="email"
                    label="E-mail"
                    register={register('email', { ...validationSchema.email })}
                    formName={formName}
                    autoComplete="username"
                    error={errors.email?.message}
                    />
                    <TextField
                    label="Пароль"
                    type="password"
                    name="password"
                    placeholder="пароль"
                    register={register('password', { ...validationSchema.password })}
                    formName={formName}
                    autoComplete="current-password"
                    error={errors.password?.message}
                    />
                </div>
                {apiError && <div className="error-message">{apiError}</div>}
                <button className="form-container__button" disabled={!isValid}>
                    ВОЙТИ
                </button>
                <div className="form-container__button" onClick={() => setType('signup-form')}>
                    РЕГИСТРАЦИЯ
                </div>
            </form>
        </div>
    );
};

export default LoginForm;

LoginForm.propTypes = {
    setType: PropTypes.func
};
