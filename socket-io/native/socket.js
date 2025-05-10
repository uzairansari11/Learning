const http = require("http")
/* WS is third party module */
const ws = require("ws")

const server = http.createServer((req, res) => {
      res.end("I am listening and connected")
})

const wss= new ws.WebSocketServer({server})

// Step :2
wss.on("connection", (webSocket, request) => {
      console.log("connect socket", webSocket)

      webSocket.send("Welcome to web socket world")

      webSocket.on("message", (data) => {
      console.log("data of message",data)
})
})


// wss.on("headers", (headers, request) => {
//       console.log("headers", headers)

//       console.log("--------------")

//       // console.log("request",request)
// })
server.listen(8000)