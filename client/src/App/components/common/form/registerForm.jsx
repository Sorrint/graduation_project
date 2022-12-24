import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signUp } from '../../../store/users';
import Avatar from './avatar';
import RadioField from './radioField';
import TextField from './textField';
import { validator, existingMethods } from '../../../utils/validator';

const RegisterForm = () => {
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
        formState: { errors }
    } = useForm({ mode: 'onChange' });
    const gender = [
        { name: 'male', value: 'мужской' },
        { name: 'female', value: 'женский' }
    ];

    const onSubmit = (data) => {
        dispatch(signUp(data));
    };
    return (
        <div className="form-container sign-up-container">
            <form className="form-container__form " onSubmit={handleSubmit(onSubmit)}>
                <h1 className="form-container__title">РЕГИСТРАЦИЯ</h1>
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
                <button className="form-container__button">ЗАРЕГИСТРИРОВАТЬСЯ</button>
            </form>
        </div>
    );
};

export default RegisterForm;
