var chai = require("chai")
var chaiHttp = require("chai-http")
var expect = chai.expect
var server = "http://localhost:8080"
chai.should()

chai.use(chaiHttp)

var userIdg
var houseIdg
var typeDetailIdg
var visitIdg
var detailIdg

describe('GET TESTS', () => {

    
    it("Import the fucking variables", (done) => {
        const { userId, houseId, visitId, typeDetailId, detailId } = require("./01_Post")

        userIdg = userId
        houseIdg = houseId
        typeDetailIdg = typeDetailId
        visitIdg = visitId
        detailIdg = detailId

        done()
    })    

    it("GET All Users", (done) => {
        chai.request(server)
        .get('/users')
        .end((err, res) => {
            res.should.have.status(200)
            
            res.body.should.be.a('array')

            done()
        })

    })    
    
    it("GET User", (done) => {
        chai.request(server)
        .get('/user/' + userIdg)
        .end((err, res) => {
            res.should.have.status(200)
            
            res.body.id.should.be.a("number")
            res.body.name.should.be.a("string")
            res.body.email.should.be.a("string")
            res.body.password.should.be.a("string")
            res.body.cellphone.should.be.a("string")
            res.body.cpf.should.be.a("string")
            res.body.address.should.be.a("string")
            res.body.is_deleted.should.be.false
            res.body.should.be.a('object')

            done()
        })

    })    

    it("GET House", (done) => {

        chai.request(server)
        .get('/house/' + houseIdg)
        .end((err, res) => {
            expect(res.statusCode).to.equal(200);
                
            res.body.id.should.be.a("number")
            res.body.user_id.should.be.a("number")
            res.body.land_size.should.be.a("string")
            res.body.price.should.be.a("number")
            res.body.address.should.be.a("string")
            res.body.description.should.be.a("string")
            res.body.number_bedroom.should.be.a("number")
            res.body.number_bath.should.be.a("number")
            res.body.is_deleted.should.be.false 
            res.body.should.be.a("object")

            done()
    
        })
    

    })

    it("GET All Houses", (done) => {
        chai.request(server)
        .get('/houses')
        .end((err, res) => {
            res.should.have.status(200)
            
            res.body.should.be.a('array')

            done()
        })
    })

    it("GET Visit", (done) => {

        chai.request(server)
        .get('/visit/' + visitIdg)
        .end((err, res) => {
            expect(res.statusCode).to.equal(200);
                
            res.body.id.should.be.a("number")
            res.body.user_id.should.be.a("number")
            res.body.house_id.should.be.a("number")
            res.body.day_hour_visit.should.be.a("string")
            res.body.is_confirmed.should.be.true
            res.body.is_deleted.should.be.false 
            res.body.should.be.a("object")


            done()
    
        })
    

    })

    it("GET Available", (done) => {

        chai.request(server)
        .get('/available/' + houseIdg)
        .end((err, res) => {

            expect(res.statusCode).to.equal(200);

            const body = res.body[0]
            body.id.should.be.a("number")
            body.address.should.be.a("string")
            body.description.should.be.a("string")
            body.availables.should.be.a("array")
            body.should.be.a("object")

            done()
        })
    })

    it("GET Type Detail", (done) => {

        chai.request(server)
        .get('/tdetail/' + typeDetailIdg)
        .end((err, res) => {
            expect(res.statusCode).to.equal(200);

            const body = res.body

            body.id.should.be.a("number")
            body.user_id.should.be.a("number")
            body.name.should.be.a("string")
            body.description.should.be.a("string")
            body.is_deleted.should.be.false 
            body.should.be.a("object")

            done()
        })
    })

    it("GET Detail", (done) => {

        chai.request(server)
        .get('/detail/' + detailIdg)
        .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            const body = res.body

            body.id.should.be.a("number")
            body.house_id.should.be.a("number")
            body.number.should.be.a("number")
            body.description.should.be.a("string")
            body.is_deleted.should.be.false 
            body.should.be.a("object")

            done()
        })
    })
})