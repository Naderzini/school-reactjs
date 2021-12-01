import React from 'react'
import moment from "moment";

function OutingMsg(props) {
  const {outingMessages} = props
    return (
        <div>
            <div className="outgoing_msg" style={{marginTop: "0px",marginBottom: "0px"}}>
                <div className="sent_msg">
                  <p> {outingMessages.content}</p>
                  <span className="time_date">{moment(outingMessages.created_at).format("HH:mm")}</span>{" "}
                </div>
              </div>
        </div>
    )
}

export default OutingMsg
