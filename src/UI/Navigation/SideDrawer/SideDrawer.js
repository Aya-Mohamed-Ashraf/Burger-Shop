import React, { Fragment } from 'react';
import cssClasses from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../Backdrop/Backdrop';

const sideDrawer = (props) => {

    let attachedClasses = [cssClasses.SideDrawer, cssClasses.Close];
    if (props.open) {
        attachedClasses = [cssClasses.SideDrawer, cssClasses.Open];
    }
    return (
        <Fragment>
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <Logo height="10%" />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
    );
};

export default sideDrawer;