const express = require('express')

const UserController = require('./controllers/UserController')
const HouseController = require('./controllers/HouseController')
const AvailableController = require('./controllers/AvailableController')
const VisitController = require('./controllers/VisitController')
const TDetailController = require('./controllers/TDetailController')
const DetailController = require('./controllers/DetailController')

const routes = express.Router()


routes.get('/', function(req, res){ res.send("Hello World")})

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
routes.post('/register/visit/:house_id/:user_id', VisitController.createVisit)
routes.put('/update/visit/:id', VisitController.updateVisit)
routes.delete('/delete/visit/:id', VisitController.deleteVisit)

//TypeDetail Routes
routes.get('/tdetail/:id', TDetailController.getTDetail)
routes.post('/register/tdetail/:user_id', TDetailController.createTDetail)
routes.post('/update/tdetail/:id', TDetailController.updateTDetail)
routes.post('/update/tdetail/:id', TDetailController.deleteTDetail)

//Detail Routes
routes.get('/detail/:id', DetailController.getDetail)
routes.post('/register/detail/:house_id/:type_detail_id', DetailController.createDetail)
routes.post('/update/detail/:id', DetailController.updateDetail)
routes.post('/update/detail/:id', DetailController.deleteDetail)


module.exports = routes