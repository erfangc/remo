import * as React from 'react';
import {Container, Header} from "semantic-ui-react";

export class ServerDown extends React.Component<any, any> {
  render(): JSX.Element | any | any {
    return (
      <Container>
        <Header content="The Server Cannot Be Reached At the Moment"/>
      </Container>
    );
  }
}
