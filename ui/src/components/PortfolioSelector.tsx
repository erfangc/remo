import * as React from 'react';
import {portfolioActions} from '../reducers/portfolio';
import {Dropdown} from 'semantic-ui-react';
import {RootState} from "../reducers/index";
import {connect} from "react-redux";

interface StateProps {
  options: { text: string, value: any, key: number }[],
  currentSelection: { text: string, value: any, key: number}
}

type Actions = typeof portfolioActions;

class PortfolioSelector extends React.Component<StateProps & Actions, any> {

  render(): JSX.Element | any | any {
    const {props: {options, currentSelection, selectPortfolio}} = this;
    return (
      <Dropdown
        selection
        options={options}
        defaultValue={currentSelection.text}
        onChange={(event, data) => selectPortfolio(data.value as number)}
      />
    );
  }

}

function mapStateToProps(state: RootState): StateProps {
  const {portfolios:{portfolios, activePortfolio}} = state;
  return {
    options: portfolios.map((p, idx) => ({text: p.portfolioName, value: idx, key: idx})),
    currentSelection: {text: portfolios[activePortfolio].portfolioName, value: activePortfolio, key: activePortfolio}
  }
}

export default connect<StateProps, Actions, any>(mapStateToProps, portfolioActions)(PortfolioSelector);

