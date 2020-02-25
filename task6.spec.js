let request = require("supertest");
let app = require("./app");
const fs = require("fs");
const chai = require("chai");
const expect = chai.expect;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const readData = path => {
  return new Promise((res, rej) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        rej("Error in reading");
      } else {
        res(data);
      }
    });
  });
};

describe("Session tests #start_test:", function() {
  it("should check signin page #end_test", function(done) {
    request(app)
      .post("/signup")
      .set("Accept", "application/json")
      .send({ name: "John Wick", email: "john@wick.com", password: "mydog<3" })
      .end(function(err, res) {
        if (err) return done(err);

        const wget = require("wget-improved");
        const src = "http://localhost:4000";
        const output = "./profile.html";
        let download = wget.download(src, output);

        readData("./profile.html").then(res => {
          const create_data = res;
          const dom = new JSDOM(create_data);
          expect(
            dom.window.document.getElementsByTagName("input").length
          ).to.equal(1);
          done();
          process.exit();
        });

        done();
        process.exit();
      });
  });
});
