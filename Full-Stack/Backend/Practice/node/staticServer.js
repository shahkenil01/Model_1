const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'Public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'index.html'));
});

app.post("/api/users", (req, res) => {
    // Handle user registration logic here
});

app.listen(8081, () => {
    console.log('Server running on http://localhost:8081');
});