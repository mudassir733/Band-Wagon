import React from 'react';
import Button from './Button';

const IconButton = ({ label, disabled }) => {
    return (
        <Button variant="icon" label={label} icon={true} disabled={disabled} />
    );
};

export default IconButton;
