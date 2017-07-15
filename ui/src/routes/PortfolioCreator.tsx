import * as React from "react";
import {Container, Header} from "semantic-ui-react";
import {PortfolioEditor} from "../portfolios/PortfolioEditor";

/**
 * thin wrapper to show portfolio editor with no prior bindings, thus making it an portfolio creator
 */
export class PortfolioCreator extends React.Component<any, any> {

  render(): JSX.Element | any | any {
    return (
      <Container>
        <Header content="Create A Portfolio"/>
        <PortfolioEditor />
      </Container>
    );
  }

}
