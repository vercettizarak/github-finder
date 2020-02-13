import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  /*************************
   * Search Users
   */
  const searchUsers = async text => {
    //Change the loading wilhe fetching the data
    setLoading();

    //Fetch data from github
    const res = await axios(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    //Dispatch data to the Reducer in order to change the users object and loading value in the Global state
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };

  /*************************
   * Get a single Github user
   */
  const getUser = async username => {
    //Change the loading wilhe fetching the data
    setLoading();

    //Fetch data from github
    const res = await axios(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    //Dispatch the user to the global state and changing loading to false
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };

  /*************************
   * Get Repos
   */
  const getUserRepos = async username => {
    //Change the loading wilhe fetching the data
    setLoading();

    //Fetch data from github
    const res = await axios(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    //Dispatch data to the state and changing loading to false
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  /*************************
   * Clear users
   */
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  //Set lodaing
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
