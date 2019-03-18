const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
var router = express.Router();
const path = require('path');
var direct = __dirname + '/page/';

app.use(bodyparser.json);
app.use(express.static(path.join(__dirname, 'public')));

//Create a connection to the db
const con = mysql.createConnection({
  host: 'localhost',
  user: 'test',
  password: 'test',
  database: 'test',
});

con.connect((err) => {
  if(err){
    console.log('Error relating to connection: ' + err);
    return;
  }
  console.log('Connection established');
});

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

router.get("/api/:id", function(req,res){
  console.log("Api accessed");  
  if(req.params.id!=null){
    res.send("Please hire me!!" + req.params.id);
  }
  else {
    res.send("Please hire me!!");
  }
});

router.get('/products',(req,res)=>{
  con.query('SELECT * FROM ProductList',(err,rows,fields)=>{
    if(!err)
      res.send(rows);
    else
      console.log(err);
  })
});

app.use("/",router);

app.listen(3000,()=>console.log('Express server is running at port 3000.'));