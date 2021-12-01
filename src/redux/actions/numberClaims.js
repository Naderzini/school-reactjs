import {INCREMENT_NOTIFICATION,INITIALISATION_NOTIFICATION} from '../types'

export function increment (){
    return {
        type : INCREMENT_NOTIFICATION,
    }
}
export function init (){
    return {
        type :INITIALISATION_NOTIFICATION,
    }
}
