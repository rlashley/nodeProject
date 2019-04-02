const http = require('http');

var app = http.createServer((req,res)=>{
  res.writeHead(200,{'Content-Type': 'text/plain'});
  res.end('Hello World!\n');
});
app.listen(3000, ()=>console.log('Server running at port 3000'));