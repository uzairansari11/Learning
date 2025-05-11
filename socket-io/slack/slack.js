const express = require("express")

const app = express()

const socketIo = require("socket.io")
const namespaces = require("./data/namespaces")

app.use(express.static(__dirname + "/public"))
console.log("dir",__dirname+"/public")
const expressServer = app.listen(8000)

const io = socketIo(expressServer)

io.on("connect", (socket) => {
      console.log("--------------------------------")
      console.log("socket id", socket.id)
      
      // socket.emit("welcome",{text:"Welcome to server"})
      
      // socket.on("clientConnect", () => {
      //       console.log("socketId",socket.id)
      // })
      socket.emit("nsList", namespaces)
      console.log("--------------------------------");
      
})




