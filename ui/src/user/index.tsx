import * as React from "react";
import {User} from "../common/models";
import {Action, createAction} from "redux-actions";
import {Button, Container, Form} from "semantic-ui-react";
import {connect} from "react-redux";
import {RootState} from "../reducers/index";
import {Dispatch} from "redux";
import axios from "axios";
import {history} from "../index";

type ReceivedUser = 'ReceivedUser';
const ReceivedUser: ReceivedUser = 'ReceivedUser';
interface ReceivedUserAction extends Action<User> {
  type: ReceivedUser
}

type Actions = ReceivedUserAction;

const initialState: User = {
  username: '',
  occupation: '',
  lastName: '',
  firstName: '',
  email: ''
};

const receivedUser = createAction<User>(ReceivedUser);

/**
 * actions creators that affect the store
 */
export const userActionCreators = {
  updateUser: (user: User, callback?: () => void) => (dispatch: Dispatch<any>) => {
    axios
      .post('/api/user', user)
      .then(resp => {
        const data = resp.data as User;
        dispatch(receivedUser(data));
        if (!!callback) {
          callback();
        }
      });
  },
  receivedUser
};

/**
 * the main reducer for managing users and changing user details
 * @param state
 * @param action
 * @return {User}
 */
export function userReducer(state: User = initialState, action: Actions) {
  switch (action.type) {
    case ReceivedUser:
      return action.payload;
    default:
      return state;
  }
}

interface OwnProps {
  goBackOnUpdate: boolean
}

class UnboundEditUserComponent extends React.Component<User & typeof userActionCreators & OwnProps, User> {

  constructor(props: User & typeof userActionCreators & OwnProps, context: any) {
    super(props, context);
    this.state = props
  }

  componentWillReceiveProps(nextProps: Readonly<User & typeof userActionCreators & OwnProps>, nextContext: any): void {
    this.setState(nextProps);
  }

  render(): JSX.Element | any | any {
    const {state: {email, firstName, lastName, occupation}} = this;
    return (
      <Container>
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <label>First Name</label>
              <input type="text"
                     value={firstName}
                     onChange={({target: {value}}) => this.setState({firstName: value})}
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input type="text"
                     value={lastName}
                     onChange={({target: {value}}) => this.setState({lastName: value})}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Occupation</label>
            <input type="text"
                   value={occupation}
                   onChange={({target: {value}}) => this.setState({occupation: value})}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input type="text"
                   value={email}
                   onChange={({target: {value}}) => this.setState({email: value})}
            />
          </Form.Field>
          <Button
            primary
            content="Confirm"
            onClick={() => this.updateUser()}
          />
        </Form>
      </Container>
    );
  }

  updateUser() {
    const {props: {goBackOnUpdate, updateUser}} = this;
    updateUser(this.props, goBackOnUpdate ? () => history.goBack() : null);
  }

}

function mapStateToProps(state: RootState): User {
  return state.user;
}

export const EditUserComponent = connect<User, typeof userActionCreators, OwnProps>(mapStateToProps, userActionCreators)(UnboundEditUserComponent);
