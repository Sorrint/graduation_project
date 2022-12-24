import React, { useState } from 'react';
import Footer from '../../common/footer';
import LoginForm from '../../common/form/loginForm';
import OverlayLogin from '../../common/form/overlayLogin';
import RegisterForm from '../../common/form/registerForm';
import Header from '../../common/header/header';

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
            <div className="wrapper">
                <div className={formName(formType)}>
                    <LoginForm />
                    <RegisterForm />
                    <OverlayLogin setType={handleClick} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LoginPage;
