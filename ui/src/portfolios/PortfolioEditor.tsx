import * as React from "react";
import {CashBalance, Portfolio} from "../common/models";
import {Button, Form} from "semantic-ui-react";
import {portfolioActions} from "./portfolio";
import {connect} from "react-redux";
import {AddCurrencyEditor} from "./AddCurrencyEditor";
import {difference} from "lodash";

interface OwnProps {
  portfolioToEdit?: Portfolio
}

type Actions = typeof portfolioActions

const initialState: Portfolio = {
  username: '',
  portfolioName: '',
  description: '',
  cashBalances: [
    {cashBalanceID: {currency: 'USD', portfolioID: ''}, quantity: 1000000}
  ],
  currency: 'USD',
  portfolioID: ''
};

/**
 * form inputs for creating a portfolio, including the portfolio's name
 */
class UnboundPortfolioEditor extends React.Component<OwnProps & Actions, Portfolio> {

  constructor(props: OwnProps & Actions) {
    super(props);
    if (props.portfolioToEdit) {
      const {portfolioToEdit: {portfolioID, username, portfolioName, description, cashBalances, currency}} = props;
      this.state = {
        currency, cashBalances, description, portfolioName, username, portfolioID
      };
    } else {
      this.state = initialState;
    }
  }

  render(): JSX.Element | any | any {
    const {props: {portfolioToEdit}, state: {description, portfolioName, cashBalances}} = this;
    return (
      <Form>
        <Form.Field required>
          <label>Portfolio Name</label>
          <input
            type="text"
            value={portfolioName}
            onChange={({target: {value}}) => this.setState({portfolioName: value})}
          />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={({target: {value}}) => this.setState({description: value})}
          />
        </Form.Field>
        {
          cashBalances.map(({cashBalanceID: {currency}, quantity}) => (
            <Form.Field>
              <label>{currency} Balance</label>
              <input
                type="number"
                defaultValue={quantity + ''}
                onChange={({target: {value}}) => this.updateCashBalance(currency, value)}
              />
            </Form.Field>
          ))
        }
        <AddCurrencyEditor
          onSubmit={(ccy, qty) => this.addCash(ccy, qty)}
          availableCurrencies={difference(['USD', 'GBP', 'EUR', 'JPY', 'CHF'], cashBalances.map(cb => cb.cashBalanceID.currency))}
        />
        <Button icon="plus" primary content={!!portfolioToEdit ? 'Edit' : 'Create'}
                onClick={() => this.handleConfirm()}/>
      </Form>
    );
  }

  addCash(ccy: string, qty: number) {
    const {state: {cashBalances, portfolioID}} = this;
    const newCashBalances: CashBalance[] = [...cashBalances, {
      quantity: qty,
      cashBalanceID: {
        currency: ccy,
        portfolioID: portfolioID
      }
    }];
    this.setState({
      cashBalances: newCashBalances
    });
  }


  handleConfirm() {
    const {props: {portfolioToEdit, createNewPortfolio, updatePortfolio}} = this;
    if (portfolioToEdit) {
      updatePortfolio(this.state);
    } else {
      createNewPortfolio(this.state);
    }
  }

  updateCashBalance(currency: string, value: string) {
    const updatedCashBalances = this.state.cashBalances.map(cashBalance => {
      if (cashBalance.cashBalanceID.currency === currency) {
        return {...cashBalance, quantity: parseFloat(value)};
      } else {
        return cashBalance;
      }
    });
    this.setState({cashBalances: updatedCashBalances})
  }

}

export const PortfolioEditor = connect<any, Actions, OwnProps>(null, portfolioActions)(UnboundPortfolioEditor);
