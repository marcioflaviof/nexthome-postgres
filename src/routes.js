const express = require('express')

const UserController = require('./controllers/UserController')
const HouseController = require('./controllers/HouseController')
const AvailableController = require('./controllers/AvailableController')

const routes = express.Router()

// User Routes
routes.get('/users', UserController.getUsers)
routes.get('/user/:id', UserController.getUser)
routes.post('/register/user', UserController.createUser)
routes.put('/update/user/:id', UserController.updateUser)
routes.delete('/delete/user/:id', UserController.deleteUser)

//House Routes
routes.get('/house/:id', HouseController.getHouse)
routes.post('/register/house/:user_id', HouseController.createHouse)
routes.put('/update/house/:id', HouseController.updateHouse)
routes.delete('/delete/house/:id', HouseController.deleteHouse)

//Available Routes
routes.post('/register/available', AvailableController.createAvailable)
routes.get('/available/:day',AvailableController.getDayAvailable)

module.exports = routes