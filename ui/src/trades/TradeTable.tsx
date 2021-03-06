import {tradeActions} from "./trade";
import {Trade} from "../common/models";
import {connect} from "react-redux";
import * as React from "react";
import {Button, Table} from "semantic-ui-react";
import TradePlacer from "./TradePlacer";
import {RootState} from "../reducers/index";
import * as moment from "moment";

interface StateProps {
  trades: Trade[]
  portfolioID: string
}

type TradeActions = typeof tradeActions;

interface State {
  showTradePlacer: boolean
}

/**
 * renders trades sent by the server as a table and offers the ability to alter these trades where necessary
 */
class UnboundTradeTable extends React.Component<StateProps & TradeActions, State> {

  constructor(props: StateProps & TradeActions) {
    super(props);
    this.state = {
      showTradePlacer: false
    }
  }

  render() {
    const {state: {showTradePlacer}, props: {portfolioID, trades}} = this;
    if (showTradePlacer) {
      return (
        <TradePlacer
          portfolioID={portfolioID}
          hide={() => this.setState({showTradePlacer: false})}
        />
      );
    } else {
      return (
        <div>
          <Button
            color="green"
            icon="plus"
            content="Place a Trade"
            onClick={() => this.setState({showTradePlacer: true})}
          />
          <ExistingTrades trades={trades}/>
        </div>
      );
    }
  }
}

/**
 * table rendering existing trades that have been retrieved from the server
 * @param props
 * @return {any}
 * @constructor
 */
const ExistingTrades = (props: { trades: Trade[] }) => {
  const {trades} = props;
  return (
    <Table celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Identifier</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell>Trade Price</Table.HeaderCell>
          <Table.HeaderCell>Cost Basis</Table.HeaderCell>
          <Table.HeaderCell>Commission</Table.HeaderCell>
          <Table.HeaderCell>Currency</Table.HeaderCell>
          <Table.HeaderCell>Description / Remarks</Table.HeaderCell>
          <Table.HeaderCell>Trade Time</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {
          trades.map(
            trade => {
              return (
                <Table.Row key={trade.tradeID}>
                  <Table.Cell>{trade.securityID}</Table.Cell>
                  <Table.Cell>{trade.quantity}</Table.Cell>
                  <Table.Cell>{trade.price}</Table.Cell>
                  <Table.Cell>{Intl.NumberFormat().format(trade.price * trade.quantity)}</Table.Cell>
                  <Table.Cell>{Intl.NumberFormat().format(trade.commission)}</Table.Cell>
                  <Table.Cell>{trade.currency}</Table.Cell>
                  <Table.Cell>{trade.description}</Table.Cell>
                  <Table.Cell>{moment(trade.tradeTime).format('YYYY-MM-DD @ hh:mm:ssA')}</Table.Cell>
                  <Table.Cell>
                    <Button primary icon="edit"/>
                  </Table.Cell>
                </Table.Row>
              );
            })
        }
      </Table.Body>
    </Table>
  );
};

function mapStateToProps(state: RootState): StateProps {
  const {
    portfolios: {
      activePortfolio, portfolios
    },
    trades: {tradesByPortfolioID}
  } = state;

  const portfolio = portfolios[activePortfolio];
  let trades = [];
  if (portfolio) {
    const portfolioID = portfolio.portfolioID;
    trades = tradesByPortfolioID[portfolioID] || [];
  }

  return {
    portfolioID: portfolio.portfolioID,
    trades
  }
}

export const TradeTable = connect<StateProps, TradeActions, any>(mapStateToProps, tradeActions)(UnboundTradeTable);
