import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

function ChatTest() {
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

            stompClient.send("/pub/1", {}, JSON.stringify({data: "Hello!"}));

            stompClient.subscribe("/sub/1", function (message) {
                    console.log("메세지: " + message.body);
            });
        });
    }

    // const sendHandler = () => {
    //     stompClient.send("/pub/chat/1", {}, JSON.stringify({"data": "Hello!"}));
    // }

    connectHandler();
    
    return (
      <p>
        채팅 테스트
        
      </p>
    );
  }
  
  export default ChatTest;
  