import React from 'react';
import classes from './QuizCreator.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Select from '../../components/UI/Select/Select'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import {createControl, validate, validateForm} from '../../form/formFramework'

function createOptionControl(number){
    return createControl({
        label: `case ${number}`,
        errorMessage: 'the value cannot be empty',
        id: number
    }, {required: true})
}

function createFormControls(){
    return {
        question: createControl({
            label: 'write a question',
            errorMessage: 'the question cannot be empty'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class QuizCreator extends React.Component{
    state ={
        isFormValid: false,
        rightAnswerId: 1,
        quiz: [],
        formControls: createFormControls()
    }
    submitHandler = e => {e.preventDefault()}

    addQuestionHandler = e => {
        e.preventDefault()

        const quiz = this.state.quiz.concat()
        const index = quiz.length + 1
        const {question, option1, option2, option3, option4} = this.state.formControls
        const questionItem = {
            question: this.state.formControls.question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ] 
        }
        quiz.push(questionItem)
        this.setState({
            quiz, 
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()

        })
    }
    createQuizHandler = e => {
        e.preventDefault()
        console.log(this.state.quiz);
        
    }

    onChangeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)
        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, 
            isFormValid: validateForm(formControls)
        })
    }
    renderControls(){
        return Object.keys(this.state.formControls).map((controlName, i) => {
            const control = this.state.formControls[controlName]
            return (
                <Auxiliary key={controlName + i}>
                    <Input 
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={e => this.onChangeHandler(e.target.value, controlName)}
                        type={control.type}
                    />
                    { i === 0 ? <hr /> : null }
                </Auxiliary>

            )
        })
    }
    selectChangeHandler = e => {
        this.setState({
            rightAnswerId: +e.target.value
        })       
    }
    render(){
        const select = 
        <Select 
            label="choose right answer"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4},
            ]}
        />
        return(
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Quiz Creator</h1>
                    <form onSubmit={this.submitHandler}>

                    { this.renderControls() }

                    { select }

                    <Button
                        type='primary'
                        onClick={this.addQuestionHandler}
                        disabled={!this.state.isFormValid}
                    >
                        add question
                    </Button>
                    <Button
                        type='success'
                        onClick={this.createQuizHandler}
                        disabled={this.state.quiz.length === 0}
                    >
                        create quiz
                    </Button>

                    </form>
                </div>
            </div>
        )
    }
}
export default QuizCreator