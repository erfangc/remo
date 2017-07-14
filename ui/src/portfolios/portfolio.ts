/**
 * exports the portfolio store and related reducers + action creators
 *
 * Created by erfangchen on 7/10/17.
 */
import axios from "axios";
import {Action, createAction} from "redux-actions";
import {Portfolio} from "../common/models";
import {Dispatch} from "redux";
import {RootState} from "../reducers/index";
import {tradeActions} from "../trades/trade";
import {history} from "../index";

export interface PortfolioState {
  portfolios: Portfolio[]
  activePortfolio: number
}

type AddNewPortfolio = 'AddNewPortfolio';
const AddNewPortfolio: AddNewPortfolio = 'AddNewPortfolio';
interface AddNewPortfolioAction extends Action<Portfolio> {
  type: AddNewPortfolio
}

type SetPortfolios = 'SetPortfolios';
const SetPortfolios: SetPortfolios = 'SetPortfolios';
interface SetPortfoliosAction extends Action<Portfolio[]> {
  type: SetPortfolios
}

type UpdatePortfolio = 'UpdatePortfolio';
const UpdatePortfolio: UpdatePortfolio = 'UpdatePortfolio';
interface UpdatePortfolioAction extends Action<Portfolio> {
  type: UpdatePortfolio
}

type DeletePortfolio = 'DeletePortfolio';
const DeletePortfolio: DeletePortfolio = 'DeletePortfolio';
interface DeletePortfolioAction extends Action<string> {
  type: DeletePortfolio
}

type SelectPortfolio = 'SelectPortfolio';
const SelectPortfolio: SelectPortfolio = 'SelectPortfolio';
interface SelectPortfolioAction extends Action<number> {
  type: SelectPortfolio
}

const actions = {
  setPortfolios: createAction<Portfolio[]>(SetPortfolios)
};

export const portfolioActions = {
  ...actions,
  updatePortfolio: (portfolio: Portfolio) => (dispatch: Dispatch<any>) => {
    axios
      .post(`/api/portfolios`, portfolio)
      .then(resp => {
        dispatch({type: UpdatePortfolio, payload: resp.data});
        history.goBack();
      });
  },
  /**
   * creates a new portfolio
   */
  createNewPortfolio: (portfolio: Portfolio) => (dispatch: Dispatch<any>) => {
    axios
      .put(`/api/portfolios`, portfolio)
      .then(resp => {
        dispatch({type: AddNewPortfolio, payload: resp.data});
        history.goBack();
      })
  },
  deletePortfolio: (portfolioID: string) => (dispatch: Dispatch<any>, getState: () => RootState) => {
    axios.delete(`/api/portfolios/${portfolioID}`)
      .then(() => {
        dispatch({type: DeletePortfolio, payload: portfolioID});
        const state = getState();
        if (state.portfolios.portfolios.length === 0) {
          history.push('/portfolios/create')
        }
      });
  },
  selectPortfolio: (idx: number) => (dispatch: Dispatch<any>, getState: () => RootState) => {
    const {portfolios: {portfolios}} = getState();
    const portfolioID = portfolios[idx].portfolioID;
    axios
      .get(`/api/trades/${portfolioID}`)
      .then(resp => {
        dispatch(tradeActions.setTrades({portfolioID, trades: resp.data}));
        dispatch({type: SelectPortfolio, payload: idx});
      });
  }
};

type PortfolioAction =
  AddNewPortfolioAction
  | UpdatePortfolioAction
  | DeletePortfolioAction
  | SetPortfoliosAction
  | SelectPortfolioAction;

const initialState: PortfolioState = {
  portfolios: [],
  activePortfolio: null
};

/**
 * reducer that handles mutation to the portfolio store
 * @param state
 * @param action
 */
export function portfolioReducer(state: PortfolioState = initialState, action: PortfolioAction): PortfolioState {
  switch (action.type) {
    case SelectPortfolio:
      return {...state, activePortfolio: action.payload};
    case SetPortfolios:
      return {...state, portfolios: action.payload, activePortfolio: 0};
    case AddNewPortfolio:
      /*
       make the new portfolio the active one
       */
      return {
        ...state,
        portfolios: [...state.portfolios, action.payload],
        activePortfolio: state.portfolios.length
      };
    case UpdatePortfolio:
      return {
        ...state, portfolios: state.portfolios.map(p => {
          if (p.portfolioID === action.payload.portfolioID) {
            return action.payload;
          } else {
            return p;
          }
        })
      };
    case DeletePortfolio:
      return {
        ...state,
        activePortfolio: 0,
        portfolios: state.portfolios.filter(p => p.portfolioID !== action.payload)
      };
    default:
      return state;
  }
}
