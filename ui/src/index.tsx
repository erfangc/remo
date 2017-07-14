import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
import {configureStore} from "./store";
import Registration from "./registration";
import Login from "./login";
import MainApp from "./components/MainApp";
import axios from "axios";
import {attemptInitialization} from "./reducers/initialization";
import {EditUserComponent} from "./user/index";

const store = configureStore();
export const history = createBrowserHistory();

axios.interceptors.response.use(null, error => {
  if (error.response.status === 401) {
    console.error("not logged in, redirecting to login page");
    history.push('/authenticate');
  } else if (error.response.status === 400) {
    alert('There was an error with your input!')
  }
  return Promise.reject(error);
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/register" component={Registration}/>
        <Route path="/authenticate" component={Login}/>
        <Route path="/user/edit" render={() => <EditUserComponent goBackOnUpdate/>}/>
        <Route path="/" exact component={MainApp}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

attemptInitialization(store.dispatch);
