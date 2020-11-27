const express = require("express");
const { body } = require("express-validator");

//IMAGE TEST
const multer = require("multer");
const multerConfig = require("./config/multer");

//NORMAL CONFIGS
const LoginController = require("./controllers/LoginController");
const UserController = require("./controllers/UserController");
const HouseController = require("./controllers/HouseController");
const AvailableController = require("./controllers/AvailableController");
const VisitController = require("./controllers/VisitController");
const TDetailController = require("./controllers/TDetailController");
const DetailController = require("./controllers/DetailController");
const ImageController = require("./controllers/PictureController");
const LocalTypeController = require("./controllers/LocalTypeController");
const LocalController = require("./controllers/LocalController");
const FeedbackController = require("./controllers/FeedBackController");

const routes = express.Router();

routes.get("/", function (req, res) {
    res.send("Hello World");
});

// Login Route
routes.post("/login", LoginController.login);

// User Routes
routes.get("/users", UserController.getUsers);
routes.get("/user/:id", UserController.getUser);
routes.post(
    "/register/user",
    [
        body("password").isLength({ min: 5 }),
        body("email").isEmail(),
        body("name").notEmpty(),
    ],
    UserController.createUser
);
routes.put("/update/user/:id", UserController.updateUser);
routes.delete("/delete/user/:id", UserController.deleteUser);

//House Routes
routes.get("/house/:id", HouseController.getHouse);
routes.get("/houses", HouseController.getHouses);
routes.get("/houses/user/:user_id", HouseController.getUserHouses);
routes.post("/register/house/:user_id", HouseController.createHouse);
routes.put("/update/house/:id/:id_available", HouseController.updateHouse);
routes.put("/houses", HouseController.getHousesFilter);
routes.delete("/delete/house/:id", HouseController.deleteHouse);

//Available Routes
routes.get("/available/:house", AvailableController.getHouseAvailable);
routes.get("/available/hours/:house_id/:day", AvailableController.getHours);
routes.get("/available/days/:house_id/:range", AvailableController.getDates);
routes.get("/available/:house_id/next", AvailableController.getNext);
routes.get("/available/:house/:day", AvailableController.getDayAvailable);
routes.post(
    "/register/available/:house_id",
    AvailableController.createAvailable
);
routes.put("/update/available/:id", AvailableController.updateAvailable);
routes.delete("/delete/available/:id", AvailableController.deleteAvailable);

//Visit Routes
routes.get("/visit/:id", VisitController.getVisit);
routes.get("/visit/user/:user_id", VisitController.getVisitByUser);
routes.get("/visit/seller/:user_id", VisitController.getVisitBySeller);
routes.post("/register/visit/:house_id/:user_id", VisitController.createVisit);
routes.put("/update/visit/:id/confirm", VisitController.updateVisitConfirmed);
routes.put("/update/visit/:id", VisitController.updateVisitHour);
routes.delete("/delete/visit/:id", VisitController.deleteVisit);

//TypeDetail Routes
routes.get("/tdetail/:id", TDetailController.getTDetail);
routes.post("/register/tdetail/:user_id", TDetailController.createTDetail);
routes.put("/update/tdetail/:id", TDetailController.updateTDetail);
routes.delete("/delete/tdetail/:id", TDetailController.deleteTDetail);

//Detail Routes
routes.get("/detail/:id", DetailController.getDetail);
routes.post(
    "/register/detail/:house_id/:type_detail_id",
    DetailController.createDetail
);
routes.put("/update/detail/:id", DetailController.updateDetail);
routes.delete("/delete/detail/:id", DetailController.deleteDetail);

//Image Routes
routes.get("/images", ImageController.getImage);
routes.post(
    "/register/image/:user_id/:house_id",
    multer(multerConfig).single("file"),
    ImageController.createImage
);
routes.delete("/delete/image/:id", ImageController.deleteImage);

//LocalType Routes
routes.get("/localtype/:id", LocalTypeController.getLocalType);
routes.post("/register/localtype", LocalTypeController.createLocalType);
routes.put("/update/localtype/:id", LocalTypeController.updateLocalType);
routes.delete("/delete/localtype/:id", LocalTypeController.deleteLocalType);

//Local Routes
routes.get("/local/:id", LocalController.getLocal);
routes.post("/register/local", LocalController.createLocal);
routes.put("/update/local/:id", LocalController.updateLocal);
routes.delete("/delete/local/:id", LocalController.deleteLocal);

//FeedBack Routes
routes.get("/feedback/:user_id/:house_id", FeedbackController.getFeedback);
routes.post("/feedback/:user_id/:house_id", FeedbackController.createFeeedback);
routes.put("/feedback/:user_id/:house_id", FeedbackController.updateFedback);
routes.delete("/feedback/:id", FeedbackController.deleteFeedback);

module.exports = routes;
