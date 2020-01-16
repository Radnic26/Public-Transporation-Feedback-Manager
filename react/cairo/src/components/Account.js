import React, { Component } from 'react'
import './../css/App.css'
import UserStore from '../stores/UserStore'
import ReviewStore from '../stores/ReviewStore'
import ReviewAccount from './ReviewAccount'

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing : false,
      reviews : [],
      id : '',
      firstName : '',
      lastName : '',
      email : '',
      username : '',
      password : ''
    }

    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name] : evt.target.value
      })
    }

    this.reviewStore = new ReviewStore()
    this.userStore = new UserStore()

    this.logout = () => {
      this.userStore.getLoggedUser().then(() => {
        var username = this.userStore.loggedUsers[0].username
        var password = this.userStore.loggedUsers[0].password
        this.userStore.updateLoggedInStatus({
          username: username,
          password: password,
          isLoggedIn : 0              
      })
      window.location.reload(true)
      this.props.history.push('/')
    })
    }

    this.edit = () => {
      this.setState({isEditing : true})
    }

    this.editAccount = () => {
      let student = {
        firstName : this.state.firstName,
        lastName : this.state.lastName,
        email : this.state.email,
        username : this.state.username
      }
      this.userStore.editUser(this.state.id, student)
      this.setState({isEditing : false})
      window.location.reload(true)
    }

    this.delete = () => {
        this.reviewStore.deleteUserReview(this.state.id)
        this.userStore.deleteUser(this.state.id)
        window.location.reload(true)
        this.props.history.push('/')
    }
  }

  componentDidMount() {
    var id = 0
    this.userStore.getLoggedUser().then(() => {
      if(typeof this.userStore.loggedUsers[0] !== 'undefined') {
      id = this.userStore.loggedUsers[0].id
      
      this.reviewStore.getUserReviews(id)
      this.reviewStore.emitter.addListener('GET_USER_REVIEWS_SUCCESS', () => {
        this.setState({
          reviews: this.reviewStore.reviews
        })
        
  })
  this.userStore.getLoggedUser().then(() => {
      this.setState({
          id : this.userStore.loggedUsers[0].id,
          firstName : this.userStore.loggedUsers[0].firstName,
          lastName : this.userStore.loggedUsers[0].lastName,
          email : this.userStore.loggedUsers[0].email,
          username : this.userStore.loggedUsers[0].username
        })
      })
      } else {
        console.log('da')
      }
  })
}

  render() {
    this.userStore.getLoggedUser().then(() => {
      if(Object.keys(this.userStore.loggedUsers).length === 0){
        this.props.history.push('/')
      }
  })
  if(this.state.isEditing) {
    return (
      <div className="Account">
        <div className="myAccount">My Account</div>
        <div className="wrappe">
          <div className="form-wrapper">
            <form>
              <div className="firstName">
                <label htmlFor="firstName">First Name</label>
                <input
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  onChange={ this.handleChange }
                  value={ this.state.firstName }
                />
              </div>
              <div className="lastName">
                <label htmlFor="lastName">Last Name</label>
                <input
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  onChange={ this.handleChange }
                  value={ this.state.lastName }
                />
              </div>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  placeholder="Email"
                  type="text"
                  name="email"
                  onChange={ this.handleChange }
                  value={ this.state.email }
                />
              </div>
              <div className="username">
                <label htmlFor="username">Username</label>
                <input
                  placeholder="Username"
                  type="text"
                  name="username"
                  onChange={ this.handleChange }
                  value={ this.state.username }
                />
              </div>
              <div className="createAccount">
                <button type="button" onClick={this.editAccount}>Edit Account</button>
              </div>
            </form>
          </div>
        </div>
        <div>
        {
          this.state.reviews.map((e, i) => <ReviewAccount key={i} item={e} />)
          
        }
        </div>
      </div>
    );
      }
      else {
        return (
          <div className="Account">
            <div className="myAccount">My Account</div>
            <div className="wrappe">
              <div className="form-wrapper">
                <form>
                  <div className="firstName">
                    <label htmlFor="firstName">First Name</label>
                    <div>{ this.state.firstName }</div>
                  </div>
                  <div className="lastName">
                    <label htmlFor="lastName">Last Name</label>
                    <div>{ this.state.lastName }</div>
                  </div>
                  <div className="email">
                    <label htmlFor="email">Email</label>
                    <div>{ this.state.email }</div>
                  </div>
                  <div className="username">
                    <label htmlFor="username">Username</label>
                    <div>{ this.state.username }</div>
                  </div>
                  <div className="createAccount">
                    <button type="button" onClick={this.edit}>Edit Account</button>
                    <button type="button" onClick={this.logout}>Log Out</button>
                    <button type="button" onClick={this.delete}>Delete Account</button>
                  </div>
                </form>
              </div>
            </div>
            <div>
            {
              this.state.reviews.map((e, i) => <ReviewAccount key={i} item={e} />)
              
            }
            </div>
          </div>
        );
      }
  }
}

export default Account
