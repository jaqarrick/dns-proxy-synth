const io = require("./client");
io.on("connection", (socket) => {
  console.log("a user connected");
});

const sendQuery = details => io.emit('query', details)
const sendAnswer = details => io.emit('answer', details)

module.exports = {
  sendAnswer,
  sendQuery
}