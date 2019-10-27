import React from 'react';
import classes from './FinishQuiz.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

const FinishQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key) =>{
        if(props.results[key] === 'success'){
            total++
        }
        return total
    }, 0)

    return (
        <div className={classes.FinishQuiz}>
            <ul>
                {props.quiz.map((quizItem, i)=>{
                    const cls =[
                        'fa', 
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ]
                    return (
                        <li key={i}>
                            <strong>{i+1}</strong>&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                })}
            </ul>
            <p>{successCount} to {props.quiz.length}</p>
            <div>
                <Button onClick={props.onRetry} type="primary">Repeat</Button>
                <Link to={'/'}>
                    <Button type="success">Go to test list</Button>
                </Link>
            </div>
        </div>
    )
}
export default FinishQuiz