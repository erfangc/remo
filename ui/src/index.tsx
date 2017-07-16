import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
import {configureStore} from "./store";
import Registration from "./registration";
import Login from "./login";
import {App} from "./routes/App";
import axios from "axios";
import {get} from 'lodash';
import {attemptInitialization} from "./reducers/initialization";
import {EditUserComponent} from "./user/index";
import {PortfolioCreator} from "./routes/PortfolioCreator";
import {PortfolioEditorWrapper} from "./routes/PortfolioEditorWrapper";
import {ServerDown} from "./routes/ServerDown";

const store = configureStore();
export const history = createBrowserHistory();

axios.interceptors.response.use(null, error => {
  if (error.response.status === 401) {
    console.error("not logged in, redirecting to login page");
    history.push('/authenticate');
  } else if (error.response.status === 500) {
    const message = get(error, 'response.data.message)');
    alert(message);
  } else if (error.response.status === 504) {
    history.push('/server-down');
  }
  return Promise.reject(error);
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/register" component={Registration}/>
        <Route path="/authenticate" component={Login}/>
        <Route path="/server-down" component={ServerDown}/>
        <Route path="/user/edit" render={() => <EditUserComponent goBackOnUpdate/>}/>
        <Route path="/portfolios/create" render={() => <PortfolioCreator />}/>
        <Route
          path="/portfolios/edit/:portfolioID"
          render={({match: {params}}) => <PortfolioEditorWrapper portfolioID={params.portfolioID}/>}
        />
        <Route path="/" exact component={App}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

attemptInitialization(store.dispatch);
