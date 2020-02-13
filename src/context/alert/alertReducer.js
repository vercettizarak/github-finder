import { SET_ALERT, REMOVE_ALERT } from "../types";

export default (state, action) => {
  switch(action.type) {

    //Set Alert
    case SET_ALERT: 
      return action.payload 
    
    //case Remove Alert
    case REMOVE_ALERT:
      return null

    
    default:
      return state
  }
}