import {registrationReducer, RegistrationState} from "../registration/index";
import {portfolioReducer, PortfolioState} from "../portfolios/portfolio";
import {tradesReducer, TradesState} from "../trades/trade";
import {combineReducers} from "redux";
import {loginReducer, LoginState} from "../login/index";
import {User} from "../common/models";
import {userReducer} from "../user/index";

export interface RootState {
  login: LoginState
  user: User
  registration: RegistrationState
  portfolios: PortfolioState
  trades: TradesState
}

export default combineReducers<RootState>({
  login: loginReducer,
  registration: registrationReducer,
  portfolios: portfolioReducer,
  trades: tradesReducer,
  user: userReducer
});
