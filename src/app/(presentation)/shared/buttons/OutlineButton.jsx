import React from 'react';
import Button from './Button';

const OutlinedButton = ({ label, icon, disabled }) => {
    return (
        <Button variant="outlined" label={label} icon={icon} disabled={disabled} />
    );
};

export default OutlinedButton;
