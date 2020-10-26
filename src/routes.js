const express = require('express')

const UserController = require('./controllers/UserController')
const HouseController = require('./controllers/HouseController')
const AvailableController = require('./controllers/AvailableController')
const VisitController = require('./controllers/VisitController')

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
routes.get('/available/:house/:day', AvailableController.getDayAvailable)
routes.post('/register/available', AvailableController.createAvailable)
routes.put('/update/available/:id', AvailableController.updateAvailable)
routes.delete('/delete/available/:id', AvailableController.deleteAvailable)

//Visit Routes
routes.get('/visit/:id/', VisitController.getVisit)
routes.post('/register/visit/:user_id/:house_id', VisitController.createVisit)


module.exports = routes