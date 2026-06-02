/*var http = require('http');
var fs = require('fs');

http.createServer((req, res) => {

    res.writeHead(200, { 'Content-Type': 'text/html' });

    if(req.url == "/")
    {
        res.end("<h1>Welcome in Home page</h1>");
    }

    else if(req.url == "/pr2")
    {
        fs.readFile('../html/pr2.html', (err, data) => {

            if(err)
                throw err;

            res.end(data);
        });
    }

    else if(req.url == "/pr9")
    {
        fs.readFile('../html/pr9.html', (err, data) => {

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

console.log("Server running on port 8081");*/

const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Home page');
});

app.get('/pr2', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/pr2.html'));
});

app.get('/pr9', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/pr9.html'));
});

app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(8081, () => {
    console.log('Server running on http://localhost:8081');
});