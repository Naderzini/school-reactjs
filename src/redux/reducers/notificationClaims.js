import {INCREMENT_NOTIFICATION,INITIALISATION_NOTIFICATION} from '../types'

const initSatet = {
    nbClaims : 0,
}
const notificationClaimsReducer = ( state = initSatet, action)=>{
    switch(action.type){
        case INCREMENT_NOTIFICATION : return {
            ...state,
            nbClaims: state.nbClaims + 1
        }
        case INITIALISATION_NOTIFICATION : return {
            ...state,
            nbClaims: 0
        }
        default: return state
    }
}

export default notificationClaimsReducer;