import React from 'react'
import classes from './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import axios from 'axios'
class Auth extends React.Component{

    state = {
        isFormValid: false,
        formControls:{
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Put correct email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Put correct password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }
    logInHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
            
        }
        try{
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDGsaCpoeNZtzqkCE0qZpGTo_UdvOIUPOg', authData)
            console.log(response.data)

        }catch(e){
            console.log(e)
        }
    }
    logUpHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
            
        }
        try{
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDGsaCpoeNZtzqkCE0qZpGTo_UdvOIUPOg', authData)
            console.log(response.data)

        }catch(e){
            console.log(e)
        }
    }
    submitHandler = e => {e.preventDefault()}
    validateControl(value, validation){
        if(!validation){
            return true
        }else{
            let isValid = true
            
            if(validation.required){
                isValid = value.trim() !== '' && isValid
            }
            if(validation.email){
                isValid = is.email(value) && isValid
            }
            if(validation.minLength){
                isValid = value.length >= validation.minLength && isValid
            }

            return isValid
        }
    }
    onChangeHandler = (e, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.value = e.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }
    renderInputs(){
        return Object.keys(this.state.formControls).map((controlName, i) => {
            const control = this.state.formControls[controlName]
            return (
                <Input 
                    key={controlName + i}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={e => this.onChangeHandler(e, controlName)}
                />
            )
        })
    }

    render(){
        return(
            <div className={classes.Auth}>
                <div>
                    <h1>Sign Up</h1>

                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        
                        { this.renderInputs() }

                        <Button 
                            type='success'
                            onClick={this.logInHandler}
                            disabled={!this.state.isFormValid}
                        > Sign In</Button>
                        <Button 
                            type='primary'
                            onClick={this.logUpHandler}
                            disabled={!this.state.isFormValid}
                        > Sign Up</Button>
                    </form>
                </div>
            </div>
        )
    }
}
export default Auth