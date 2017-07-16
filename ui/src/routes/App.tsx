import * as React from "react";
import {portfolioActions} from "../portfolios/portfolio";
import {TradeTable} from "../trades/TradeTable";
import {connect} from "react-redux";
import {RootState} from "../reducers/index";
import {Button, Grid} from "semantic-ui-react";
import {Portfolio} from "../common/models";
import PortfolioInfo from "../portfolios/PortfolioInfo";
import {history} from "../index";
import {loginActionCreators} from "../login/index";

interface StateProps {
  portfolio: Portfolio
}

type Actions = typeof portfolioActions & typeof loginActionCreators;

class UnboundApp extends React.Component<StateProps & Actions, any> {

  render(): JSX.Element | any | any {
    const {
      props: {portfolio, logout}
    } = this;

    if (!portfolio) {
      return null;
    }

    return (
      <Grid container>
        <Grid.Row>
          <Grid.Column width={5}>
            <Button icon="user" basic content="Your Account" onClick={() => history.push('/user/edit')}/>
            <Button basic color="red" content="Log Out" onClick={() => logout()}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            <PortfolioInfo portfolio={portfolio}/>
          </Grid.Column>
          <Grid.Column width={10}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
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
    }
  } = state;

  const portfolio = portfolios[activePortfolio];

  return {
    portfolio,
  }
}

export const App = connect<StateProps, Actions, any>(mapStateToProps, {...portfolioActions, ...loginActionCreators})(UnboundApp);
