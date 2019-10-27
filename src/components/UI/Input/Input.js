import React from 'react';
import classes from './Input.css'

function isInvalied({valid, touched, shouldValidate}){
    return !valid && shouldValidate && touched
}

const Input = (props) => {

    const inputType = props.type || 'text'
    const htmlFor = `${inputType}-${Math.random()}`
    const cls = [
        classes.Input,
    ]
    if(isInvalied(props)){
        cls.push(classes.invalied)
    }

    return(
        <div className={cls.join(' ')}>
            <label htmlFor="">{props.label}</label>
            <input 
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            {isInvalied(props) 
            ? <span>{props.errorMessage || 'put correct value'}</span>
            : null}
            
        </div>

    )
}
export default Input