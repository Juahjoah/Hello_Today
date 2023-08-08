import React, { useEffect, useState, useRef } from "react";
import classes from "./Chat.module.css";
import { Scrollbars } from "react-custom-scrollbars-2";

function Chat({
  myUserName,
  mainStreamManager,
  question,
  isQuestionClick,
  setIsQuestionClick,
}) {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");

  // const chatScroll = React.createRef();
  const chatScroll = useRef(null);

  useEffect(() => {
    // Receiver of the message (usually before calling 'session.connect')
    mainStreamManager.stream.session.on("signal:chat", (event) => {
      const data = JSON.parse(event.data);
      let newMessageList = {
        connectionId: event.from.connectionId, // Connection object of the sender
        nickname: data.nickname,
        message: data.message, // Message
      };
      setMessageList((prev) => [...prev, newMessageList]);
    });
  }, []);

  // 아래는 메세지 보내는 것 관련 -----------------------------
  const messageChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const onClick = () => {
    sendMessage();
  };

  // 질문 test

  const sendQuestion = (Question) => {
    const data = {
      message: Question,
      nickname: "[시스템 관리자]",
      streamId: mainStreamManager.stream.streamId,
    };

    // Sender of the message (after 'session.connect')
    mainStreamManager.stream.session
      .signal({
        data: JSON.stringify(data), // Any string (optional)
        to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
        type: "chat", // The type of message (optional)
      })
      .then(() => {
        console.log("메세지가 성공적으로 보내졌습니다.");
        setIsQuestionClick(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isQuestionClick) {
      sendQuestion(question);
    }
  }, [isQuestionClick]);

  // 연결된 모든 참가자에게 broadcast message로 메세지 보내기
  const sendMessage = () => {
    let newMessage = message.replace(/ +(?= )/g, "");
    if (newMessage !== "" && newMessage !== " ") {
      const data = {
        message: message,
        nickname: myUserName,
        streamId: mainStreamManager.stream.streamId,
      };

      // Sender of the message (after 'session.connect')
      mainStreamManager.stream.session
        .signal({
          data: JSON.stringify(data), // Any string (optional)
          to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
          type: "chat", // The type of message (optional)
        })
        .then(() => {
          console.log("메세지가 성공적으로 보내졌습니다.");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setMessage("");
  };

  // 지금 전부다 홍길동이라 누가 치든 '나' 라고 나옴
  const renderNickname = (nickname) => {
    if (nickname === myUserName) {
      return `${nickname} (나)`;
    }
    return nickname;
  };

  const scrollToBottom = () => {
    if (chatScroll.current) {
      chatScroll.current.scrollToBottom();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <div className={classes.chatRoom}>
      <Scrollbars ref={chatScroll} autoHide={false} autoHideTimeout={1000}>
        <div className={classes.chatRoomTop}>
          <div ref={chatScroll} className={classes.chatRoomLog}>
            {messageList.map((data, i) => (
              <div
                key={i}
                className={
                  data.nickname === "[시스템 관리자]"
                    ? classes.questionMessage
                    : "null"
                }
              >
                <div>
                  <div className={classes.writer}>
                    {" "}
                    {renderNickname(data.nickname)} :{" "}
                  </div>
                </div>
                <div>
                  <p className={classes.content}>{data.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Scrollbars>
      <div id="messageInput" className={classes.chatRoomInputSection}>
        <input
          placeholder="write message"
          value={message}
          onChange={messageChangeHandler}
          onKeyDown={keyPressHandler}
          className={classes.chatRoomInputSectionInput}
        />
        <button onClick={onClick} className={classes.chatRoomInputSectionBtn}>
          GO
        </button>
      </div>
    </div>
  );
}

export default Chat;
