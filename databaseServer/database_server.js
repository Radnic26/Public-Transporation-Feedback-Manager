const express = require('express')
const bodyParser = require('body-parser')
const Sequelize= require("sequelize");
const Op = Sequelize.Op
const cors = require('cors')

const sequelize = new Sequelize('cairo','radu','Welcome12#',{
    dialect:'mysql'
});

let User = sequelize.define('user', {
    firstName : {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2-30]
        }
    },
    lastName : {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2-40]
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2-40]
        }
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2-40]
        },
        unique : {
            args: true,
            msg: 'Username already in use'
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2-40]
        }
    },
    isLoggedIn : {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue : 0
    }
})

let Review = sequelize.define('review', {
    startingPoint : {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2-30]
        }
    },
    destination : {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2-40]
        }
    },
    transportMean: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [2-40]
        }
    },
    departureHour: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    time: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    crowdedLevel: {
        type: Sequelize.INTEGER,
        allowNull: false 
    },
    observations: {
        type: Sequelize.STRING
    },
    satisfactionLevel: {
        type: Sequelize.INTEGER,
        allowNull: false
    } 
})

User.hasMany(Review)
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('../react/cairo/build'))

app.post('/sync', async (req, res, next) => {
    try {
        await sequelize.sync({force : true})
        res.status(201).json({message : 'created'})
    } catch (err) {
        next(err)
    }
})

app.get('/users', (req, res) => {
    User.findAll().then(result => {
        res.status(200).send(result)
    }).catch(err => {
        res.status(500).send(err)
    })
})

app.get('/loggedUser', (req, res) => {
    User.findAll({
        where: {
            isLoggedIn : true
        }
    }).then(result => {
        res.status(200).send(result)
    }).catch(err => {
        res.status(500).send(err)
    })
})

app.post('/userId', (req, res) => {
    console.log(req.body)
    User.findOne({
        where: {username : req.body.username,
                password : req.body.password}
    }).then(result => {
        res.status(200).send(result)
    }).catch(err => {
        res.status(500).send(err)
    })
})

app.post('/users', async (req, res, next) => {
    try {
        await User.create(req.body)
        res.status(201).json({message : 'created'})
    } catch (err) {
        next(err)
    }  
})

app.put('/users', async (req, res, next) => {
    try{
        console.log(req.body)
        let user = await User.findOne({
            where: {username: req.body.username}
        })
        if(user) {
            await user.update(req.body, {
                fields: ['password']
            })
            res.status(202).send({message : 'accepted'})
            console.log('accepted')
        }
        else {
            res.status(404).send({message : 'not found'})
        }
    } catch(err) {
        next(err)
    }
})

app.put('/loggedUser/:id', async (req, res, next) => {
    try{
        console.log(req.body)
        let user = await User.findByPk(req.params.id)
        if(user) {
            await user.update(req.body)
            res.status(202).send({message : 'accepted'})
            console.log('accepted')
        }
        else {
            res.status(404).send({message : 'not found'})
        }
    } catch(err) {
        next(err)
    }
})

app.put('/login', async (req, res, next) => {
    try{
        console.log(req.body)
        let user = await User.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        })
        console.log(req.body)
        if(user) {
            console.log(req.body)
            await user.update(req.body, {
                fields: ['isLoggedIn']
            })
            res.status(202).send({message : 'accepted'})
            console.log('accepted')
        }
        else {
            res.status(404).send({message : 'not found'})
        }
    } catch(err) {
        next(err)
    }
})

app.delete('/users/:id', async (req, res, next) => {
    try {
        let user = await User.findByPk(req.params.id)
        if(user) {
            await user.destroy()
            res.status(202).json({message : 'accepted'})
        }
        else {
            res.status(404).json({message : 'not found'})
        }
    } catch(err) {
        next(err)
    }
})

app.post('/login', async (req, res) => {
	try	{
        let credentials = req.body
        console.log(req.body)
		let user = await User.findOne({
			where : {
				username : credentials.username,
				password : credentials.password
			}
        })
		if (user){
			res.status(200).send('login successful')
		}
		else{
			res.status(401).send('invalid credentials')
		}
	}
	catch(e){
		res.status(500).send('server error')
	}
})

app.get('/reviews', (req, res) => {
    Review.findAll().then(result => {
        res.status(200).send(result)
    }).catch(err => {
        res.status(500).send(err)
    })
})


app.get('/users/:pid/reviews', async(req, res, next) => {
    try { 
        let user = await User.findByPk(req.params.pid, {
            include: [Review]
        })
        if(user) {
            res.status(200).json(user.reviews)
        }
        else {
            res.status(404).json({message: 'not found'})
        }
    } catch(err) {
        next(err)
    }
})

app.post('/users/:pid/reviews', async(req, res, next) => {
    try {
        let user = await User.findByPk(req.params.pid)
        if(user) {
            let review = req.body
            review.userId = user.id
            await Review.create(review)
            res.status(201).json({message: 'created'})
        }
        else {
            res.status(404).json({message: 'not found'})
        }
    } catch(err) {
        next(err)
    }
})

app.post('/review', async (req, res, next) => {
    try {
        await Review.create(req.body)
        res.status(201).json({message : 'created'})
    } catch (err) {
        next(err)
    }  
})

app.put('/users/:pid/reviews/:cid', async(req, res, next) => {
    try {
        let user = await User.findByPk(req.params.pid)
        if(user) {
            let reviews = await user.getReviews({
                where: {
                    id : req.params.cid
                }
            })
            let review = reviews.shift()
            if(review) {
                await review.update(req.body)
            }
            else {
                res.status(404).json({message: 'not found'})
            }
            res.status(201).json({message: 'it works'})
        }
        else {
            res.status(404).json({message: 'not found'})
        }
    } catch(err) {
        next(err)
    }
})

app.delete('/users/:pid/reviews/:cid', async(req, res, next) => {
    try {
        let user = await User.findByPk(req.params.pid)
        if(user) {
            let reviews = await user.getReviews ({
                where: {
                    id : req.params.cid
                }
            })
            let review = reviews.shift()
            if(review) {
                await review.destroy()
            }
            else {
                res.status(404).json({message: 'not found'})
            }
            res.status(201).json({message: 'it works'})
        }
        else {
            res.status(404).json({message: 'not found'})
        }
    } catch(err) {
        next(err)
    }
})

app.delete('/users/:pid/reviews/', async(req, res, next) => {
    try {
        let user = await User.findByPk(req.params.pid)
        if(user) {
            let reviews = await user.getReviews ({
                where: {
                    userId : req.params.pid
                }
            })
            let review = reviews.shift()
            if(review) {
                await review.destroy()
            }
            else {
                res.status(404).json({message: 'not found'})
            }
            res.status(201).json({message: 'it works'})
        }
        else {
            res.status(404).json({message: 'not found'})
        }
    } catch(err) {
        next(err)
    }
})

app.use((err, req, res, next) => {
    console.warn(err)
    res.status(500).json({message : ':('})
})

app.listen(8080, () => console.log('Server Up and Running!'))