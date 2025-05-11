### path option   by default $\rightarrow$ "/socket.io"

 ```
 Server
const io = socketIo(expressServer,{
      path:"/new-path"
})

Client



script src="/new-path/socket.io.js"></script>

<script>
  // new-path is going to add io object to global scope

  // console.log(io)

  const socket = io("http://localhost:8000",{
      path:"/new-path"
  });
</script>

 ```



