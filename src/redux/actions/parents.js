import {GET_PARENTS,PARENTS_ERROR} from '../types'
import {GET_PARENTS_FORMS} from '../../Constants'
import axios from 'axios'

export const getParents = () => async dispatch => {
    
    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}${GET_PARENTS_FORMS}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })    
        dispatch({
            type: GET_PARENTS,
            payload: res.data,
            
        })
    }
    catch(e){
        dispatch( {
            type: PARENTS_ERROR,
            payload: console.log(e),
        })
    }
}
