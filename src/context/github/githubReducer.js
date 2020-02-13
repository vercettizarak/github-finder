import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';

export default (state, action) => {
  switch(action.type) {

    //Search Users
    case SEARCH_USERS:
      return {
        ...state,  
        users: action.payload,
        loading: false
      }
      
    //Clear User
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false
      }

    //Get the user
    case GET_USER: 
      return {
        ...state,
        user: action.payload,
        loading: false
      }

    //Get User Repos
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false
      }
    //Change loading to true
    case SET_LOADING:
      return  {
        ...state,
        loading: true
      }
        
    default: 
      return state
  }
}