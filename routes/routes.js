var random = require("random-js")();

var router = function(app) {
  app.post("/api/v1/user", function(req,res){
    var userId = req.userId;
    var response = {
      "rec" : random.integer(0,4294967295)
    }
    return res.send(response);
  })
  app.get("/", function(req, res){
    return res.send("Hello World");
  })
}

module.exports = router;
