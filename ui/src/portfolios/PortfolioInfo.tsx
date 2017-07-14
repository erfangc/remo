import {Button, Card, Table} from "semantic-ui-react";
import * as React from "react";
import PortfolioSelector from "./PortfolioSelector";
import {Portfolio} from "../common/models";
import {portfolioActions} from "./portfolio";
import {connect} from "react-redux";
import {history} from "../index";

type Actions = typeof portfolioActions;

interface OwnProps {
  portfolio: Portfolio
}

const PortfolioToolbar = (props) => {
  const {deletePortfolio, portfolio: {portfolioID}} = props;
  return (
    <div>
      {
        [
          <Button key='new'
                  color="green"
                  content="New"
                  icon="plus"
                  size="tiny"
                  onClick={() => history.push('/portfolios/create')}
          />,
          <Button key="edit"
                  primary
                  content="Edit"
                  icon="edit"
                  size="tiny"
                  onClick={() => history.push(`/portfolios/edit/${portfolioID}`)}
          />,
          <Button key="delete"
                  color="red"
                  content="Delete"
                  size="tiny"
                  icon="trash"
                  onClick={() => deletePortfolio(portfolioID)}
          />
        ]
      }
    </div>
  )
};

/**
 * renders a raised card representing a portfolio object's metadata and gives the ability to end those metadata
 */
class PortfolioInfo extends React.Component<OwnProps & Actions, any> {

  constructor(props: OwnProps & Actions, context: any) {
    super(props, context);
  }

  render() {
    const {props: {portfolio}} = this;
    return (
      <Card>
        <Card.Content>
          <PortfolioSelector />
        </Card.Content>
        <Card.Content>
          <PortfolioToolbar {...this.props}/>
        </Card.Content>
        <Card.Content>
          <PortfolioSummary portfolio={portfolio}/>
        </Card.Content>
      </Card>
    );
  }

}

/**
 * stateless component that renders a small table to show portfolio detail attributes
 * @param cashBalances
 * @param currency
 */
const PortfolioSummary = ({portfolio: {cashBalances, currency}}) => {
  return (
    <Table celled>
      <Table.Body>
        {
          cashBalances.map(cashBalance => {
            return (
              <Table.Row key={cashBalance.cashBalanceID.currency}>
                <Table.Cell>
                  <strong>{cashBalance.cashBalanceID.currency}</strong>
                </Table.Cell>
                <Table.Cell>{Intl.NumberFormat().format(cashBalance.quantity)}</Table.Cell>
              </Table.Row>
            );
          })
        }
        <Table.Row>
          <Table.Cell>Portfolio Base Currency</Table.Cell>
          <Table.Cell>{currency}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default connect<any, Actions, OwnProps>(null, portfolioActions)(PortfolioInfo);
