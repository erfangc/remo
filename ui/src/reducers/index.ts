import {combineReducers} from "redux";
import {loginReducer, LoginState} from "./login";
import {registrationReducer, RegistrationState} from "./registration";
import {portfolioReducer, PortfolioState} from "./portfolio";

export interface RootState {
  login: LoginState
  registration: RegistrationState
  portfolios: PortfolioState
}

export default combineReducers<RootState>({
  login: loginReducer,
  registration: registrationReducer,
  portfolios: portfolioReducer
});
