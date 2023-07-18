import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { signUp } from '../../../store/users';
import { existingMethods, validator } from '../../../utils/validator';
import Avatar from '../../common/form/avatar';
import RadioField from '../../common/form/radioField';
import TextField from '../../common/form/textField';

const RegisterForm = ({ setType }) => {
    const [apiError, setApiError] = useState('');
    const formName = 'sign-up-Form';
    const { isCapitalSymbol, isContainDigit } = existingMethods;
    const validationSchema = {
        username: {
            required: { value: true, message: 'Поле обязательно для заполнения' },
            minLength: { value: 6, message: 'Длина должна быть не менее 6 символов' }
        },
        email: {
            required: { value: true, message: 'Поле обязательно для заполнения' },
            pattern: { value: /^\S+@\S+\.\S+$/g, message: 'Некорректный e-mail' }
        },
        password: {
            required: { value: true, message: 'Поле обязательно для заполнения' },
            minLength: { value: 6, message: 'Длина должна быть не менее 6 символов' },
            validate: (value) => validator(value, [isCapitalSymbol, isContainDigit])
        }
    };

    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid }
    } = useForm({ mode: 'onChange' });
    const gender = [
        { name: 'male', value: 'мужской' },
        { name: 'female', value: 'женский' }
    ];

    const onSubmit = (data) => {
        dispatch(signUp({ payload: data, setApiError }));
    };
    return (
        <div className="form-container sign-up-container">
            <form className="form-container__form " onSubmit={handleSubmit(onSubmit)}>
                <h1 className="form-container__title">РЕГИСТРАЦИЯ</h1>
                <div className='form-container__fields'>
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
                    <TextField
                    label="Пароль"
                    type="password"
                    name="password"
                    placeholder="пароль"
                    register={register('password', { ...validationSchema.password })}
                    formName={formName}
                    error={errors.password?.message}
                    autoComplete="new-password"
                    />
                    <RadioField label="Пол" name="sex" register={register} options={gender} value="male" />
                    <Avatar
                        name="avatar"
                        label="Аватар"
                        value={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
                            .toString(36)
                            .substring(7)}.svg`}
                        register={register}
                        setValue={setValue}
                    />
                </div>
                {apiError && <div className="error-message">{apiError}</div>}
                <button
                    className={isValid ? `form-container__button` : `form-container__button_disabled`}
                    disabled={!isValid}
                >
                    ЗАРЕГИСТРИРОВАТЬСЯ
                </button>
                <div className="form-container__button form-container__button_form-type" onClick={() => setType('login-form')}>
                    ВОЙТИ
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;

RegisterForm.propTypes = {
    setType: PropTypes.func
};
