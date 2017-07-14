import * as React from 'react';
import {Portfolio} from "../common/models";
import {Container, Header} from 'semantic-ui-react';
import {PortfolioEditor} from '../portfolios/PortfolioEditor';

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
