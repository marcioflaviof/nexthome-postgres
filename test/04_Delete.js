require("dotenv").config();
var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;
var server = process.env.SERVERTEST;
chai.should();

chai.use(chaiHttp);

var userIdg;
var houseIdg;
var typeDetailIdg;
var visitIdg;
var availableIdg;
var detailIdg;
var userImgId;
var houseImgId;

describe("DELETE TESTS", () => {
    it("Import the fucking variables", (done) => {
        const {
            userId,
            houseId,
            visitId,
            availableId,
            typeDetailId,
            detailId,
            uImgId,
            hImgId,
        } = require("./01_Post");

        userIdg = userId;
        houseIdg = houseId;
        typeDetailIdg = typeDetailId;
        visitIdg = visitId;
        availableIdg = availableId;
        detailIdg = detailId;
        userImgId = uImgId;
        houseImgId = hImgId;

        done();
    });

    it("DELETE User", (done) => {
        var user = {
            email: "otavio@gamer.com",
            password: "rtx3080",
        };

        chai.request(server)
            .delete("/delete/user/" + userIdg)
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);

                res.body.is_deleted.should.be.true;
                res.body.should.be.a("object");

                done();
            });
    });

    it("DELETE House", (done) => {
        var house = {
            password: "rtx3080",
        };

        chai.request(server)
            .delete("/delete/house/" + houseIdg)
            .send(house)
            .end((err, res) => {
                res.should.have.status(200);

                res.body.is_deleted.should.be.true;
                res.body.should.be.a("object");

                done();
            });
    });

    it("DELETE Visit", (done) => {
        var visit = {
            password: "rtx3080",
        };

        chai.request(server)
            .delete("/delete/visit/" + visitIdg)
            .send(visit)
            .end((err, res) => {
                res.should.have.status(200);

                res.body.is_deleted.should.be.true;
                res.body.should.be.a("object");

                done();
            });
    });

    it("DELETE Available", (done) => {
        var available = {
            password: "rtx3080",
        };

        chai.request(server)
            .delete("/delete/available/" + availableIdg)
            .send(available)
            .end((err, res) => {
                res.should.have.status(200);

                res.body.is_deleted.should.be.true;
                res.body.should.be.a("object");

                done();
            });
    });

    it("DELETE Type Detail", (done) => {
        chai.request(server)
            .delete("/delete/tdetail/" + typeDetailIdg)
            .end((err, res) => {
                res.should.have.status(200);

                res.body.is_deleted.should.be.true;
                res.body.should.be.a("object");

                done();
            });
    });

    it("DELETE Detail", (done) => {
        var detail = {
            password: "rtx3080",
        };

        chai.request(server)
            .delete("/delete/detail/" + detailIdg)
            .send(detail)
            .end((err, res) => {
                res.should.have.status(200);

                res.body.is_deleted.should.be.true;
                res.body.should.be.a("object");

                done();
            });
    });

    it("DELETE User Image", (done) => {
        chai.request(server)
            .delete("/delete/image/" + userImgId)
            .end((err, res) => {
                res.should.have.status(200);

                res.body.deleted.should.be.true;
                res.body.should.be.a("object");

                done();
            });
    });

    it("DELETE House Image", (done) => {
        chai.request(server)
            .delete("/delete/image/" + houseImgId)
            .end((err, res) => {
                res.should.have.status(200);

                res.body.deleted.should.be.true;
                res.body.should.be.a("object");

                done();
            });
    });
});
