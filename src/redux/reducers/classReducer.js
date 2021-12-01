import { GET_CLASSES} from "../types";
const initState = {
  classes: [],
  loding:true,
};

const classReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CLASSES: {
      return {
        ...state,
        classes: action.payload,
        loding:false,
      };
    }
    default:
      return state;
  }
};

export default classReducer;
