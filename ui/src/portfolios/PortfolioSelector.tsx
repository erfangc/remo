import * as React from "react";
import {portfolioActions} from "./portfolio";
import {Button, Dropdown, Popup, Icon} from "semantic-ui-react";
import {RootState} from "../reducers/index";
import {connect} from "react-redux";

interface StateProps {
  options: { text: string, value: any, key: number }[],
  currentSelection: { text: string, value: any, key: number }
}

type Actions = typeof portfolioActions;

/**
 * a component that renders all of the user's portfolios, selecting one would change the current workspace portfolio to the selected
 * portfolio in the App
 */
class PortfolioSelector extends React.Component<StateProps & Actions, any> {

  render(): JSX.Element | any | any {
    const {props: {options, currentSelection, selectPortfolio}} = this;
    return (
      <div>
        <Dropdown
          selection
          text={currentSelection.text}
        >
          <Dropdown.Menu>
            {
              options.map(option => (
                <Dropdown.Item key={option.text} text={option.text}
                               onClick={() => selectPortfolio(option.value)}
                />
              ))
            }
          </Dropdown.Menu>
        </Dropdown>
        &nbsp;
        <Popup
          trigger={<Button icon="info" size="tiny" basic/>}
          content='This should contain detailed portfolio information'
          on='hover'
        />
      </div>

    );
  }

}

function mapStateToProps(state: RootState): StateProps {
  const {portfolios: {portfolios, activePortfolio}} = state;
  return {
    options: portfolios.map((p, idx) => ({text: p.portfolioName, value: idx, key: idx})),
    currentSelection: {text: portfolios[activePortfolio].portfolioName, value: activePortfolio, key: activePortfolio}
  }
}

export default connect<StateProps, Actions, any>(mapStateToProps, portfolioActions)(PortfolioSelector);

