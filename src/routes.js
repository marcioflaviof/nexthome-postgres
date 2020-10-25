const express = require('express')

const UserController = require('./controllers/UserController')
const HouseController = require('./controllers/HouseController')

const routes = express.Router()

// User Routes
routes.get('/users', UserController.getUsers)
routes.get('/user/:id', UserController.getUser)
routes.post('/register/user', UserController.createUser)
routes.put('/update/user/:id', UserController.updateUser)
routes.delete('/delete/user/:id', UserController.deleteUser)

routes.post('/register/house/:user_id', HouseController.createHouse)


module.exports = routes