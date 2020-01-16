import React, { Component } from 'react'
import './../css/App.css'
import ReviewStore from '../stores/ReviewStore'
import Review from './Review'
import { Input } from 'mdbreact'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      reviews: [],
      search: ''
    }
    this.reviewStore = new ReviewStore()


    this.handleChange = (e) => {
      this.setState({
        search: e.target.value
      })
    }
    
  }

  componentDidMount() {
    this.reviewStore.getAllReviews()
    this.reviewStore.emitter.addListener('GET_ALL_REVIEWS_SUCCESS', () => {
      this.setState({
        reviews: this.reviewStore.reviews
      })
      
    })
  }

  render() {
    let search = this.state.search
    let reviews = this.state.reviews

    const filteredReviews = reviews.filter(review => review.transportMean.toLowerCase().includes(search) || search === "")
    return (
      <div className="Home">
        <div>
        </div>
        <div className="wrapper-search">
          <div className="form-wrapper-search">
            <form>
              <div className="password">
                <label className = "Search" htmlFor="password">Search by Transport Mean</label>
                <Input className="input"
                  placeholder="Search"
                  name="search"
                  type="search"
                  onChange={this.handleChange}
                />
              </div>
            </form>
          </div>
        </div>
        {
          filteredReviews.map((e, i) => <Review key={i} item={e} />)
        }
      </div>
    )
  }
}

export default Home
