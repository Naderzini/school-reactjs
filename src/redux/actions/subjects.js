import {GET_SUBJECTS, SUBJECTS_ERROR} from '../types'
import axios from 'axios'
import { GET_SUBJECTS_FORMS } from '../../Constants'

export const getSubjects = () => async dispatch => { 
    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}${GET_SUBJECTS_FORMS}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
        dispatch( {
            type: GET_SUBJECTS,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: SUBJECTS_ERROR,
            payload: console.log(e),
        })
    }
}



