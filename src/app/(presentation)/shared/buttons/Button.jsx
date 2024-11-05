import React from 'react';
import styles from './button.module.css';

const Button = ({ variant = 'filled', icon, label, disabled }) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${disabled ? styles.disabled : ''}`}
            disabled={disabled}
        >
            {icon && <span className={styles.icon}>+</span>}
            {label}
        </button>
    );
};

export default Button;
