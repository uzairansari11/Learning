// Step :1
const ws = new WebSocket('ws://localhost:8000')

console.log('websocket constructor',ws);


ws.onopen = (event) => {
      console.log("event", event)
      
      ws.send("I am so excited!")
}

ws.onmessage = (message) => {
      console.log(message)
}