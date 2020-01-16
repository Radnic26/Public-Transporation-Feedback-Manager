import { EventEmitter } from 'fbemitter'

const SERVER = 'http://127.0.0.1:8080'

class ReviewStore {
    constructor() {
        this.reviews = []
        this.emitter = new EventEmitter()
    }

    async getAllReviews() {
        try {
            let response = await fetch(`${SERVER}/reviews`)
            let data = await response.json()
            this.reviews = data
            this.emitter.emit(`GET_ALL_REVIEWS_SUCCESS`)
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_ALL_REVIEWS_ERROR')
        }
    }

     async getUserReviews(id) {
        try {
            let response = await fetch(`${SERVER}/users/${id}/reviews`)
            let data = await response.json()
            this.reviews = data
            this.emitter.emit(`GET_USER_REVIEWS_SUCCESS`)
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_USER_REVIEWS_ERROR')
        }
    }

    async editReview(userId, reviewId, review) {
           return await fetch(`${SERVER}/users/${userId}/reviews/${reviewId}`, {
                mode : 'cors',
                method: 'put',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(review)
            })
    }

    async deleteReview(userId, reviewId) {
        try {
            await fetch(`${SERVER}/users/${userId}/reviews/${reviewId}`, {
                method: 'delete'
            })
            this.getAllReviews()
        } catch(err) {
            console.warn(err)
        }
    }

    async deleteUserReview(userId) {
        try {
            await fetch(`${SERVER}/users/${userId}/reviews/`, {
                method: 'delete'
            })
            this.getAllReviews()
        } catch(err) {
            console.warn(err)
        }
    }

    async addReview(review, id) {
        try {
            await fetch(`${SERVER}/users/${id}/reviews`, {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(review)
            })
            this.getAllReviews()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('ADD_REVIEW_ERROR')
        }
    }
}

export default ReviewStore