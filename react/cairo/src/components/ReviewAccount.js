import React, { Component } from 'react'
import Happy from '../media/happy.png'
import Neutral from '../media/neutral.png'
import Sad from '../media/sad.png'
import UserStore from '../stores/UserStore'
import ReviewStore from '../stores/ReviewStore'

class ReviewAccount extends Component {
    constructor(props) {
        super(props) 
        this.state = {
          isEditing : false,
          id : this.props.item.id,
          startingPoint : this.props.item.startingPoint,
          destination : this.props.item.destination,
          transportMean : this.props.item.transportMean,
          departureHour : this.props.item.departureHour,
          time : this.props.item.time,
          crowdedLevel : this.props.item.crowdedLevel,
          observations : this.props.item.observations,
          satisfactionLevel : this.props.item.satisfactionLevel
        }

        this.handleChange = (evt) => {
          this.setState({
            [evt.target.name] : evt.target.value
          })
        }

        this.userStore = new UserStore()
        this.reviewStore = new ReviewStore()

        this.delete = () => {
          this.userStore.getLoggedUser().then(() => {
            var id = this.userStore.loggedUsers[0].id
            this.reviewStore.deleteReview(id, this.props.item.id)
            window.location.reload(true)
          })
        }
        this.edit = () => {
          this.setState({isEditing : true})
        }

        this.editReview = () => {
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
            
            console.log(id)
            this.reviewStore.editReview(id, this.state.id, review)
            console.log(review)
            this.setState({isEditing : false})
            window.location.reload(true)
          })
        }
    }
    render() {
      if(this.state.isEditing) {
        return <div className="review-wrapper">
        <h1>Review</h1>
          <form>
            <div className="startingPoint">
              <label htmlFor="startingPoint">Starting Point</label>
              <input
                placeholder="Starting Point"
                type="text"
                name="startingPoint"
                onChange={ this.handleChange }
                value={ this.state.startingPoint }
                />
            </div>
            <div className="destination">
              <label htmlFor="destination">Destination</label>
              <input
                placeholder="Destination"
                type="text"
                name="destination"
                onChange={ this.handleChange }
                value={ this.state.destination }
              />
            </div>
            <div className="transportMean">
              <label htmlFor="transportMean">Transport Mean</label>
              <input
                placeholder="Transport Mean"
                type="text"
                name="transportMean"
                onChange={ this.handleChange }
                value={ this.state.transportMean }
              />
            </div>
            <div className="crowdedLevel">
              <label htmlFor="crowdedLevel">Crowded Level</label>
              <input
                placeholder="Crowded Level"
                type="number"
                name="crowdedLevel"
                onChange={ this.handleChange }
                value={ this.state.crowdedLevel }
              />
            </div>
            <div className="departureHour">
              <label htmlFor="departureHour">Departure Hour</label>
              <input
                placeholder="departureHour"
                type="number"
                name="departureHour"
                onChange={ this.handleChange }
                value={ this.state.departureHour }
              />
            </div>
            <div className="time">
              <label htmlFor="time">Time (minutes)</label>
              <input
                placeholder="Time"
                type="number"
                name="time"
                onChange={ this.handleChange }
                value={ this.state.time }
              />
            </div>
            <div className="observations">
              <label htmlFor="observations">Observations</label>
              <input
                placeholder="Observations"
                type="text"
                name="observations"
                onChange={ this.handleChange }
                value={ this.state.observations }
                />
           </div>
           <div className="satisfactionLevel">
              <label htmlFor="satisfactionLevel">Satisfaction Level</label>
              <input
                placeholder="Satisfaction Level"
                type="number"
                name="satisfactionLevel"
                onChange={ this.handleChange }
                value={ this.state.satisfactionLevel }
                />
           </div>
           <div className="login">
               <button type="button" onClick={ this.editReview }>Edit Review</button>
               </div>
          </form>
        </div>
      }
        else if(this.state.isEditing === false) {
          let { item } = this.props
        if(item.satisfactionLevel === 1) {
        return  <div className="review-wrapper">
        <h1>Review</h1>
          <form>
            <div className="startingPoint">
              <label htmlFor="startingPoint">Starting Point</label>
              <div>{ item.startingPoint }</div>
            </div>
            <div className="destination">
              <label htmlFor="destination">Destination</label>
              <div>{ item.destination }</div>
            </div>
            <div className="transportMean">
              <label htmlFor="transportMean">Transport Mean</label>
              <div>{ item.transportMean }</div>
            </div>
            <div className="crowdedLevel">
              <label htmlFor="crowdedLevel">Crowded Level</label>
              <div>{ item.crowdedLevel }</div>
            </div>
            <div className="departureHour">
              <label htmlFor="departureHour">Departure Hour</label>
              <div>{ item.departureHour }</div>
            </div>
            <div className="time">
              <label htmlFor="time">Time (minutes)</label>
              <div>{ item.time }</div>
            </div>
            <div className="observations">
              <label htmlFor="observations">Observations</label>
              <div>{ item.observations }</div>
           </div>
           <div className="satisfactionLevel">
              <label htmlFor="satisfactionLevel">Satisfaction Level</label>
              <img style={  { height: 38, width: 39, paddingLeft: 177 } } src={ Sad } alt="website logo"/>
           </div>
           <div className="login">
               <button type="submit" onClick={ this.edit }>Edit Review</button>
               </div>
               <div className="login">
                   <button type="button" onClick={ this.delete }>Delete Review</button>
                </div>
          </form>
        </div>
        }
        else if(item.satisfactionLevel === 2) {
          return  <div className="review-wrapper">
        <h1>Review</h1>
          <form>
            <div className="startingPoint">
              <label htmlFor="startingPoint">Starting Point</label>
              <div>{ item.startingPoint }</div>
            </div>
            <div className="destination">
              <label htmlFor="destination">Destination</label>
              <div>{ item.destination }</div>
            </div>
            <div className="transportMean">
              <label htmlFor="transportMean">Transport Mean</label>
              <div>{ item.transportMean }</div>
            </div>
            <div className="crowdedLevel">
              <label htmlFor="crowdedLevel">Crowded Level</label>
              <div>{ item.crowdedLevel }</div>
            </div>
            <div className="departureHour">
              <label htmlFor="departureHour">Departure Hour</label>
              <div>{ item.departureHour }</div>
            </div>
            <div className="time">
              <label htmlFor="time">Time (minutes)</label>
              <div>{ item.time }</div>
            </div>
            <div className="observations">
              <label htmlFor="observations">Observations</label>
              <div>{ item.observations }</div>
           </div>
           <div className="satisfactionLevel">
              <label htmlFor="satisfactionLevel">Satisfaction Level</label>
              <img style={  { height: 38, width: 39, paddingLeft: 177 } } src={ Neutral } alt="website logo"/>
           </div>
           <div className="login">
               <button type="submit" onClick={ (e) => {this.edit(e)} }>Edit Review</button>
               </div>
               <div className="login">
                   <button type="button" onClick={ this.delete }>Delete Review</button>
                </div>
          </form>
        </div>
        }
        else {
          return  <div className="review-wrapper">
          <h1>Review</h1>
            <form>
              <div className="startingPoint">
                <label htmlFor="startingPoint">Starting Point</label>
                <div>{ item.startingPoint }</div>
              </div>
              <div className="destination">
                <label htmlFor="destination">Destination</label>
                <div>{ item.destination }</div>
              </div>
              <div className="transportMean">
                <label htmlFor="transportMean">Transport Mean</label>
                <div>{ item.transportMean }</div>
              </div>
              <div className="crowdedLevel">
                <label htmlFor="crowdedLevel">Crowded Level</label>
                <div>{ item.crowdedLevel }</div>
              </div>
              <div className="departureHour">
                <label htmlFor="departureHour">Departure Hour</label>
                <div>{ item.departureHour }</div>
              </div>
              <div className="time">
                <label htmlFor="time">Time (minutes)</label>
                <div>{ item.time }</div>
              </div>
              <div className="observations">
                <label htmlFor="observations">Observations</label>
                <div>{ item.observations }</div>
             </div>
             <div className="satisfactionLevel">
                <label htmlFor="satisfactionLevel">Satisfaction Level</label>
                <img style={  { height: 38, width: 39, paddingLeft: 177 } } src={ Happy } alt="website logo"/>
             </div>
             <div className="login">
               <button type="submit" onClick={ (e) => {this.edit(e)} }>Edit Review</button>
               </div>
               <div className="login">
                   <button type="button" onClick={ this.delete }>Delete Review</button>
                </div>
            </form>
          </div>
        }
      }
    }
}

export default ReviewAccount