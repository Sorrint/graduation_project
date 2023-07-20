import React, { useState } from 'react';

import Footer from '../../common/footer';
import OverlayLogin from '../../common/form/overlayLogin';
import LoginForm from '../../ui/forms/loginForm';
import RegisterForm from '../../ui/forms/registerForm';
import Header from '../../ui/header';

const LoginPage = () => {
    const [formType, setFormType] = useState('login-form');
    const handleClick = (formType) => {
        setFormType(formType);
    };
    const formName = (formType) => {
        return formType;
    };

    return (
        <>
            <Header />
            <div className="wrapper wrapper__login">
                <div className={formName(formType)}>
                    <LoginForm setType={handleClick}/>
                    <RegisterForm setType={handleClick}/>
                    <OverlayLogin setType={handleClick} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LoginPage;
