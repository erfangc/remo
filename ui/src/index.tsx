import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {configureStore} from './store';
import Registration from './components/Registration';
import Login from './components/Login';

const store = configureStore();
export const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/register" component={Registration}/>
        <Route path="/logmein" component={Login} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
