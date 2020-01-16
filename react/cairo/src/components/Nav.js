import React, { Component } from 'react'
import './../css/App.css'
import Logo from '../media/cairo.png'
import UserStore from '../stores/UserStore'
import { Link } from 'react-router-dom'

class Nav extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoggedIn : false
        }

        this.response = ''

        this.userStore = new UserStore()

        this.userStore.getLoggedUser().then(() => {
            if(Object.keys(this.userStore.loggedUsers).length === 0){
                this.setState({isLoggedIn : false})
                this.forceUpdate()
            } else {
                this.setState({isLoggedIn : true})
                this.forceUpdate()
            }
        })

    }
    
    render() {
        
        if(this.state.isLoggedIn === true) {
    return (
      <nav>
        <Link to='/'>
            <img style={  { height: 80, width: 95 } } src={ Logo } alt="website logo"/>
        </Link>
        <ul className="nav-links">
            <Link style={ { color: 'lightblue', textDecoration: 'none' } } to='/addReview'>
                <li>Add Review</li>
            </Link>
            <Link style={ { color: 'lightblue', textDecoration: 'none' } } to='/account'>
                <li>Account</li>
            </Link>
        </ul>
    </nav>
  );
    }
    else if (this.state.isLoggedIn === false){
        
        return (
            <nav>
              <Link to='/'>
                  <img style={  { height: 80, width: 95 } } src={ Logo } alt="website logo"/>
              </Link>
              <ul className="nav-links">
                  <Link style={ { color: 'lightblue', textDecoration: 'none' } } to='/login'>
                      <li>Login</li>
                  </Link>
                  <Link style={ { color: 'lightblue', textDecoration: 'none' } } to='/register'>
                      <li>Sign Up</li>
                  </Link>
              </ul>
          </nav>
        );
    }
    else 
    return 'da'
    }
}

export default Nav
