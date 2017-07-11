import * as React from "react";
import {actions as portfolioActions, PortfolioState} from "../reducers/portfolio";
import {connect} from "react-redux";
import {RootState} from "../reducers/index";
import {Button, Card, Dropdown, Grid, Icon, Table} from "semantic-ui-react";

interface StateProps {
  portfolios: PortfolioState
}

type Actions = typeof portfolioActions;

const currencyIconMap = {
  'GBP': 'pound',
  'USD': 'dollar',
  'JPY': 'yen',
  'EUR': 'euro'
};

class MainApp extends React.Component<StateProps & Actions, any> {

  render(): JSX.Element | any | any {
    const {
      props: {portfolios: {portfolios, activePortfolio}}
    } = this;
    const portfolioOptions = portfolios.map((p, idx) => ({text: p.portfolioName, value: idx}));

    const portfolio = portfolios[activePortfolio];

    const portfolioDetail: JSX.Element = !portfolio ? null
      : (<Card>
          <Card.Content header={portfolio.portfolioName}/>
          <Card.Content>
            <Table celled>
              <Table.Body>
                {portfolio.cashBalances.map(cb => {
                  return (
                    <Table.Row>
                      <Table.Cell>
                        {
                          !currencyIconMap[cb.cashBalanceID.currency]
                            ? <strong>{cb.cashBalanceID.currency}</strong>
                            : <Icon name={currencyIconMap[cb.cashBalanceID.currency]}/>
                        }
                      </Table.Cell>
                      <Table.Cell>{Intl.NumberFormat().format(cb.quantity)}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </Card.Content>
        </Card>
      );

    return (
      <Grid container celled>
        <Grid.Row>
          <Grid.Column width={11}>
          </Grid.Column>
          <Grid.Column width={3}>
            <Dropdown text="Choose a Portfolio" options={portfolioOptions}/>
          </Grid.Column>
          <Grid.Column width={2}>
            <Button icon="plus" color="green" content="New"/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={5}>
            {portfolioDetail}
          </Grid.Column>
          <Grid.Column width={11}>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

}

function mapStateToProps(state: RootState): StateProps {
  const {portfolios} = state;
  return {
    portfolios
  }
}

export default connect<StateProps, Actions, any>(mapStateToProps, portfolioActions)(MainApp)
