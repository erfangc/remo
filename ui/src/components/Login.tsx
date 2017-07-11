import * as React from "react";
import {Button, Checkbox, Container, Form, Header, Icon} from "semantic-ui-react";
import {connect} from "react-redux";
import {RootState} from "../reducers/index";
import {actions, LoginState} from "../reducers/login";
import {history} from "../index";

interface State {
  password: string
  username: string
  rememberMe: boolean
}

/**
 * A component that renders a login form using username + password
 */
class Login extends React.Component<LoginState & typeof actions, State> {

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
          onChange={(e, data) => this.setState({rememberMe: data.checked})}
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

function mapStateToProps(state: RootState): LoginState {
  return state.login;
}

export default connect<LoginState, any, any>(mapStateToProps, actions)(Login)
