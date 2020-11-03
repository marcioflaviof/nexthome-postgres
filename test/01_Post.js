var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;
var server = "http://localhost:8080";
chai.should();

chai.use(chaiHttp);

var userId;
var houseId;
var typeDetailId;
var visitId;
var availableId;
var detailId;

describe("POST TESTS", async () => {
  it("POST User", (done) => {
    var user = {
      name: "Otavio",
      email: "otavio@gamer.com",
      password: "rtx3080",
      cellphone: "98883090",
      cpf: "36548963465",
      address: "No fim de mundo perto do Nickael",
    };

    chai
      .request(server)
      .post("/register/user")
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

        userId = res.body.id;

        done();
      });
  });

  it("POST House", (done) => {
    var house = {
      land_size: "230m2",
      price: 5000000.99,
      address: "Bem longe do Marcio",
      description: "Sem descricoes",
      number_bedroom: 3,
      number_bath: 2,
      to_sell: "1",
    };

    chai
      .request(server)
      .post("/register/house/" + userId)
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
        res.body.number_bath.should.be.a("number");
        res.body.is_deleted.should.be.false;
        res.body.should.be.a("object");

        houseId = res.body.id;

        done();
      });
  });

  it("POST Visit", (done) => {
    var visit = {
      day_hour_visit: "2020-10-08T15:00:00.000Z",
      is_confirmed: true,
    };

    chai
      .request(server)
      .post("/register/visit/" + houseId + "/" + userId)
      .send(visit)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);

        visitId = res.body.id;

        res.body.id.should.be.a("number");
        res.body.user_id.should.be.a("number");
        res.body.house_id.should.be.a("number");
        res.body.day_hour_visit.should.be.a("string");
        res.body.is_confirmed.should.be.true;
        res.body.is_deleted.should.be.false;
        res.body.should.be.a("object");

        done();
      });
  });

  it("POST Available", (done) => {
    var available = {
      initial_hour: "12",
      final_hour: "18",
      day_week: 6,
    };

    chai
      .request(server)
      .post("/register/available/" + houseId)
      .send(available)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);

        const body = res.body.inserted_available;

        availableId = body.id;

        body.id.should.be.a("number");
        body.house_id.should.be.a("number");
        body.initial_hour.should.be.a("number");
        body.final_hour.should.be.a("number");
        body.day_week.should.be.a("number");
        body.is_deleted.should.be.false;
        body.should.be.a("object");

        done();
      });
  });

  it("POST Type Detail", (done) => {
    var type_detail = {
      name: "piscina",
      description: "tem água",
    };

    chai
      .request(server)
      .post("/register/tdetail/" + userId)
      .send(type_detail)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);

        const body = res.body;

        typeDetailId = body.id;

        body.id.should.be.a("number");
        body.user_id.should.be.a("number");
        body.name.should.be.a("string");
        body.description.should.be.a("string");
        body.is_deleted.should.be.false;
        body.should.be.a("object");

        done();
      });
  });

  it("POST Detail", (done) => {
    var detail = {
      description: "tag de piscina de nutella",
      number: 1,
    };

    chai
      .request(server)
      .post("/register/detail/" + houseId + "/" + typeDetailId)
      .send(detail)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);

        const body = res.body;

        detailId = body.id;

        body.id.should.be.a("number");
        body.house_id.should.be.a("number");
        body.number.should.be.a("number");
        body.description.should.be.a("string");
        body.is_deleted.should.be.false;
        body.should.be.a("object");

        done();
      });
  });

  it("Exports the fucking variables", (done) => {
    module.exports = {
      userId,
      houseId,
      typeDetailId,
      visitId,
      availableId,
      detailId,
    };

    done();
  });
});
