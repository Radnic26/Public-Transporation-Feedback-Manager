import { EventEmitter } from 'fbemitter'

const SERVER = 'http://127.0.0.1:8080'

class UserStore {
    constructor() {
        this.users = []
        this.loggedUsers = []
        this.emitter = new EventEmitter()
        this.responseStatus = ''
        this.id = 0
    }

    async addUser(user) {
        try {
            await fetch(`${SERVER}/users`, {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(user)
            })
        } catch(err) {
            console.warn(err)
            this.emitter.emit('ADD_USER_ERROR')
        }
    }

    async deleteUser(userId) {
        try {
            await fetch(`${SERVER}/users/${userId}`, {
                method: 'delete'
            })
        } catch(err) {
            console.warn(err)
        }
    }

    async getLoggedUser() {
        try {
            let response = await fetch(`${SERVER}/loggedUser`)
            let data = await response.json()
            this.loggedUsers = data
            this.emitter.emit(`GET_ALL_REVIEWS_SUCCESS`)
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_ALL_REVIEWS_ERROR')
        }
    }

    async addLoggedUser(user) {
        try {
            await fetch(`${SERVER}/login`, {
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(user)
            })
        } catch(err) {
            console.warn(err)
            this.emitter.emit('ADD_LOGGED_USER_ERROR')
        }
    }

    async getUserId(user) {
        try {
            let response = await fetch(`${SERVER}/userId`, {
                mode : 'cors',
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(user)
            })
            const data = await response.json();
            this.id = data.id
            console.log(this.id)
            this.emitter.emit(`GET_ALL_REVIEWS_SUCCESS`)
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_ALL_REVIEWS_ERROR')
        }
    }

    async changePassword(user) {
           return await fetch(`${SERVER}/users`, {
                mode : 'cors',
                method: 'put',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(user)
            })
    }

    async editUser(userId, user) {
           return await fetch(`${SERVER}/loggedUser/${userId}`, {
                mode : 'cors',
                method: 'put',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(user)
            })
    }

    async updateLoggedInStatus(user) {
           return await fetch(`${SERVER}/login`, {
                mode : 'cors',
                method: 'put',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(user)
            })
    }
}

export default UserStore