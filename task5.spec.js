let request = require("supertest");
let app = require("./app");
const assert = require("chai").assert;

var Cookies;

describe("Session tests #start_test:", function() {
  it("should check signin page", function(done) {
    request(app)
      .post("/signin")
      .set("Accept", "application/json")
      .send({ email: "led@zeppelin.com", password: "stairwaytoheaven" })
      .end(function(err, res) {
        if (err) return done(err);
        assert.equal(res.status, 302);
        Cookies = res.header["set-cookie"];
        assert.notEqual(Cookies, undefined);
        console.log("The Cookie: " + Cookies);
        done();
      });
  });
  it("should check signup page #end_test", function(done) {
    request(app)
      .post("/signup")
      .set("Accept", "application/json")
      .send({
        name: "Freddie Mercury",
        email: "fred@merc.com",
        password: "123"
      })
      .end(function(err, res) {
        if (err) return done(err);
        assert.equal(res.status, 302);
        Cookies = res.header["set-cookie"];
        assert.notEqual(Cookies, undefined);
        console.log("The Cookie: " + Cookies);
        done();
        process.exit();
      });
  });
});
