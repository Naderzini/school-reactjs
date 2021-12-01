import { combineReducers } from "redux";
import userReducer from './userReducer'
import classReducer from './classReducer'
import parentReducer from './parentReducer'
import notificationClaimsReducer from "./notificationClaims"
import subjectReducer from "./subjectReducer";
import  parentConversation  from "./parentConversationReducer";



export default combineReducers({
    user:userReducer,
    classes:classReducer,
    subjects:subjectReducer,
    parents:parentReducer,
    notificationClaims:notificationClaimsReducer,
    parentConversation:parentConversation,
   }); 
