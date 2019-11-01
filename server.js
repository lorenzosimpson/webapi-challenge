const express = require('express');
const server = express();

const actionRouter = require('./routers/actionRouter');
const projectRouter = require('./routers/projectRouter');
// import routers

server.use(express.json());
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

server.get('/api', (req, res) => {
    res.send("Server up and running!")
})

module.exports = server;