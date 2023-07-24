import React from 'react';
import { useHistory } from 'react-router-dom';
import { icons } from '../../api/icons';
import parse from 'html-react-parser';

const BackHistoryButton = () => {
    const history = useHistory();

    return (
        <button className="info-button back-button" onClick={() => history.goBack()}>
            <i>{parse(icons.leftArrow)}</i>
            Вернуться
        </button>
    );
};

export default BackHistoryButton;
