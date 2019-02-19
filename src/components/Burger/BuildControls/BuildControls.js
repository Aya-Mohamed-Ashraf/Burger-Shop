import React from 'react';
import cssClasses from './BuildControls.module.css';
import BuildControl from '../BuildControls/BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];


const buildControls = (props) => (
    <div className={cssClasses.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)} $</strong></p>
        {controls.map(ctrl =>
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                moreIsClicked={() => props.ingredientAddHandler(ctrl.type)}
                lessIsClicked={() => props.ingredientRemoveHandler(ctrl.type)}
                disabledLessButton={props.disableLessButtonInfo[ctrl.type]} />)}
        <button
            className={cssClasses.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered} >ORDER NOW</button>
    </div>
);

export default buildControls;