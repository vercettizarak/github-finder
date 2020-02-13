import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
  //Set up the initial state
  const intialState = null;

  //Use the useReducer to put the state in the initial state
  const [state, dispatch] = useReducer(AlertReducer, intialState);

  //Set Alert
  const setAlert = (msg, type) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, type }
     })
    setTimeout(() => dispatch({type: REMOVE_ALERT}), 5000);
  };;

  //Retun the state
  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
