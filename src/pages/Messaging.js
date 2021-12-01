import React, { useEffect, useState } from "react";
import "../pages/Messaging.css";
import InboxChat from "../components/common/InboxChat";
import Header from "../components/common/Header";
import SideBar from "../components/common/SideBar";
import Conversation from "../components/common/Conversation";
import { connect } from "react-redux";
import { parentConversation } from "../redux/actions/parentConversation";

function Messaging(props) {
  const { parentConversation,parents } = props;

  return (
    <div>
      <Header />
      <SideBar />
      <div className="content-body" style={{ minHeight: "929.493px" }}>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Messages</h1>
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="messaging">
            <div className="inbox_msg">
              <div className="inbox_people">
                <div className="headind_srch">         
                    <h4>Liste des parents</h4>
                </div>
                <div className="inbox_chat" >
                  {parents?.data?.map((parent, i) => (
                    <>
                      <button style={{width: "100%"}}
                        onClick={() => {
                          parentConversation(parent);
                        }}
                      >
                        <InboxChat key={i} parent={parent}></InboxChat>
                      </button>
                    </>
                  ))}
                </div>
              </div>
              <Conversation ></Conversation>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
return{
  parents:state.parents.parents,}
};
const mapDispatchToProps = (dispatch) => ({
  parentConversation: (parent) => dispatch(parentConversation(parent)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Messaging);
