import React, { useEffect, useState } from "react";
import OutingMsg from "../common/OutingMsg";
import CumingMsg from "../common/CumingMsg";
import firebase from "../../firebase";
import axios from "axios";
import MessageInput from "../inputs/MessageInput";
import { connect } from "react-redux";
import {GET_MESSAGES, SEND_MESSAGE} from '../../Constants'

function Conversation(props) {
  const { admin,parent } = props;
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [messageNotification, setMessageNotification] = useState("");
  const admin_id = admin.id;
  const parent_id = parent.id;

  function getMessages() {
    axios
      .get(`${process.env.REACT_APP_API_URL}${GET_MESSAGES}${parent.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200){
        setMessages(response.data.data);}
      })
      .catch((error) => {
        console.log(error);
      });
  }


  function onSubmit() {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}${SEND_MESSAGE}`,
        { content,parent_id, admin_id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200){
        setContent("");
        getMessages(); }
        
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const messaging = firebase.messaging();
  useEffect(
    () => {
      getMessages();
      messaging.onMessage((payload) => {
        if (payload.notification.title === "message") {
          console.log(payload.notification);
          setMessageNotification(payload.notification);
        }
      });
    },
    [messageNotification,parent_id],
    []
  );
  return (
    <div>
      <div className="mesgs">
        <div className="msg_history">
          {messages?.map((message, i) => (
            <>
              {message.admin_id === null ? (
                <CumingMsg key={i} cumingMessages={message}></CumingMsg>
              ) : (
                <OutingMsg key={i} outingMessages={message}></OutingMsg>
              )}
            </>
          ))}
        </div>
        <MessageInput
          type={"text"}
          className={"write_msg"}
          name={"content"}
          placeholder={"ecrire votre message"}
          value={content}
          handleChange={(e) => setContent(e.target.value)}
          onSubmit={onSubmit}
        ></MessageInput>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    admin: state.user.user,
    parent:state.parentConversation.parent
  };
};
const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
