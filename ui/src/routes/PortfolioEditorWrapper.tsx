import * as React from "react";
import {Portfolio} from "../common/models";
import {Container, Header} from "semantic-ui-react";
import {PortfolioEditor} from "../portfolios/PortfolioEditor";
import {connect} from "react-redux";
import {RootState} from "../reducers/index";

interface OwnProps {
  portfolioID: string
}

interface StateProps {
  portfolios: Portfolio[]
}

class UnboundPortfolioEditorWrapper extends React.Component<StateProps & OwnProps, any> {

  render(): JSX.Element | any | any {
    const {props: {portfolioID, portfolios}} = this;
    const portfolio = portfolios.find(portfolio => portfolio.portfolioID === portfolioID);
    return (
      <Container>
        <Header content="Edit A Portfolio"/>
        <PortfolioEditor portfolioToEdit={portfolio}/>
      </Container>
    );
  }

}

function mapStateToProps(state: RootState): StateProps {
  return {
    portfolios: state.portfolios.portfolios
  };
}

export const PortfolioEditorWrapper = connect<StateProps, any, OwnProps>(mapStateToProps, null)(UnboundPortfolioEditorWrapper);
