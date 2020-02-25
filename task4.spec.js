const fs = require("fs");
const chai = require("chai");
const expect = chai.expect;
let request = require("supertest");
var assert = require("assert");
var app = require("./app");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const wget = require("wget-improved");
const src = "http://localhost:4000/signup";
const output = "./signup.html";

let download = wget.download(src, output);

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

describe("Todo Testcases #start_test", function() {
  it("should check dummy", done => {
    readData("./signup.html").then(res => {
      const create_data = res;
      const dom = new JSDOM(create_data);
      expect(3).to.equal(3);
      done();
    });
  });
  it("should check signup page's input fields", done => {
    readData("./signup.html").then(res => {
      const create_data = res;
      const dom = new JSDOM(create_data);
      expect(dom.window.document.getElementsByTagName("input").length).to.equal(
        3
      );
      done();
    });
  });
  it("should check signup page's buttons", done => {
    readData("./signup.html").then(res => {
      const create_data = res;
      const dom = new JSDOM(create_data);
      expect(
        dom.window.document.getElementsByTagName("button").length
      ).to.equal(2);
      done();
    });
  });
});

describe("TODO Testcases", function() {
  it("should check the port #end_test", function(done) {
    request(app)
      .get("/signup")
      .set("Accept", "application/json")
      .end(function(err, res) {
        assert.equal(res.status, 200);
        done();
        process.exit();
      });
  });
});
