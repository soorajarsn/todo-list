const fs = require("fs");
const chai = require("chai");
const expect = chai.expect;
const app = require("./backend/databases/sqlite");
const assert = chai.assert;
let request = require("supertest");

const f2 = path => {
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

const f3 = path => {
  return new Promise((res, rej) => {
    fs.access(path, err => {
      if (err) {
        rej(0);
      } else {
        res(1);
      }
    });
  });
};

describe("Task 1 tests #start_test", function() {
  it("should ensure db file exist", done => {
    f2("./backend/databases/sqlite.js").then(res => {
      expect(res.split(" ")).to.include("lists");
      done();
    });
  });
  it("should ensure db file exist", done => {
    f2("./backend/databases/sqlite.js").then(res => {
      expect(res.split(" ")).to.include("dialect:");
      done();
    });
  });
  it("should ensure db file exist", done => {
    f2("./backend/databases/sqlite.js").then(res => {
      expect(res.split(" ")).to.include("users");
      done();
    });
  });
  it("should ensure db exist #end_test", done => {
    f3("./backend/databases/database.sqlite").then(res => {
      expect(res).to.equal(1);
      done();
      process.exit();
    });
  });
});
