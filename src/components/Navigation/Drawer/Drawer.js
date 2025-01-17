import React from 'react';
import classes from './Drawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import {NavLink} from 'react-router-dom'

const links = [
    {to: '/', label: 'List', exact: true},
    {to: '/auth', label: 'Log In', exact: false},
    {to: '/quiz-creator', label: 'Create Test', exact: false},
]

class Drawer extends React.Component{
    state = {
        menu: false
    }
    renderLinks(){
        return links.map((link, i) => {
            return (
                <li key={i}>
                    
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.props.onClose}
                    >
                        {link.label}
                    </NavLink>
                    
                </li>
            )
        })
    }
    render(){

        const cls = [classes.Drawer]

        if(!this.props.isOpen){
            cls.push(classes.close)
        }

        return(
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        { this.renderLinks() }
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        )
    }
}

export default Drawer