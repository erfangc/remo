import * as React from "react";
import {Button, Container, Form, Header, Icon} from "semantic-ui-react";
import {connect} from "react-redux";
import {RootState} from "../reducers/index";
import {actions, LoginState} from "../reducers/login";

interface State {
    password: string
    username: string
}

/**
 * A component that renders a login form using username + password
 */
class Login extends React.Component<LoginState & typeof actions, State> {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            username: ''
        }
    }

    render() {
        const { login, error, loggedIn } = this.props;
        const { password, username } = this.state;
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
                        onChange={({ target: { value } }) => this.setState({ username: value })}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input
                        type='password'
                        placeholder='Password'
                        onChange={({ target: { value } }) => this.setState({ password: value })}
                    />
                </Form.Field>
                <Button onClick={() => login(username, password)} type='submit'>Submit</Button>
            </Form>);
        return (
            <Container>
                <br/>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='users' color={iconColor} /> {text}
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
