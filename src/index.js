const logger = require('./logger')
const proxyServer = require('./proxy')
const broadcaster = require('./broadcaster')

proxyServer.on("listening", function (details) {
  logger.log({
    level: 'info',
    message: 
    "udp-proxy-server ready on " +
      details.server.family +
      "  " +
      details.server.address +
      ":" +
      details.server.port
  })

  logger.log({
    level: logger.levels.info,
    message: "traffic is forwarded to " +
    details.target.family +
    "  " +
    details.target.address +
    ":" +
    details.target.port
  })
});

proxyServer.on("bound", function (details) {
  logger.log({
    level: logger.levels.info,
    message: "proxy is bound to " + details.route.address + ":" + details.route.port
  })

  logger.log({
    level: logger.levels.info,
    message: "peer is bound to " + details.peer.address + ":" + details.peer.port
  })
});

proxyServer.on("message", function (message, sender) {
  broadcaster.sendQuery({message, sender})
  logger.log({
    level: logger.levels.info,
    message: "message from " + sender.address + ":" + sender.port
  })
});

proxyServer.on("proxyMsg", function (message, sender, peer) {
  broadcaster.sendAnswer({
    message,
    sender,
    peer
  })
  logger.log({
    level: logger.levels.info,
    message:"answer from " + sender.address + ":" + sender.port
  })
});

proxyServer.on("proxyClose", function (peer) {
  logger.log({
    level: logger.levels.info,
    message:"disconnecting socket from " + peer.address
  })
});

proxyServer.on("proxyError", function (err) {
  logger.log({
    level: logger.levels.info,
    message:"ProxyError! " + err
  })
});

proxyServer.on("error", function (err) {
  logger.log({
    level: logger.levels.info,
    message:"Error! " + err
  })
});
