import React from 'react';
import cssClasses from './Logo.module.css';
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = (props) => (
    <div className={cssClasses.Logo} style={{ height: props.height }}>
        <img src={burgerLogo} alt="My Burger" />
    </div >
);

export default logo;