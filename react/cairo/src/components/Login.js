import React, { Component } from 'react'
import './../css/App.css'
import { Link } from 'react-router-dom'
import UserStore from '../stores/UserStore'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username : '',
      password : '',
      isLoggedIn : 0
    }

    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name] : evt.target.value
      })
    }

    this.userStore = new UserStore()

    this.login = () => {
      console.log(this.state.username)
      console.log(this.state.password)
        
      this.userStore.updateLoggedInStatus({
          username : this.state.username,
          password : this.state.password,
          isLoggedIn : 1              
      })
      window.location.reload(true)
    }

  }

  render() {
    this.userStore.getLoggedUser().then(() => {
      if(Object.keys(this.userStore.loggedUsers).length !== 0){
        this.props.history.push('/')
      }
  })
  return (
    <div className="wrapper-sign-in">
      <div className="form-wrapper-sign-in">
        <h1>Sign In</h1>
        <form>
          <div className="username">
            <label htmlFor="username">Username</label>
            <input
              placeholder="Username"
              type="username"
              name="username"
              onChange={ this.handleChange }
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              onChange={ this.handleChange }
            />
          </div>
          <div className="login">
            <button type="submit" onClick={ this.login }>Sign In</button>
            <Link style={ {color: 'black', textDecoration: 'none'} } to='/resetPassword'>
                    <small>Forgot Password?</small>
              </Link>
          </div>
        </form>
      </div>
    </div>
  );
  }
}

export default Login
