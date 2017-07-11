import {Dispatch} from "redux";
import {portfolioActions} from "./portfolio";
import {tradeActions} from "./trade";
import axios from "axios";
import {InitializationResponse} from "../common/models";
import {history} from "../index";

/**
 * exports methods used upon initialization of the application
 */
export function attemptInitialization(dispatch: Dispatch<any>) {
  axios.get('api/init').then(resp => {
    const {portfolios, trades} = resp.data as InitializationResponse;
    dispatch(portfolioActions.setPortfolios(portfolios));
    dispatch(tradeActions.setTrades({trades, portfolioID: portfolios[0].portfolioID}));
    history.push('/');
  })
}
