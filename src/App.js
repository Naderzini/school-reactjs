import React, { useEffect } from "react";
import Routers from "./Routers";
import { connect } from "react-redux";
import { getClasses } from "./redux/actions/classe";
import { getSubjects } from "./redux/actions/subjects";
import { getParents } from "./redux/actions/parents";
import { increment } from "./redux/actions/numberClaims";
import firebase from "./firebase";
import axios from "axios";
import {RECLATION,SAVE_TOKEN} from"./Constants.js"

function App(props) {
  const {
    getParents,
    getClasses,
    getSubjects,
    user,
    increment,
  } = props;
  useEffect(() => {
    const messaging = firebase.messaging();
    messaging
      .requestPermission()
      .then(() => {
        return messaging.getToken();
      })
      .then((token) => {
        axios
          .post(
            `${process.env.REACT_APP_API_URL}${SAVE_TOKEN}${user.id}`,
            { device_token: token },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            console.log(response);
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error);
      });
      
    messaging.onMessage((payload) => {
      if (payload.notification.title === RECLATION) {
        increment();
      }
    });
    getClasses();
    getParents();
    getSubjects();
  }, [getClasses,getParents,getSubjects]);
   return   <Routers />

}
const mapStateToProps = (state) => {
  return {
    classes: state.classes.classes,
    subjects:state.subjects.subjects,
    parents:state.parents.parents,
    user: state.user.user,
    claimNumber: state.notificationClaims.nbClaims,
  };
};
const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch(increment()),
  getClasses: () => dispatch(getClasses()),
  getParents: () => dispatch(getParents()),
  getSubjects: () => dispatch(getSubjects()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
