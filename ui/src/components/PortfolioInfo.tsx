import {Button, Card, Table} from "semantic-ui-react";
import * as React from "react";
import PortfolioSelector from "./PortfolioSelector";
import {Portfolio} from "../common/models";
import {portfolioActions} from "../reducers/portfolio";
import {connect} from "react-redux";
import PortfolioCreator from "./PortfolioCreator";

type Actions = typeof portfolioActions;

interface OwnProps {
  portfolio: Portfolio
}

enum SubComponentToRender {
  PortfolioCreator, PortfolioSummary
}

interface State {
  subComponentToRender: SubComponentToRender
}

/**
 * renders a raised card representing a portfolio object's metadata and gives the ability to end those metadata
 */
class PortfolioInfo extends React.Component<OwnProps & Actions, State> {

  constructor(props: OwnProps & Actions, context: any) {
    super(props, context);
    this.state = {
      subComponentToRender: SubComponentToRender.PortfolioSummary
    }
  }

  renderSubComponent() {
    const {state: {subComponentToRender}, props: {portfolio}} = this;
    if (subComponentToRender === SubComponentToRender.PortfolioCreator) {
      return <PortfolioCreator />;
    } else {
      return <PortfolioSummary portfolio={portfolio}/>;
    }
  }

  renderToolbar() {
    const {
      state: {subComponentToRender},
      props: {deletePortfolio, portfolio: {portfolioID}}
    } = this;
    if (subComponentToRender === SubComponentToRender.PortfolioSummary) {
      return [
        <Button key='new'
                color="green"
                content="New"
                icon="plus"
                size="tiny"
                onClick={() => this.setState({subComponentToRender: SubComponentToRender.PortfolioCreator})}
        />,
        <Button key="edit"
                primary
                content="Edit"
                icon="edit"
                size="tiny"
        />,
        <Button key="delete"
                color="red"
                content="Delete"
                size="tiny"
                icon="trash"
                onClick={() => deletePortfolio(portfolioID)}
        />
      ];
    } else {
      return (
        <Button color="red"
                icon="close"
                size="tiny"
                content="Cancel"
                onClick={() => this.setState({subComponentToRender: SubComponentToRender.PortfolioSummary})}
        />
      );
    }
  }

  render() {
    return (
      <Card raised>
        <Card.Content>
          <PortfolioSelector />
        </Card.Content>
        <Card.Content>
          {this.renderToolbar()}
        </Card.Content>
        <Card.Content>
          {this.renderSubComponent()}
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
          cashBalances.map(cb => {
            return (
              <Table.Row key={cb.cashBalanceID.currency}>
                <Table.Cell>
                  <strong>{cb.cashBalanceID.currency}</strong>
                </Table.Cell>
                <Table.Cell>{Intl.NumberFormat().format(cb.quantity)}</Table.Cell>
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
