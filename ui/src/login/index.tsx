import * as React from "react";
import axios from "axios";
import {Button, Checkbox, Container, Form, Header, Icon} from "semantic-ui-react";
import {connect} from "react-redux";
import {RootState} from "../reducers/index";
import {history} from "../index";
import {attemptInitialization} from "../reducers/initialization";
import {Action} from "redux-actions";
import {Dispatch} from "redux";

interface State {
  password: string
  username: string
  rememberMe: boolean
}

/**
 * A component that renders a login form using username + password
 */
class Login extends React.Component<LoginState & typeof loginActionCreators, State> {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      username: '',
      rememberMe: false
    }
  }

  render() {
    const {login, error, loggedIn} = this.props;
    const {password, username, rememberMe} = this.state;
    const iconColor = error ? 'red' : 'teal';
    const text = error ? 'There was an error logging you in' : loggedIn ? 'Logged In' : 'Log In';
    /*
     render the main form
     */
    const mainForm = loggedIn ? null : (
      <Form>
        <Form.Field>
          <label>Username</label>
          <input
            placeholder='Username'
            onChange={({target: {value}}) => this.setState({username: value})}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type='password'
            placeholder='Password'
            onChange={({target: {value}}) => this.setState({password: value})}
          />
        </Form.Field>
        <Checkbox
          label='Remember Me'
          checked={rememberMe}
          onChange={(_, data) => this.setState({rememberMe: data.checked})}
        />
        <br/><br/>
        <Button
          color='green'
          onClick={() => login(username, password, rememberMe)}
          type='submit'
        >
          Submit
        </Button>
        <Button primary onClick={() => history.push('/register')}>Sign Up</Button>
      </Form>);
    return (
      <Container>
        <br/>
        <Header as='h2' icon textAlign='center'>
          <Icon name='users' color={iconColor}/> {text}
        </Header>
        {mainForm}
      </Container>
    )
  }

}

export interface LoginState {
  loggedIn: boolean
  error: boolean
}

const LOG_IN_SUCCESSFUL = 'LOG_IN_SUCCESSFUL';
const LOG_IN_UNSUCCESSFUL = 'LOG_IN_UNSUCCESSFUL';
const LOG_OUT = 'LOG_OUT';
let initialState: LoginState = {
  loggedIn: false,
  error: false
};

export function loginReducer(state: LoginState = initialState, action: Action<void>): LoginState {
  switch (action.type) {
    case LOG_IN_SUCCESSFUL:
      return {loggedIn: true, error: false};
    case LOG_IN_UNSUCCESSFUL:
      return {loggedIn: false, error: true};
    case LOG_OUT:
      return {loggedIn: false, error: false};
    default:
      return state;
  }
}

export const loginActionCreators = {
  login: (username: string, password: string, rememberMe: boolean = false) => (dispatch: Dispatch<Action<any>>) => {
    return axios
      .post("/login", `username=${username}&password=${password}&remember-me=${rememberMe}`)
      .then(
        () => {
          dispatch({type: LOG_IN_SUCCESSFUL});
          /*
           we immediate initialize the App's main state by querying a pre-determined end point
           */
          attemptInitialization(dispatch)
        }
      )
      .catch(resp => dispatch({type: LOG_IN_UNSUCCESSFUL}))
  },
  logout: () => (dispatch: Dispatch<any>) => {
    axios
      .post('/logout')
      .then(() => {
        dispatch({type: LOG_OUT});
        history.push('/authenticate');
      });
  }
};

function mapStateToProps(state: RootState): LoginState {
  return state.login;
}

export default connect<LoginState, any, any>(mapStateToProps, loginActionCreators)(Login)
