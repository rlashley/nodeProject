const mysql = require('mysql');
const express = require('express');
const app = express();
var router = express.Router();
const path = require('path');
var direct = __dirname + '/page/';

app.use(express.static(path.join(__dirname, 'public')));

//Create a connection to the db
const con = mysql.createConnection({
  host: 'localhost',
  user: 'test',
  password: 'test',
  database: 'test',
});

router.get('/products',(req,res)=>{
  con.connect((err) => {
    if(err){
      console.log('Error relating to connection: ' + err);
      return;
    }
    console.log('Connection established');
  
        con.query('SELECT * FROM ProductList', (err, rows, fields) => {
            if (!err) {
                res.send(rows);
                con.end(function(err) {
                    if (err) {
                        return console.log('error:' + err.message);
                    }
                    console.log('Close the database connection.');
                });
            } else
                console.log(err);
        })
    });

});

router.get('/myinfo',(req,res)=>{
  con.connect((err) => {
    if(err){
      console.log('Error relating to connection: ' + err);
      return;
    }
    console.log('Connection established');
  
        con.query('SELECT * FROM HireMe', (err, rows, fields) => {
            if (!err) {
                res.send(rows);
                con.end(function(err) {
                    if (err) {
                        return console.log('error:' + err.message);
                    }
                    console.log('Close the database connection.');
                });
            } else
                console.log(err);
        })
    });

});

router.use(function (req,res,next) {
  console.log("/" + req.method + req.url);
  next();
});

router.get("/",(req,res)=>{
  res.sendFile(direct + "index.html");
});

router.get("/index.html",(req,res)=>{
  res.sendFile(direct + "index.html");
});

router.get("/about.html",(req,res)=>{
  res.sendFile(direct + "about.html");
});

router.get("/contact.html",(req,res)=>{
  res.sendFile(direct + "contact.html");
});

router.get("/projects.html",(req,res)=>{
  res.sendFile(direct + "projects.html");
});

router.get("/api/:id", (req,res)=>{
  console.log("Api accessed");  
  if(req.params.id!=null){
    res.send("This is a test of my API using passed paramaters " + req.params.id);
  }
  else {
    res.send("This is a test of my API");
  }
});

app.use("/",router);

app.listen(3000,()=>console.log('Express server is running at port 3000.'));

process.on('uncaughtException', function (e) {

  console.log(new Date().toString(), e.stack || e);

  process.exit(1);

});
