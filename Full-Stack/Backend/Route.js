var http = require('http');
var fs = require('fs');

http.createServer((req, res) => {

    res.writeHead(200, { 'Content-Type': 'text/html' });

    if(req.url == "/")
    {
        res.end("<h1>Welcome in Home page</h1>");
    }

    else if(req.url == "/pr2")
    {
        fs.readFile('./pr2.html', (err, data) => {

            if(err)
                throw err;

            res.end(data);
        });
    }

    else if(req.url == "/pr9")
    {
        fs.readFile('./pr9.html', (err, data) => {

            if(err)
                throw err;

            res.end(data);
        });
    }

    else
    {
        res.end("Page not found");
    }

}).listen(8081);

console.log("Server running on port 8081");