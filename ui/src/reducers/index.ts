import {combineReducers} from "redux";
import {loginReducer, LoginState} from "./login";
import {registrationReducer, RegistrationState} from "./registration";

export interface RootState {
  login: LoginState
  registration: RegistrationState
}

export default combineReducers<RootState>({
  login: loginReducer,
  registration: registrationReducer
});
