let request = require("supertest");
let app = require("./app");
const assert = require("chai").assert;

var Cookies;

describe("Functional Test: #start_test", function() {
  it("should create user session for valid user #end_test", function(done) {
    request(app)
      .post("/signin")
      .set("Accept", "application/json")
      .send({ email: "john@wick.com", password: "mydog<3" })
      .then(function(err, res) {
        request(app)
          .post("/add")
          .send({ id: 1 })
          .set("Accept", "application/json")
          .end(function(err, res) {
            assert.equal(res.status, 302);
            console.log("The Cookie: " + Cookies);
            done();
            process.exit();
          });
      });
  });
});
