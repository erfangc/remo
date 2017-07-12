import {Dispatch} from "redux";
import {portfolioActions} from "./portfolio";
import {tradeActions} from "./trade";
import axios from "axios";
import {Portfolio, Trade} from "../common/models";
import {history} from "../index";

export interface InitializationResponse {
  portfolios: Portfolio[]
  activePortfolio: number
  trades: Trade[]
}

/**
 * exports methods used upon initialization of the application
 */
export function attemptInitialization(dispatch: Dispatch<any>) {
  axios
    .get('api/init')
    .then(resp => {
      const {portfolios, trades, activePortfolio} = resp.data as InitializationResponse;
      dispatch(portfolioActions.setPortfolios(portfolios));
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

         */
      }
    })
}
