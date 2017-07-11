import {Portfolio, Trade} from "../common/models";
import {Action, createAction} from "redux-actions";
import {Dispatch} from "redux";
import axios from "axios";
import {portfolioActions} from "./portfolio";
/**
 * this is the store and reducer for all tradesByPortfolioID retrieved from the server
 * tradesByPortfolioID are stored by their corresponding portfolioID
 */

export interface TradesState {
  tradesByPortfolioID: { [key: string]: Trade[] }
}

type SetTrades = 'SetTrades';
const SetTrades: SetTrades = 'SetTrades';
interface SetTradesAction extends Action<{ portfolioID: string, trades: Trade[] }> {
  type: SetTrades
}

type PlacedTrade = 'PlacedTrade';
const PlacedTrade: PlacedTrade = 'PlacedTrade';
interface PlacedTradeAction extends Action<{ portfolioID: string, trade: Trade }> {
  type: PlacedTrade
}

type TradeAction = SetTradesAction | PlacedTradeAction;
const initialState: TradesState = {
  tradesByPortfolioID: {}
};

const actions = {
  setTrades: createAction<{ portfolioID: string, trades: Trade[] }>(SetTrades),
};

interface PlaceTradeResponse {
  placedTrade: Trade
  updatedPortfolio: Portfolio
}

export const tradeActions = {
  ...actions,
  placeTrade: (portfolioID: string, trade: Trade) => (dispatch: Dispatch<any>) => {
    axios
      .put(`api/trades/${portfolioID}`, trade)
      .then(resp => {
        const {placedTrade, updatedPortfolio} = resp.data as PlaceTradeResponse;
        const placeTradeAction: PlacedTradeAction = {
          type: PlacedTrade,
          payload: {
            trade: placedTrade,
            portfolioID: updatedPortfolio.portfolioID
          }
        };
        dispatch(portfolioActions.updatePortfolio(updatedPortfolio));
        dispatch(placeTradeAction);
      })
  },
  deleteTrade: (portfolioID: string, tradeID: string) => (dispatch: Dispatch<any>) => {
    axios
      .delete(`api/trades/${portfolioID}/${tradeID}`)
      .then(resp => {
        const trades = resp.data as Trade[];
        dispatch(actions.setTrades({portfolioID, trades}));
      })
  }
};

/**
 * the reducer that handles updates to the trade store
 * @param state
 * @param action
 */
export function tradesReducer(state: TradesState = initialState, action: TradeAction): TradesState {
  switch (action.type) {
    case SetTrades || PlacedTrade:
      const tradesByPortfolioID = tradesByPortfolioIDReducer(state.tradesByPortfolioID, action);
      return {...state, tradesByPortfolioID};
    default:
      return state;
  }
}

/**
 * the reducer that handles the sub-tree that deals with trades indexed on portfolioID
 * @param state
 * @param action
 * @return {any}
 */
function tradesByPortfolioIDReducer(state: { [key: string]: Trade[] }, action: TradeAction): { [key: string]: Trade[] } {
  switch (action.type) {
    case SetTrades:
      return {...state, [action.payload.portfolioID]: action.payload.trades};
    case PlacedTrade:
      const trades = state[action.payload.portfolioID];
      return {...state, [action.payload.portfolioID]: [...trades, action.payload.trade]};
    default:
      return state;
  }
}
