import * as React from "react";
import {tradeActions} from "../reducers/trade";
import {connect} from "react-redux";
import {Button, Dropdown, Form} from "semantic-ui-react";
type Actions = typeof tradeActions;

interface State {
  securityID: string
  securityIDType: string
  tradeTime: number
  accruedInterest: number
  price: number
  currency: string
  commission: number
  quantity: number
  description: string
}

interface OwnProps {
  portfolioID: string
  hide: () => void
}

/**
 * component that places a new trade, wired to the loginActionCreators that place the new trade
 * but keep temp state for form fields
 */
class TradePlacer extends React.Component<Actions & OwnProps, State> {

  constructor(props: Actions & OwnProps) {
    super(props);
    this.state = {
      currency: "USD",
      description: "",
      quantity: 0,
      accruedInterest: 0,
      commission: 0,
      tradeTime: null,
      price: 0,
      securityID: "",
      securityIDType: ""
    }
  }

  render(): JSX.Element | any | any {
    const {
      props: {hide}
    } = this;
    return (
      <Form>

        <Form.Group widths="equal">
          <Form.Field required>
            <label>Security ID</label>
            <input
              type='text'
              onChange={ ({target: {value}}) => this.setState({securityID: value})}
            />
          </Form.Field>
          <Form.Field required>
            <label>Security ID Type</label>
            <Dropdown
              placeholder='Choose an type of ID'
              selection
              options={securityIDTypes}
              onChange={(_, {value}) => this.setState({securityIDType: value.toString()})}
            />
          </Form.Field>
          <Form.Field required>
            <label>Currency</label>
            <Dropdown
              selection
              options={currencies}
              onChange={(_, {value}) => this.setState({currency: value.toString()})}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field required>
            <label>Price</label>
            <input type="number" onChange={({target: {value}}) => this.setState({price: parseFloat(value)})}/>
          </Form.Field>
          <Form.Field required>
            <label>Quantity</label>
            <input type="number" onChange={({target: {value}}) => this.setState({quantity: parseFloat(value)})}/>
          </Form.Field>
          <Form.Field>
            <label>Commission</label>
            <input type="number" defaultValue={'0'}
                   onChange={({target: {value}}) => this.setState({commission: parseFloat(value)})}/>
          </Form.Field>
        </Form.Group>

        <Form.Field>
          <label>Description / Remarks</label>
          <input type="text" onChange={({target: {value}}) => this.setState({description: value})}/>
        </Form.Field>

        <Button primary
                content='Place Trade'
                onClick={() => this.placeTrade()}
        />
        <Button color='red' content='Cancel' onClick={() => hide()}/>
      </Form>
    );
  }

  placeTrade() {
    const {
      state: {securityID, securityIDType, currency, description, quantity, accruedInterest, commission, tradeTime, price},
      props: {portfolioID, placeTrade, hide}
    } = this;
    placeTrade(
      portfolioID,
      {
        portfolioID,
        tradeID: null,
        securityID,
        securityIDType,
        price,
        tradeTime,
        commission,
        accruedInterest,
        quantity,
        description,
        currency
      }
    );
    hide();
  }
}

const currencies = [
  {key: 'usd', text: 'USD', value: 'USD'},
  {key: 'gbp', text: 'GBP', value: 'GBP'},
  {key: 'eur', text: 'EUR', value: 'EUR'},
  {key: 'jpy', text: 'JPY', value: 'JPY'}
];

const securityIDTypes = [
  {key: 'ticker', text: 'Ticker', value: 'ticker'},
  {key: 'sedol', text: 'SEDOL', value: 'sedol'}
];

export default connect<any, Actions, OwnProps>(null, tradeActions)(TradePlacer);
