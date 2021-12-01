import React from "react";
import './ButtonStyle.css'

function InboxChat(props) {
  const { parent, key } = props;
  return (
    <div key={key} >
        <div className="chat_list active_chat" style={{height:"70px",width: "100%"}}>
          <div className="chat_people">
            <div className="chat_img">
              {" "}
              {parent.photo === null ?
               <img
               style={{width:"40px",height:"40px",borderRadius:"20px",marginBottom:"10px"}}
               src="images/avatar/profil.png"
               alt="sunil"
             />:
              <img
              style={{width:"40px",height:"40px",borderRadius:"20px"}}
                src={`${process.env.REACT_APP_PHOTO_URL}${parent.photo}`}
                alt="user"
              />}
            </div>
            <div className="chat_ib">
              <h4>
                {parent.first_name} {parent.last_name}
              </h4>
            </div>
          </div>
        </div>
    </div>
  );
}

export default InboxChat;
