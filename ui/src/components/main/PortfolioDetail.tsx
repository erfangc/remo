import {Card, Table} from 'semantic-ui-react';
import * as React from 'react';

export const PortfolioDetail = ({portfolio}) => {
  return (
    <Card>
      <Card.Content header={portfolio.portfolioName}/>
      <Card.Content>
        <Table celled>
          <Table.Body>
            {
              portfolio.cashBalances.map(cb => {
                return (
                  <Table.Row>
                    <Table.Cell>
                      <strong>{cb.cashBalanceID.currency}</strong>
                    </Table.Cell>
                    <Table.Cell>{Intl.NumberFormat().format(cb.quantity)}</Table.Cell>
                  </Table.Row>
                );
              })
            }
          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  );
};
