var request = require("request"),
    assert = require('assert'),
    server = require("../server.js"),
    base_url = "http://localhost:80/";

describe("Hello World", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        //expect(response.statusCode).toBe(200);
        assert.equal(200, response.statusCode);
        done();
      });
    });

    it("returns Hello World", function(done) {
      request.get(base_url, function(error, response, body) {
        //expect(body).toBe("Hello World");
        assert.equal("Hello World", body);
        done();
      });
    });
  });
});

describe("USER ID", function() {
  describe("POST /api/v1/user", function() {
    it("returns status code 200", function(done) {
      request.post(base_url + 'api/v1/user', {json: { 'userId' : "123" } }, function(error, response, body) {
        //expect(response.statusCode).toBe(200);
        assert.equal(200, response.statusCode);
        done();
      });
    });

    //checks if number is between 0 and 4294967295
    it("returns a 1^32-1 number", function(done) {
      request.post(base_url + 'api/v1/user', {json: { 'userId' : "123" } }, function(error, response, body) {
        //expect(body).toBe("Hello World");

        Number.prototype.between = function(a, b, inclusive) {
          var min = Math.min(a, b),
          max = Math.max(a, b);

          return inclusive ? this >= min && this <= max : this > min && this < max;
        }
        assert.equal(true, response.body['rec'].between(0,4294967295));
        server.closeServer();
        done();
      });
    });
  });
});
