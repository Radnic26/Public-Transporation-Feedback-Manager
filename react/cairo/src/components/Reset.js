import React, { Component } from 'react'
import UserStore from '../stores/UserStore'
import './../css/App.css'
// import { Redirect } from 'react-router-dom'

class Reset extends Component {
    constructor(props) {
      super(props)
      this.state = {
        username : '',
        password : '',
        confirmPassword : ''
      }

      this.handleChange = (evt) => {
        this.setState({
          [evt.target.name] : evt.target.value
        })
      }

      this.userStore = new UserStore();

      this.reset = () => {
        let user = {
          username : this.state.username,
          password : this.state.password
        }

        if(this.state.password === this.state.confirmPassword) {
          this.userStore.changePassword(user).then(response => {
            if(response.status === 202) {
              this.props.history.push('/login');
            }
          })
        }
        else {
          window.alert("passwords doesn't match")
        }
      }
    }

    render() { 
    return (
        <div className="wrapper-sign-in">
          <div className="form-wrapper-sign-in">
            <h1>Reset Password</h1>
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
                <label htmlFor="password">New Password</label>
                <input
                  placeholder="New Password"
                  type="password"
                  name="password"
                  onChange={ this.handleChange }
                />
              </div>
              <div className="confirmPassword">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  placeholder="Confirm New Password"
                  type="password"
                  name="confirmPassword"
                  onChange={ this.handleChange }
                />
              </div>
              <div className="login">
                  <button type="submit" value="Reset" onClick={ this.reset }>Reset Password</button>
              </div>
            </form>
          </div>
        </div>
      );
    }
}

export default Reset
