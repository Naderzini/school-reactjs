import { PARENT_CONVERSATION } from "../types";

const initState = {
  parent : {},
};
const parentConversation = (state = initState, action) => {
  switch (action.type) {
    case PARENT_CONVERSATION: {
    return{
      ...state,
      parent:action.payload
    }}
   
    default:
      return state;
  }
};

export default parentConversation;
