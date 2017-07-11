import {Action} from "redux-actions";
import axios from "axios";
import {Dispatch} from "redux";
import {actions as portfoliosActions} from "./portfolio";
import {history} from "../index";

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
  login: (username: string, password: string) => (dispatch: Dispatch<Action<any>>) => {
    return axios
      .post("/login", `username=${username}&password=${password}`)
      .then(
        () => {
          dispatch({type: LOG_IN_SUCCESSFUL});
          /*
           we immediate initialize the App's main state by querying a pre-determined end point
           */
          // TODO use generators or sagas or something like that to avoid callback hello
          axios
            .get('/api/portfolios')
            .then(({data}) => {
              dispatch(portfoliosActions.setPortfolios(data));
              history.push('/');
            });
        }
      )
      .catch(resp => dispatch({type: LOG_IN_UNSUCCESSFUL}))
  }
};
