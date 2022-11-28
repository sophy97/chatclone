"use strict"

const socket = io();

const nickname = document.querySelector('#nickname');
const chatList = document.querySelector('.chatting-li');
const chatInput = document.querySelector('.chatting-input');
const sendBtn = document.querySelector('.send-btn');
const displayContainer = document.querySelector('.display-con');

// 엔터키(값13) 누르면 보내지도록 함수 작성해서 넣기!
chatInput.addEventListener("keypress", (event)=>{
    if(event.keycode === 13) {
        send();
    }
})

function send (){
    const param = {
        name:nickname.value,
        msg:chatInput.value,
    }
    socket.emit("chatting", param);
}
sendBtn.addEventListener("click", send);

socket.on("chatting", (data) => {
    const {name, msg, time} = data;
    // LiModel을 초기화(인스턴스화)
    const item = new LiModel(name, msg, time);
    item.makeLi();
    displayContainer.scrollTo(0, displayContainer.scrollHeight);
})

// 서버에서 data 받을 때마다 LiModel함수를 ul에 던져야
function LiModel(name, msg, time) {
    // 인자들 초기화할당함 : makeLi메소드에서 값에 접근하기 위함
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi =()=> {
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "received");
        // dom변수를 만들어 html에 있던 li를 그대로 들고오기
        const dom = `
        <span class="profile">
            <span class="user">${this.name}</span>
        <img class="img" src="https://placeimg.com/50/50/any" alt="any">
        </span>
        <span class="message">${this.msg}</span>
        <span class="time">${this.time}</span>`;
        li.innerHTML = dom;
        chatList.appendChild(li);
    }
}

console.log(socket);