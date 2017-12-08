var Request = require("request");
const env = require('env2')('.\env');

describe("Server", () => {
    let server;
    let firstActivityId;
    beforeAll(() => {
        server = require("../app");
    });
    afterAll(() => {
    });
    describe("POST /API/addcategories", () => {
        let data = {};
        // add a new recipe to our database
        beforeAll((done) => {
            Request(
                { method: 'POST'
                , uri: 'http://localhost:3000/API/addcategories'
                , json: true
                , body:{cats:[{color:"amber",name:"fantastic"}]}
                }, (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            }).auth(null, null, true, process.env.VALID_TOKEN);
        });
        it("status 200", () => {
            expect(data.status).toBe(200);
        });
        it("check body", () => {
            console.log(data.body)
            expect(data.body.length).toBe(1);
        });
    });
    describe("GET /API/moods", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000/API/moods", (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                done();
            }).auth(null, null, true, process.env.VALID_TOKEN);
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            expect(data.body.length).toBe(6);
        });
    });
    describe("POST /API/checkactivity", () => {
        let data = {};
        // add a new recipe to our database
        beforeAll((done) => {
            Request(
                { method: 'POST'
                , uri: 'http://localhost:3000/API/checkactivity'
                , json: true
                , body:{username:"aissa",a:"Hiking"}
                }, (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            }).auth(null, null, true, process.env.VALID_TOKEN);
        });
        it("status 200", () => {
            expect(data.status).toBe(200);
        });
        it("check body", () => {
            expect(data.body.activity).toBe("none");
        });
    });
});