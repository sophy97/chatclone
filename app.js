// express로 구현한 app 담아서 결국 http로 실행한다
const { socket } = require("dgram");
const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app);
// 만들어둔 server를 socketio에 담는다 -> io통해 제어
const socketIO = require("socket.io");
// 시간 반영: moment
const moment = require("moment");
const { time } = require("console");

const io = socketIO(server);

// 서버가 실행되면 보여줄 폴더 지정하기
app.use(express.static(path.join(__dirname ,"src")));
const PORT = process.env.PORT || 5000;

io.on("connection", (socket)=>{
    // emit으로 내보낸 내용 받아오자
    socket.on("chatting", (data)=> {
        const { name, msg } = data;
        io.emit("chatting",{
            name:name,
            msg:msg,
            time: moment(new Date()).format("h:mm A")
        });
    })
})

server.listen(PORT, ()=>console.log(`server is running${PORT}`));


