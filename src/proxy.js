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

const proxyServer = proxy.createServer(options);

module.exports = proxyServer

