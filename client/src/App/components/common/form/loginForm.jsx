import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/users';
import TextField from './textField';
import history from '../../../utils/history';

const LoginForm = () => {
    const dispatch = useDispatch();
    const formName = 'sign-in-Form';
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm();
    const onSubmit = (data) => {
        const redirect = history.location?.state ? history.location.state.from.pathname : '/';
        dispatch(login({ payload: data, redirect, setError }));
    };

    return (
        <div className="form-container sign-in-container">
            <form className="form-container__form" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="form-container__title">ВХОД</h1>
                <TextField
                    type="email"
                    name="email"
                    placeholder="email"
                    label="E-mail"
                    register={register('email')}
                    formName={formName}
                    autoComplete="username"
                />
                <TextField
                    label="Пароль"
                    type="password"
                    name="password"
                    placeholder="пароль"
                    register={register('password')}
                    formName={formName}
                    autoComplete="current-password"
                />
                {errors?.apiError?.message && <div className="error">{errors?.apiError?.message}</div>}
                <button className="form-container__button">ВОЙТИ</button>
            </form>
        </div>
    );
};

export default LoginForm;
