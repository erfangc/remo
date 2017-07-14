import {Dispatch} from "redux";
import {portfolioActions} from "./portfolio";
import {tradeActions} from "./trade";
import axios from "axios";
import {Portfolio, Trade, User} from "../common/models";
import {history} from "../index";
import {userActionCreators} from "../user/index";

export interface InitializationResponse {
  portfolios: Portfolio[]
  activePortfolio: number
  trades: Trade[]
  user: User
}

/**
 * exports methods used upon initialization of the application
 */
export function attemptInitialization(dispatch: Dispatch<any>) {
  axios
    .get('/api/init')
    .then(resp => {
      const {portfolios, trades, activePortfolio, user} = resp.data as InitializationResponse;
      dispatch(portfolioActions.setPortfolios(portfolios));
      dispatch(userActionCreators.receivedUser(user));
      /*
       server sets activePortfolio to null if there are no portfolios
       */
      if (activePortfolio != null) {
        const setTradesPayload = {
          trades,
          portfolioID: portfolios[activePortfolio].portfolioID
        };
        dispatch(tradeActions.setTrades(setTradesPayload));
        history.push('/');
      } else {
        /*
        TODO - figure out what to do if we cannot derive an active portfolio, most likely b/c there are no portfolios
         */
      }
    })
}
