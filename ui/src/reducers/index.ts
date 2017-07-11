import {combineReducers} from "redux";
import {loginReducer, LoginState} from "./login";
import {registrationReducer, RegistrationState} from "./registration";
import {portfolioReducer, PortfolioState} from "./portfolio";
import {tradesReducer, TradesState} from "./trade";

export interface RootState {
  login: LoginState
  registration: RegistrationState
  portfolios: PortfolioState
  trades: TradesState
}

export default combineReducers<RootState>({
  login: loginReducer,
  registration: registrationReducer,
  portfolios: portfolioReducer,
  trades: tradesReducer
});
