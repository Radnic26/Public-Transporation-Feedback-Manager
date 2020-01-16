import React, { Component } from 'react'
import ReviewStore from '../stores/ReviewStore'
import './../css/App.css'
import UserStore from '../stores/UserStore'

class AddReview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startingPoint : '',
      destination : '',
      transportMean : '',
      departureHour : '',
      time : '',
      crowdedLevel : '',
      observations : '',
      satisfactionLevel : ''
    }

    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name] : evt.target.value
      })
    }

    this.reviewStore = new ReviewStore()
    this.userStore = new UserStore()
   
    this.add = () => {
      let review = {
        startingPoint : this.state.startingPoint,
        destination : this.state.destination,
        transportMean : this.state.transportMean,
        departureHour : this.state.departureHour,
        time : this.state.time,
        crowdedLevel : this.state.crowdedLevel,
        observations : this.state.observations,
        satisfactionLevel : this.state.satisfactionLevel
      }

      this.userStore.getLoggedUser().then(() => {
        var id = this.userStore.loggedUsers[0].id
        this.reviewStore.addReview(review, id)
        this.props.history.push('/')
      })
      
    }
  }
  
  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Add Review</h1>
          <form>
            <div className="startingPoint">
              <label htmlFor="startingPoint">Starting Point</label>
              <input
                placeholder="Starting Point"
                type="text"
                name="startingPoint"
                onChange={ this.handleChange }
              />
            </div>
            <div className="destination">
              <label htmlFor="destination">Destination</label>
              <input
                placeholder="Destination"
                type="text"
                name="destination"
                onChange={ this.handleChange }
              />
            </div>
            <div className="transportMean">
              <label htmlFor="transportMean">Transport Mean</label>
              <input
                placeholder="Transport Mean"
                type="text"
                name="transportMean"
                onChange={ this.handleChange }
              />
            </div>
            <div className="crowdedLevel">
              <label htmlFor="crowdedLevel">Crowded Level</label>
              <input
                placeholder="Crowded Level"
                type="number"
                name="crowdedLevel"
                onChange={ this.handleChange }
              />
            </div>
            <div className="departureHour">
              <label htmlFor="departureHour">Departure Hour</label>
              <input
                placeholder="departureHour"
                type="number"
                name="departureHour"
                onChange={ this.handleChange }
              />
            </div>
            <div className="time">
              <label htmlFor="time">Time (minutes)</label>
              <input
                placeholder="Time"
                type="number"
                name="time"
                onChange={ this.handleChange }
              />
            </div>
            <div className="observations">
              <label htmlFor="observations">Observations</label>
              <input
                placeholder="Observations"
                type="text"
                name="observations"
                onChange={ this.handleChange }
                />
           </div>
           <div className="satisfactionLevel">
              <label htmlFor="satisfactionLevel">Satisfaction Level</label>
              <input
                placeholder="Satisfaction Level"
                type="number"
                name="satisfactionLevel"
                onChange={ this.handleChange }
                />
           </div>
            <div className="createAccount">
              <button type="button" value="Add Review" onClick={ this.add }>Add Review</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default AddReview