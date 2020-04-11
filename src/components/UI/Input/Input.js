import React from 'react';
import classes from './Input.css';

const input = props => {
    let InputElement = null;
    const inputClasses = [classes.InputElement]
    if (props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
    }
    let validationError = null;
    if (props.invalid && props.touched && props.elementConfig.name) {
        validationError = <p className={classes.ValidationError}>Please enter a valid {props.elementConfig.name}!</p>;
    }

    switch(props.elementType){
        case 'input':
            InputElement = <input
            className = {inputClasses.join(' ')} 
            {...props.elementConfig} 
            value = {props.value} 
            onChange = {props.changed}/>
            break;
        case 'textarea':
            InputElement = <textarea
            className = {inputClasses.join(' ')} 
            {...props.elementConfig} 
            value ={ props.value} 
            onChange = {props.changed}/>
            break;
        case 'select':
            InputElement = (<select
            className = {inputClasses.join(' ')} 
            value = {props.value} 
            onChange = {props.changed}>
            {props.elementConfig.options.map(option => (
                <option value = {option.value} key = {option.value}>{option.displayValue}</option>
            ))}
            </select>
            )
            break;
        default:
            InputElement = <input 
            className = {inputClasses.join(' ')}
            {...props.elementConfig} 
            value ={ props.value} 
            onChange = {props.changed}/>
    };

    return (
        <div className ={ classes.Input}>
            <label className = {classes.Label}>{props.label}</label>
            {InputElement}
            {validationError}
        </div>
    )
};

export default input;