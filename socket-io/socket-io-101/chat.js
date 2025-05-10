const express = require("express")

const app = express()

const socketIo = require("socket.io")

app.use(express.static(__dirname + "/public"))
console.log("dir",__dirname+"/public")
const expressServer = app.listen(8000)

const io = socketIo(expressServer)

io.on("connect", (socket) => {
      console.log("socket id", socket.id)
      
      socket.emit("messageFromServer", { data: "Hello form server your socket id is" + socket.id })
      
      socket.on("messageFromClient", (data) => {
            console.log("data", data)
            io.emit("newMessageFromServer",{text:`${data.text} id - ${socket.id}`})
      })
})