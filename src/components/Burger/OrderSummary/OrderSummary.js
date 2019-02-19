import React, { Fragment } from 'react';
import Button from '../../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(key => {
            return (
                <li key={key}>
                    <span style={{ textTransform: 'capitalize' }}>{key}</span>:{props.ingredients[key]}
                </li>
            )
        });
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price : {props.price.toFixed(2)} $</strong></p>
            <p>Continue for checkout ?</p>
            <Button btnType="Danger" clicked={props.cancelClicked}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continueClicked}>CONTINUE</Button>
        </Fragment>
    )
};

export default orderSummary;