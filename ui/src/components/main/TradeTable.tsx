import {tradeActions} from "../../reducers/trade";
import {Trade} from "../../common/models";
import {connect} from 'react-redux';
import * as React from 'react';
import {Table, Button} from 'semantic-ui-react';

class TradeTable extends React.Component<TradeTableProps & TradeActions, any> {
  render() {
    const {props: {trades, deleteTrade, portfolioID}} = this;
    return (
      <Table celled selectable>
        <Table.Header>
          <Table.HeaderCell>Identifier</Table.HeaderCell>
          <Table.HeaderCell>Identifier Type</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell>Trade Price</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {trades.map(trade => {
            return (
              <Table.Row key={trade.tradeID}>
                <Table.Cell>{trade.securityID}</Table.Cell>
                <Table.Cell>{trade.securityIDType}</Table.Cell>
                <Table.Cell>{trade.quantity}</Table.Cell>
                <Table.Cell>{trade.price}</Table.Cell>
                <Table.Cell>
                  <Button color='red' icon="close" content='Delete'
                          onClick={() => deleteTrade(portfolioID, trade.tradeID)}/>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    )
  }
}

interface TradeTableProps {
  trades: Trade[]
  portfolioID: string
}

type TradeActions = typeof tradeActions;


export default connect<any, TradeActions, any>(null, tradeActions)(TradeTable);
