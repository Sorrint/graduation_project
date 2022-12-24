import React from 'react';
import parse from 'html-react-parser';
import { icons } from '../../api/icons';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__text">Все материалы для верстки взяты исключительно для учебных целей.</div>
            <div className="footer__whitespace"></div>
            <div className="footer__github">
                <div className="footer__icon">{parse(icons.gitHub)}</div>
                <div className="footer__text">Sorrint</div>
            </div>
        </div>
    );
};

export default Footer;
