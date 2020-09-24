const express = require("express");
const socket = require("socket.io");
const path = require("path")

const PORT = 5500;
const app = express();

app.get("/",(req,res)=>{
    res.sendFile(path.resolve("./public/index.html"))
})

const server = app.listen(PORT,function(){
    console.log(`Listening on port : ${PORT}`);
})

app.use(express.static("public"));

const io = socket(server)
let s = 0;
io.on("connect",socket=>{
    console.log("Server made socket connection.")
    socket.on("client-event",(data)=>{
        console.log(data)
        socket.emit("server-event",{message:"Server sent message"+s})
        s+=1;
    })
})

