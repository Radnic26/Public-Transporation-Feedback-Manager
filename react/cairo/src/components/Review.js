import React, { Component } from 'react'
import Happy from '../media/happy.png'
import Neutral from '../media/neutral.png'
import Sad from '../media/sad.png'

class Review extends Component {
    constructor(props) {
        super(props) 
        this.state = {
        startingPoint : this.props.item.startingPoint,
        destination : this.props.item.destination,
        transportMean : this.props.item.transportMean,
        departureHour : this.props.item.departureHour,
        time : this.props.item.time,
        crowdedLevel : this.props.item.crowdedLevel,
        observations : this.props.item.observations,
        satisfactionLevel : this.props.item.satisfactionLevel
        }
    }
    
    render() {
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
            </form>
          </div>
        }
    }
}

export default Review