import * as React from "react";
import {portfolioActions} from "../reducers/portfolio";
import TradeTable from "./main/TradeTable";
import {connect} from "react-redux";
import {RootState} from "../reducers/index";
import {Button, Grid, Header} from "semantic-ui-react";
import TradePlacer from "../components/TradePlacer";
import {Portfolio, Trade} from "../common/models";
import {PortfolioDetail} from "./main/PortfolioDetail";

interface StateProps {
  portfolio: Portfolio,
  trades: Trade[]
}

interface State {
  showTradePlacer: boolean
}

type Actions = typeof portfolioActions;

class MainApp extends React.Component<StateProps & Actions, State> {

  constructor(props: StateProps & Actions) {
    super(props);
    this.state = {
      showTradePlacer: false
    }
  }

  render(): JSX.Element | any | any {
    const {
      props: {trades, portfolio}
    } = this;

    if (!portfolio) {
      return (
        <Header as="h1" content="No Portfolio Loaded"/>
      );
    }

    return (
      <Grid container celled>
        <Grid.Row>
          <Grid.Column width={3}>
            {/*<Dropdown text="Choose a Portfolio" options={portfolioOptions}/>*/}
          </Grid.Column>
          <Grid.Column width={2}>
            <Button icon="plus" color="green" content="New"/>
          </Grid.Column>
          <Grid.Column width={9}>
          </Grid.Column>
          <Grid.Column width={2}>
            <Button content="Logout" color="red"/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={5}>
            <PortfolioDetail portfolio={portfolio}/>
          </Grid.Column>
          <Grid.Column width={11}>
            {this.renderTradePlacer(portfolio)}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <TradeTable portfolioID={portfolio.portfolioID} trades={trades}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  renderTradePlacer(portfolio: Portfolio) {
    const {state: {showTradePlacer}} = this;
    return showTradePlacer ?
      <TradePlacer
        portfolioID={portfolio.portfolioID}
        hide={() => this.setState({showTradePlacer: false})}
      />
      :
      <Button
        icon="plus"
        content="Place a Trade"
        onClick={() => this.setState({showTradePlacer: true})}
      />;
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
  let trades = [];
  if (portfolio) {
    const portfolioID = portfolio.portfolioID;
    trades = tradesByPortfolioID[portfolioID] || [];
  }

  return {
    portfolio,
    trades
  }
}

export default connect<StateProps, Actions, any>(mapStateToProps, portfolioActions)(MainApp)
