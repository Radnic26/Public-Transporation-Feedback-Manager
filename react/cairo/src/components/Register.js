import React, { Component } from 'react'
import './../css/App.css'
import UserStore from '../stores/UserStore'
import { Link } from 'react-router-dom'

class Register extends Component {
    constructor(props) {
      super(props)
      this.state = {
        firstName : '',
        lastName : '',
        email : '',
        username : '',
        password : ''
      }

      this.handleChange = (evt) => {
        this.setState ({
          [evt.target.name] : evt.target.value
        })
      }

      this.userStore = new UserStore()

      this.add = () => {
        let user = {
          firstName : this.state.firstName,
          lastName : this.state.lastName,
          email : this.state.email,
          username : this.state.username,
          password : this.state.password
        }

        this.userStore.addUser(user)
        this.props.history.push('/login')

      }
    }

    render() {
      return (
        <div className="wrapper">
          <div className="form-wrapper">
            <h1>Create Account</h1>
            <form>
              <div className="firstName">
                <label htmlFor="firstName">First Name</label>
                <input
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  onChange={ this.handleChange }
                />
              </div>
              <div className="lastName">
                <label htmlFor="lastName">Last Name</label>
                <input
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  onChange={ this.handleChange }
                />
              </div>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  placeholder="Email"
                  type="email"
                  name="email"
                  onChange={ this.handleChange }
                />
              </div>
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
              <div className="confirmPassword">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  placeholder="Confirm Password"
                  type="confirmPassword"
                  name="password"
                  onChange={ this.handleChange }
                />
              </div>
              <div className="createAccount">
                <button type="submit" onClick={ this.add }>Sign Up</button>
                <Link style={{ color: 'black' , textDecoration: 'none'}} to='/login'>
                    <small>Already Have an Account?</small>
                </Link>
              </div>
            </form>
          </div>
        </div>
      )
    }
}

export default Register