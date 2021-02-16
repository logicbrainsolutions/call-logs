// provides functionality to spin up server
const http = require('http');

const app = require('./app');
// port at which project should run
const port = 3001;

// creates server
const server = http.createServer(app);

server.listen(port);