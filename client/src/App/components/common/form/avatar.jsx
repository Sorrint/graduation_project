import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
const Avatar = ({ name, label, value, register, setValue }) => {
    const [avatar, setAvatar] = useState();
    useEffect(() => {
        setAvatar(value);
    }, []);
    const changeAvatar = (e) => {
        e.preventDefault();
        const newAvatar = `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
            .toString(36)
            .substring(7)}.svg`;
        setAvatar(newAvatar);
        setValue(`${name}`, newAvatar);
    };

    if (avatar) {
        return (
            <div className="avatar-container">
                <label className="avatar-container__label" htmlFor={name}>
                    {label}
                </label>

                <div className="avatar-container__group">
                    <img src={avatar} className="avatar-container__image" alt="" height="40" />
                    <input
                        type="text"
                        id={name}
                        value={avatar}
                        name={name}
                        className="avatar-container__input"
                        {...register(name)}
                    />
                    <button onClick={changeAvatar}>Сменить аватар</button>
                </div>
            </div>
        );
    }
};

Avatar.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    register: PropTypes.func,
    setValue: PropTypes.func
};
export default Avatar;
