var express = require("express");
var app = express();
var router = express.Router();
const path = require('path');
var direct = __dirname + '/page/';
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

router.use(function (req,res,next) {
  console.log("/" + req.method + req.url);
  next();
});

router.get("/",function(req,res){
  res.sendFile(direct + "index.html");
});

router.get("/index.html",function(req,res){
  res.sendFile(direct + "index.html");
});

router.get("/about.html",function(req,res){
  res.sendFile(direct + "about.html");
});

router.get("/contact.html",function(req,res){
  res.sendFile(direct + "contact.html");
});

router.get("/api/:id", function(req, res){
  console.log("Api accessed");  
  if(req.params.id!=null){
    res.send("Please hire me!!" + req.params.id);
  }
  else {
    res.send("Please hire me!!");
  }
});

app.use("/",router);

app.listen(3000, () => console.log(`Live at Port ${port}`));

