/**
 * exports the portfolio store and related reducers + action creators
 *
 * Created by erfangchen on 7/10/17.
 */

import {Action, createAction} from "redux-actions";

export interface Portfolio {
  portfolioID: string
  portfolioName: string
  username: string
  currency: string
  description: string
  cashBalances: CashBalance[]
}

export interface CashBalance {
  cashBalanceID: CashBalanceID
  quantity: number
}

export interface CashBalanceID {
  portfolioID: string
  currency: string
}

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

export const actions = {
  addNewPortfolio: createAction<Portfolio>(AddNewPortfolio),
  setPortfolios: createAction<Portfolio[]>(SetPortfolios),
  updateNewPortfolio: createAction<Portfolio>(UpdatePortfolio),
  deletePortfolio: createAction<string>(DeletePortfolio)
};

type PortfolioAction = AddNewPortfolioAction | UpdatePortfolioAction | DeletePortfolioAction | SetPortfoliosAction;

const initialState: PortfolioState = {
  portfolios: [],
  activePortfolio: null
};

export function portfolioReducer(state: PortfolioState = initialState, action: PortfolioAction): PortfolioState {
  switch (action.type) {
    case SetPortfolios:
      return {...state, portfolios: action.payload, activePortfolio: 0};
    case AddNewPortfolio:
      return {...state, portfolios: [...state.portfolios, action.payload]};
    case UpdatePortfolio:
      return {...state, portfolios: [...state.portfolios, action.payload]};
    case DeletePortfolio:
      return {...state, portfolios: state.portfolios.filter(p => p.portfolioID !== action.payload)};
    default:
      return state;
  }
}
