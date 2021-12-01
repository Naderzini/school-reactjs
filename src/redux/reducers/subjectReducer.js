import { GET_SUBJECTS } from "../types";
const initState = {
  subjects: [],
  loding:true
};

const subjectReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_SUBJECTS: {
      return {
        ...state,
        subjects: action.payload,
        loding:false
      };
    }

    default:
      return state;
  }
};

export default subjectReducer;
