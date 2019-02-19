import React from 'react';
import cssClasses from './BuildControl.module.css';

const buildControl = (props) => (
    <div className={cssClasses.BuildControl}>
        <div className={cssClasses.Label}>{props.label}</div>
        <button
            className={cssClasses.Less}
            onClick={props.lessIsClicked}
            disabled={props.disabledLessButton}>Less</button>
        <button className={cssClasses.More} onClick={props.moreIsClicked}>More</button>
    </div>
);

export default buildControl;