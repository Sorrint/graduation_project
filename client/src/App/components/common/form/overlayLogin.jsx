import React from 'react';
import PropTypes from 'prop-types';
const OverlayLogin = ({ setType }) => {
    const showSignInForm = () => {
        setType('login-form');
    };
    const showSignUpForm = () => {
        setType('signup-form');
    };
    return (
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Вход</h1>
                    <p>Для тех, у кого есть аккаунт</p>
                    <button className="overlay__button" id="signIn" onClick={showSignInForm}>
                        Войти
                    </button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Регистрация</h1>
                    <p>Если у вас еще нет аккаунта, то можете</p>
                    <button className="overlay__button" id="signUp" onClick={showSignUpForm}>
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </div>
    );
};

OverlayLogin.propTypes = {
    setType: PropTypes.func
};
export default OverlayLogin;
