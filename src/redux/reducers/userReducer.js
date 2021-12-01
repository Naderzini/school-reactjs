import { USER_LOGIN, USER_LOGOUT } from "../types";

const initState = {
  user : { },
};
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
    return{
      ...state,
      user:action.payload
    }}
    case USER_LOGOUT: {
      return{
        ...state,
        user:null,
      }
      }

    default:
      return state;
  }
};

export default userReducer;
