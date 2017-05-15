var router = function(app) {
  app.post("/api/v1/user", function(req,res){
    var userId = req.userId;
    var response = {
      "rec" : parseInt((Math.random() * 1000), 10).toString()
    }
    return res.send(response);
  })
  app.get("/api/v1/helloworld", function(req, res){
    return res.send("Hello World");
  })
}

module.exports = router;
