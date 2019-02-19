import React, { Fragment } from 'react';
import cssClasses from './Layout.module.css';

const layout = (props) => (
    <Fragment>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={cssClasses.content}>
            {props.children}
        </main>
    </Fragment>
);

export default layout;