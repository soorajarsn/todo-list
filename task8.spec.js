const fs = require("fs");
const chai = require("chai");
const expect = chai.expect;
let request = require("supertest");
var assert = require("assert");
var app = require("./app");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const wget = require("wget-improved");
const src = "http://localhost:4000";
const output = "./signin2.html";

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

describe("Todo TC2 #start_test", function() {
  it("should check dummy", done => {
    readData("./signin2.html").then(res => {
      const create_data = res;
      const dom = new JSDOM(create_data);
      expect(2).to.equal(2);
      done();
    });
  });
  it("should check page 1", done => {
    readData("./signin2.html").then(res => {
      const create_data = res;
      const dom = new JSDOM(create_data);
      expect(dom.window.document.getElementsByTagName("input").length).to.equal(
        2
      );
      done();
    });
  });
  it("should check page 2 #end_test", done => {
    readData("./signin2.html").then(res => {
      const create_data = res;
      const dom = new JSDOM(create_data);
      expect(
        dom.window.document.getElementsByTagName("button").length
      ).to.equal(2);
      done();
      process.exit();
    });
  });
});
