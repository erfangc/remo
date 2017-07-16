import * as React from "react";
import {CashBalance, Portfolio} from "../common/models";
import {Button, Form, Message} from "semantic-ui-react";
import {portfolioActions} from "./portfolio";
import {connect} from "react-redux";
import {AddCurrencyEditor} from "./AddCurrencyEditor";
import {difference} from "lodash";
import {history} from "../index";

interface OwnProps {
  portfolioToEdit?: Portfolio
  onSuccessGoTo?: string
}

interface State {
  portfolio: Portfolio
  fieldErrors: { [key: string]: string }
}

type Actions = typeof portfolioActions

const initialState: State = {
  portfolio: {
    username: '',
    portfolioName: '',
    description: '',
    cashBalances: [
      {cashBalanceID: {currency: 'USD', portfolioID: ''}, quantity: 1000000}
    ],
    currency: 'USD',
    portfolioID: ''
  },
  fieldErrors: {}
};

interface CashBalanceFormProps {
  cashBalance: CashBalance
  updateCashBalance: (currency: string, value: any) => void
}

const CashBalanceForm = (props: CashBalanceFormProps) => {
  const {cashBalance: {cashBalanceID: {currency}, quantity}, updateCashBalance} = props;
  return (
    <Form.Field>
      <label>{currency} Balance</label>
      <input
        type="number"
        value={quantity}
        onChange={({target: {value}}) => updateCashBalance(currency, value)}
      />
    </Form.Field>
  );
};

const ValidationError = (props: { fieldErrors: any, field: string, onDismiss: () => void }) => {
  const {onDismiss, fieldErrors, field} = props;
  return (
    <Message
      error
      content={fieldErrors[field]}
      visible={!!fieldErrors[field]}
      onDismiss={() => onDismiss()}
    />
  );
};

/**
 * Form input for creating / editing a portfolio
 */
class UnboundPortfolioEditor extends React.Component<OwnProps & Actions, State> {

  constructor(props: OwnProps & Actions) {
    super(props);
    if (props.portfolioToEdit) {
      this.state = {
        portfolio: props.portfolioToEdit,
        fieldErrors: {}
      };
    } else {
      this.state = initialState;
    }
  }

  dismissValidationError(field: string) {
    const {state: {fieldErrors}} = this;
    this.setState({fieldErrors: {...fieldErrors, [field]: undefined}});
  }

  render(): JSX.Element | any | any {
    const {
      props: {
        portfolioToEdit
      },
      state: {
        portfolio: {description, portfolioName, cashBalances},
        fieldErrors
      }
    } = this;

    return (
      <Form>
        <Form.Field required>
          <label>Portfolio Name</label>
          <ValidationError field="portfolioName" fieldErrors={fieldErrors}
                           onDismiss={() => this.dismissValidationError('portfolioName')}
          />
          <input
            type="text"
            value={portfolioName}
            onChange={({target: {value}}) => this.updatePortfolioState({portfolioName: value})}
          />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={({target: {value}}) => this.updatePortfolioState({description: value})}
          />
        </Form.Field>
        {
          cashBalances.map(cashBalance =>
            <CashBalanceForm
              key={cashBalance.cashBalanceID.currency}
              updateCashBalance={this.updateCashBalance}
              cashBalance={cashBalance}
            />
          )
        }
        <AddCurrencyEditor
          onSubmit={(ccy, qty) => this.addCash(ccy, qty)}
          availableCurrencies={difference(['USD', 'GBP', 'EUR', 'JPY', 'CHF'], cashBalances.map(cb => cb.cashBalanceID.currency))}
        />
        <Button
          icon="plus"
          color="green"
          content={!!portfolioToEdit ? 'Confirm' : 'Create'}
          onClick={() => this.handleSubmit()}
        />
      </Form>
    );
  }

  /**
   * update the portfolio state, saving the caller from having to call setState() with nested Object.assign calls
   * @param update
   */
  updatePortfolioState<K extends keyof Portfolio>(update: Pick<Portfolio, K>) {
    const {state: {portfolio}} = this;
    this.setState({portfolio: Object.assign({}, portfolio, update)});
  }

  /**
   * handles adding a cash balance to the portfolio
   * @param ccy
   * @param qty
   */
  addCash(ccy: string, qty: number) {
    const {state: {portfolio: {cashBalances, portfolioID}}} = this;
    const newCashBalances: CashBalance[] = [...cashBalances, {
      quantity: qty,
      cashBalanceID: {
        currency: ccy,
        portfolioID: portfolioID
      }
    }];
    this.updatePortfolioState({
      cashBalances: newCashBalances
    });
  }

  /**
   * attempt to submit the form
   */
  handleSubmit() {
    const {props: {portfolioToEdit, onSuccessGoTo, createNewPortfolio, updatePortfolio}} = this;
    const {state: {portfolio}} = this;
    if (portfolioToEdit) {
      updatePortfolio(
        portfolio,
        () => history.push(!!onSuccessGoTo ? onSuccessGoTo : '/'),
        (fieldErrors) => this.setState({fieldErrors})
      );
    } else {
      createNewPortfolio(portfolio,
        () => history.push(!!onSuccessGoTo ? onSuccessGoTo : '/'),
        (fieldErrors) => this.setState({fieldErrors})
      );
    }
  }

  /**
   * update an existing cash balance
   * @param currency
   * @param value
   */
  updateCashBalance(currency: string, value: string) {
    const {state: {portfolio: {cashBalances}}} = this;
    const updatedCashBalances = cashBalances.map(cashBalance => {
      if (cashBalance.cashBalanceID.currency === currency) {
        return {...cashBalance, quantity: parseFloat(value)};
      } else {
        return cashBalance;
      }
    });
    this.updatePortfolioState({cashBalances: updatedCashBalances})
  }

}

export const PortfolioEditor = connect<any, Actions, OwnProps>(null, portfolioActions)(UnboundPortfolioEditor);
