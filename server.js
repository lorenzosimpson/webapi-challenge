const express = require('express');
const server = express();
// import routers

server.use(express.json());


server.get('/api', (req, res) => {
    res.send("Server up and running!")
})

module.exports = server;