import {Action} from "redux-actions";
import axios from "axios";
import {Dispatch} from "redux";
import {attemptInitialization} from "./initialization";

export interface LoginState {
  loggedIn: boolean
  error: boolean
}

const LOG_IN_SUCCESSFUL = 'LOG_IN_SUCCESSFUL';
const LOG_IN_UNSUCCESSFUL = 'LOG_IN_UNSUCCESSFUL';

let initialState: LoginState = {
  loggedIn: false,
  error: false
};

export function loginReducer(state: LoginState = initialState, action: Action<void>): LoginState {
  switch (action.type) {
    case LOG_IN_SUCCESSFUL:
      return {loggedIn: true, error: false};
    case LOG_IN_UNSUCCESSFUL:
      return {loggedIn: false, error: true};
    default:
      return state;
  }
}

export const actions = {
  login: (username: string, password: string, rememberMe: boolean = false) => (dispatch: Dispatch<Action<any>>) => {
    return axios
      .post("/login", `username=${username}&password=${password}&remember-me=${rememberMe}`)
      .then(
        () => {
          dispatch({type: LOG_IN_SUCCESSFUL});
          /*
           we immediate initialize the App's main state by querying a pre-determined end point
           */
          // TODO use generators or sagas or something like that to avoid callback hell
          attemptInitialization(dispatch)
        }
      )
      .catch(resp => dispatch({type: LOG_IN_UNSUCCESSFUL}))
  }
};
