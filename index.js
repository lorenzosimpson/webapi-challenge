const express = require('express')
const server = require('./server');

const port = 5000;
server.listen(port, () => console.log(`\n === Server running on port ${port} === \n`) )
