import React from 'react';
import classes from './AnswersList.css'
import AnswerItem from './AnswerItem/AnswerItem';

const AnswersList = props => (
    <ul className={classes.AnswersList}>
        {props.answers.map((answer, i) => {
            return (
                <AnswerItem 
                    key={i}
                    answer={answer}
                    onAnswerClick={props.onAnswerClick}
                    state={props.state ? props.state[answer.id] : null}
                />
            )
        })}
    </ul>
)

export default AnswersList