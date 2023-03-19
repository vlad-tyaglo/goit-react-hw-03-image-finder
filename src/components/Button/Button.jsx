import React from "react";
import css from './Button.module.css';
import PropTypes from "prop-types";

const Button = ({children, onClick}) => (
    <div className={css.buttonWrapper}>
        <button type="button" className={css.button} onClick={onClick}>{children}</button>
    </div>
)

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Button;