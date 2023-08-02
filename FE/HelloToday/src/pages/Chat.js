import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

function Chat() {
    console.log("어ㅓㅓㅓ");
    const socket = new SockJS("http://localhost:8080/api/chat");
    const stompClient = Stomp.over(socket);

    const connectHandler = () => {
    stompClient.connect(
        {
        // Authorization: "access token"
        },
        function(frame) {
            console.log("연결: " + frame);
            stompClient.send("/enter/1", {}, JSON.stringify({type: "ENTER", roomId: 1, senderId: 1, content: "입장"}));
            stompClient.subscribe("/sub/1", function (message) {
                console.log("메세지: " + message.body);
            });

            stompClient.send("/pub/1", {}, JSON.stringify({type: "TALK", roomId: 1, senderId: 1, content: "Hello!"}));
        });
    }

    connectHandler();
    
    return (
      <p>
        채팅 테스트
        
      </p>
    );
  }
  
  export default Chat;
  