import * as React from "react";
import {Portfolio} from "../common/models";
import {Button, Form} from "semantic-ui-react";
import {portfolioActions} from "../reducers/portfolio";
import {connect} from "react-redux";

type Actions = typeof portfolioActions

/**
 * form inputs for creating a portfolio, including the portfolio's name
 */
class PortfolioCreator extends React.Component<Actions, Portfolio> {

  constructor(props: any) {
    super(props);
    this.state = {
      currency: 'USD',
      description: '',
      portfolioName: '',
      username: null,
      portfolioID: null,
      cashBalances: [
        {
          quantity: 1000000,
          cashBalanceID: {
            currency: 'USD',
            portfolioID: null
          }
        }
      ]
    }
  }

  render(): JSX.Element | any | any {
    const {state: {cashBalances}} = this;
    return (
      <Form>
        <Form.Field required>
          <label>Portfolio Name</label>
          <input type="text" onChange={({target: {value}}) => this.setState({portfolioName: value})}/>
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input type="text" onChange={({target: {value}}) => this.setState({description: value})}/>
        </Form.Field>
        {
          cashBalances.map(({cashBalanceID: {currency}, quantity}) => (
            <Form.Field>
              <label>Initial {currency} Balance</label>
              <input type="number"
                     defaultValue={quantity + ''}
                     onChange={({target: {value}}) => this.updateCashBalance(currency, value)}
              />
            </Form.Field>
          ))
        }
        <Button icon="plus" primary content="Create Portfolio" onClick={() => this.createPortfolio()}/>
      </Form>
    );
  }

  createPortfolio() {
    this.props.createNewPortfolio(this.state);
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

export default connect<any, Actions, any>(null, portfolioActions)(PortfolioCreator);
