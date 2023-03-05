const express = require("express");
const app = express();
const path = require("path");
const http = require('http');
const httpServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer);
const logger = require('./logger')

const clientPort = 1312;
app.use(express.static(path.join(__dirname, "public")));

httpServer.listen(clientPort, "localhost", () => {
  // console.log("Client is up and running at 1312");
  logger.log({
    level: 'info',
    message: 'Client is up and running at 1312'
  })
});


module.exports = io

require('./broadcaster')