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

describe("PUT TESTS", () => {
    it("Import the fucking variables", (done) => {
        const {
            userId,
            houseId,
            visitId,
            availableId,
            typeDetailId,
            detailId,
        } = require("./01_Post");

        userIdg = userId;
        houseIdg = houseId;
        typeDetailIdg = typeDetailId;
        visitIdg = visitId;
        availableIdg = availableId;
        detailIdg = detailId;

        done();
    });

    it("PUT User", (done) => {
        var user = {
            name: "Vitao",
            email: "otavio@gamer.com",
            password: "rtx3080",
            cellphone: "61434634666",
            cpf: "90103402311",
            address: "No fim de mundo perto do CEUB",
        };

        chai.request(server)
            .put("/update/user/" + userIdg)
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);

                res.body.id.should.be.a("number");
                res.body.name.should.be.a("string");
                res.body.email.should.be.a("string");
                res.body.password.should.be.a("string");
                res.body.cellphone.should.be.a("string");
                res.body.cpf.should.be.a("string");
                res.body.address.should.be.a("string");
                res.body.is_deleted.should.be.false;
                res.body.should.be.a("object");

                done();
            });
    });

    it("PUT House", (done) => {
        var house = {
            password: "rtx3080",
            land_size: "399m2",
            price: 4999999.99,
            address: "Bem longe da namorada",
            description: "Sem descrições",
            number_bedroom: 3,
            number_bath: 2,
            to_sell: true,
        };

        chai.request(server)
            .put("/update/house/" + houseIdg)
            .send(house)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);

                res.body.id.should.be.a("number");
                res.body.user_id.should.be.a("number");
                res.body.land_size.should.be.a("string");
                res.body.price.should.be.a("number");
                res.body.address.should.be.a("string");
                res.body.description.should.be.a("string");
                res.body.number_bedroom.should.be.a("number");
                res.body.owner.should.be.a("object");
                res.body.number_bath.should.be.a("number");
                res.body.is_deleted.should.be.false;
                res.body.should.be.a("object");

                done();
            });
    });

    it("PUT Visit", (done) => {
        var visit = {
            password: "rtx3080",
            day_hour_visit: "2020-10-25T11:00:00.000Z",
            is_confirmed: true,
        };

        chai.request(server)
            .put("/update/visit/" + visitIdg)
            .send(visit)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);

                res.body.id.should.be.a("number");
                res.body.user_id.should.be.a("number");
                res.body.house_id.should.be.a("number");
                res.body.day_hour_visit.should.be.a("string");
                res.body.is_confirmed.should.be.a("boolean");
                res.body.is_deleted.should.be.false;
                res.body.house.should.be.a("object");
                res.body.house.owner.should.be.a("object");
                res.body.should.be.a("object");

                done();
            });
    });

    it("PUT Available", (done) => {
        var available = {
            password: "rtx3080",
            initial_hour: "14",
            final_hour: "19",
            day_week: 6,
        };

        chai.request(server)
            .put("/update/available/" + availableIdg)
            .send(available)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);

                const body = res.body;

                body.id.should.be.a("number");
                body.house_id.should.be.a("number");
                body.initial_hour.should.be.a("string");
                body.final_hour.should.be.a("string");
                body.day_week.should.be.a("number");
                body.house.should.be.a("object");
                body.house.owner.should.be.a("object");
                body.day_week.should.be.a("number");
                body.is_deleted.should.be.false;
                body.should.be.a("object");

                done();
            });
    });

    it("PUT Type Detail", (done) => {
        var type_detail = {
            name: "casa",
            description: "tem banheiro",
        };

        chai.request(server)
            .put("/update/tdetail/" + typeDetailIdg)
            .send(type_detail)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);

                const body = res.body;

                body.id.should.be.a("number");
                body.user_id.should.be.a("number");
                body.name.should.be.a("string");
                body.description.should.be.a("string");
                body.user.should.be.a("object");
                body.is_deleted.should.be.false;
                body.should.be.a("object");

                done();
            });
    });

    it("PUT Detail", (done) => {
        var detail = {
            description: "tiramo a nutella",
            number: 1,
        };

        chai.request(server)
            .put("/update/detail/" + detailIdg)
            .send(detail)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);

                const body = res.body;

                body.id.should.be.a("number");
                body.house_id.should.be.a("number");
                body.number.should.be.a("number");
                body.description.should.be.a("string");
                body.type_detail.should.be.a("object");
                body.is_deleted.should.be.false;
                body.should.be.a("object");

                done();
            });
    });
});
