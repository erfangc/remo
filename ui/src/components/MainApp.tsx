import * as React from "react";
import {portfolioActions} from "../reducers/portfolio";
import TradeTable from "./TradeTable";
import {connect} from "react-redux";
import {RootState} from "../reducers/index";
import {Grid} from "semantic-ui-react";
import {Portfolio} from "../common/models";
import PortfolioDetail from "./PortfolioDetail";
import PortfolioCreator from './PortfolioCreator';
import {Container, Header} from 'semantic-ui-react';

interface StateProps {
  portfolio: Portfolio
}

type Actions = typeof portfolioActions;

class MainApp extends React.Component<StateProps & Actions, any> {

  render(): JSX.Element | any | any {
    const {
      props: { portfolio}
    } = this;

    if (!portfolio) {
      return (
        <Container>
          <Header as="h2" content="Create a New Portfolio to Trade With"/>
          <PortfolioCreator />
        </Container>
      )
    }

    return (
      <Grid container celled>
        <Grid.Row>
          <Grid.Column width={6}>
            <PortfolioDetail portfolio={portfolio}/>
          </Grid.Column>
          <Grid.Column width={10}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <TradeTable />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

}

function mapStateToProps(state: RootState): StateProps {
  const {
    portfolios: {
      activePortfolio, portfolios
    },
    trades: {tradesByPortfolioID}
  } = state;

  const portfolio = portfolios[activePortfolio];

  return {
    portfolio,
  }
}

export default connect<StateProps, Actions, any>(mapStateToProps, portfolioActions)(MainApp)
