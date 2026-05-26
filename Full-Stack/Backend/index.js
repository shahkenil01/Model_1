var http = require('http');

http.createServer((req, res) =>{
  res.end("<h1>Server is running</h1>");
}).listen(8080);