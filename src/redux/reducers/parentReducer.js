import { GET_PARENTS} from "../types";
const initState = {
  parents: [],
  loding:true,
};

const parentReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PARENTS: {
      return {
        ...state,
        parents: action.payload,
        loding:false,
      };
    }
    default:
      return state;
  }
};

export default parentReducer;
