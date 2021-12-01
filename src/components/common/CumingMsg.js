import React from 'react'
import moment from "moment";

function CumingMsg(props) {
  const {cumingMessages} = props
    return (
        <div>
             <div className="incoming_msg">
                <div className="received_msg">
                  <div className="received_withd_msg">
                    <p>{cumingMessages.content}</p>
                    <span className="time_date"> {moment(cumingMessages.created_at).format("HH:mm")}</span>
                  </div>
                </div>
              </div>
        </div>
    )
}

export default CumingMsg
