import React from 'react'
import './../css/App.css'
import Nav from './Nav'
import Home from './Home'
import AddReview from './AddReview'
import Login from './Login'
import Register from './Register'
import Account from './Account'
import Reset from './Reset'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Nav/>
        <Switch>
          <Route path="/" exact component={ Home }/>
          <Route path="/addReview" component={ AddReview }/>
          <Route path="/login" component={ Login }/>
          <Route path="/register" component={ Register }/>
          <Route path="/account" component={ Account }/>
          <Route path="/resetPassword" component={ Reset }/>
        </Switch>
      </div>
    </Router>
  );
}


export default App
