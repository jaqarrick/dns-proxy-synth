const express = require("express");
const app = express();
const path = require("path");
const clientPort = 1312;

app.use(express.static(path.join(__dirname, "public")));
app.listen(clientPort, "localhost", () => {
  console.log("Client is up and running at 1312");
});

const proxy = require("udp-proxy"),
  options = {
    address: "192.168.1.1", // DNS Server Address
    port: 53,
    ipv6: false,
    localaddress: "127.0.0.1",
    localport: 53,
    localipv6: false,
    // proxyaddress: '::0',
    timeOutTime: 10000,
  };

const server = proxy.createServer(options);

server.on("listening", function (details) {
  console.log(
    "udp-proxy-server ready on " +
      details.server.family +
      "  " +
      details.server.address +
      ":" +
      details.server.port
  );
  console.log(
    "traffic is forwarded to " +
      details.target.family +
      "  " +
      details.target.address +
      ":" +
      details.target.port
  );
});

server.on("bound", function (details) {
  console.log(
    "proxy is bound to " + details.route.address + ":" + details.route.port
  );
  console.log(
    "peer is bound to " + details.peer.address + ":" + details.peer.port
  );
});

server.on("message", function (message, sender) {
  console.log("message from " + sender.address + ":" + sender.port);
});

server.on("proxyMsg", function (message, sender, peer) {
  console.log("answer from " + sender.address + ":" + sender.port);
});

server.on("proxyClose", function (peer) {
  console.log("disconnecting socket from " + peer.address);
});

server.on("proxyError", function (err) {
  console.log("ProxyError! " + err);
});

server.on("error", function (err) {
  console.log("Error! " + err);
});
