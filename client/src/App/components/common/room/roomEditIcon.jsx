import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { icons } from '../../../api/icons';

const RoomEditIcon = ({ room, onSelect }) => {
    return (
        <div role="button" className="edit-button" onClick={() => onSelect(room)}>
            {parse(`${icons.edit}`)}
        </div>
    );
};

RoomEditIcon.propTypes = {
    room: PropTypes.object,
    onSelect: PropTypes.func
};
export default RoomEditIcon;
