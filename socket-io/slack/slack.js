const express = require("express")

const app = express()

const socketIo = require("socket.io")
const namespaces = require("./data/namespaces")
const Room = require("./classes/Room")

app.use(express.static(__dirname + "/public"))
console.log("dir",__dirname+"/public")
const expressServer = app.listen(8000)

const io = socketIo(expressServer)
app.get("/change-ns", (req, res) => {
      namespaces[0].addRoom(new Room(namespaces[0].rooms.length+1, "Delete Articles", namespaces[0].id))
      io.of(namespaces[0].id).emit("nsChange",namespaces[0])
      res.json(namespaces[0])
})
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




