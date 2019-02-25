import React from 'react';
import cssClasses from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [cssClasses.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(cssClasses.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.change} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.change} />;
            break;
        case ('select'):
            inputElement = (<select
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.change}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>)
            break;
        default:
            inputElement = <input
                className={cssClasses.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.change} />;
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={cssClasses.ValidationError}>Please enter a valid value</p>;
    }


    return (
        <div className={cssClasses.Input}>
            <label className={cssClasses.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default input;