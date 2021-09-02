import React from 'react';
import './styles.scss';

const GenericButton = ({text, type, disabled}) => {
    return (
        <button type={type} disabled={disabled} className='genericBtn'>
            {text}
        </button>
    )
}

export default GenericButton
