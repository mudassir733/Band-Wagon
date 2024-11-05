import React from 'react';
import Button from './Button';

const FilledButton = ({ label, icon, disabled }) => {
    return (
        <Button variant="filled" label={label} icon={icon} disabled={disabled} />
    );
};

export default FilledButton;