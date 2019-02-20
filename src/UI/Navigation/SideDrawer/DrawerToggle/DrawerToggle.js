import React from 'react';
import Logo from '../../../Logo/Logo';
import cssClasses from './DrawerToggle.module.css';

const drawerToggle = (props) => (
 
    <div className={cssClasses.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;