import {GET_CLASSES,CLASSES_ERROR} from '../types'
import {  GET_CLASSES_FORMS } from "../../Constants";
import axios from 'axios'

export const getClasses = () => async dispatch => {
    
    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}${ GET_CLASSES_FORMS}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })     
        dispatch( {
            type: GET_CLASSES,
            payload: res.data,
            
        })
    }
    catch(e){
        dispatch( {
            type: CLASSES_ERROR,
            payload: console.log(e),
        })
    }
}
