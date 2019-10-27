import React from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishQuiz from '../../components/FinishQuiz/FinishQuiz'

class Quiz extends React.Component{
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                id: 1,
                question: 'what color is sky',
                rightAnswerId: 2,
                answers: [
                    {text: 'black', id: 1},
                    {text: 'blue', id: 2},
                    {text: 'red', id: 3},
                    {text: 'green', id: 4},
                ]
            },
            {
                id: 2,
                question: 'What year was St. Petersburg founded in',
                rightAnswerId: 3,
                answers: [
                    {text: '1701', id: 1},
                    {text: '1702', id: 2},
                    {text: '1703', id: 3},
                    {text: '1704', id: 4},
                ]
            },
        ]
    }
    onAnswerClickHandler = answerId =>{
        if(this.state.answerState){
            const key = Object.keys(this.state.answerState)[0]
            if(this.state.answerState[key] ==='success'){
                return 
            }
        }
       
        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results
        if(question.rightAnswerId === answerId){
            if(!results[question.id]){
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })
        
            const timeout = window.setTimeout(() => {
                if(this.isQuizFinished()){
                    this.setState({
                        isFinished: true
                    })
                }else{
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)

        }else{
            results[answerId] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }
    isQuizFinished(){
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }
    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }
    render(){
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer the question</h1>
                    {this.state.isFinished 
                    ? <FinishQuiz 
                        results={this.state.results}
                        quiz={this.state.quiz}
                        onRetry={this.retryHandler}
                      />
                    : <ActiveQuiz 
                        answers={this.state.quiz[this.state.activeQuestion].answers}
                        question={this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion + 1}
                        state={this.state.answerState}
                    />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz