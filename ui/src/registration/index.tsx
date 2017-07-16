import {Action, createAction} from "redux-actions";
import {Dispatch} from "redux";
import axios from "axios";
import {fromPairs} from "lodash";
import * as React from "react";
import {Button, Container, Form, Header, Message} from "semantic-ui-react";
import {connect} from "react-redux";
import {RootState} from "../reducers/index";
import {loginActionCreators} from "../login/index";

interface RegistrationField {
  type: 'email' | 'text' | 'password'
  title: string
  value: string
  error: string
}

export interface RegistrationState {
  fields: { [key: string]: RegistrationField }
  registrationInProgress: boolean
}

/*
 Actions declaration
 */
type UPDATE_REGISTRATION_ACTION = 'UPDATE_REGISTRATION_ACTION';
const UPDATE_REGISTRATION_ACTION: UPDATE_REGISTRATION_ACTION = 'UPDATE_REGISTRATION_ACTION';
interface UpdateRegistrationAction extends Action<{ [key: string]: RegistrationField }> {
  type: UPDATE_REGISTRATION_ACTION
}

type SERVER_VALIDATION_ERROR = 'SERVER_VALIDATION_ERROR'
const SERVER_VALIDATION_ERROR: SERVER_VALIDATION_ERROR = 'SERVER_VALIDATION_ERROR';
interface ValidationErrorAction extends Action<{ [key: string]: RegistrationField }> {
  type: SERVER_VALIDATION_ERROR
}

type SUBMIT_REGISTRATION = 'SUBMIT_REGISTRATION';
const SUBMIT_REGISTRATION: SUBMIT_REGISTRATION = 'SUBMIT_REGISTRATION';
interface SubmitRegistrationAction extends Action<void> {
  type: SUBMIT_REGISTRATION
}

type RegistrationActions = UpdateRegistrationAction | SubmitRegistrationAction | ValidationErrorAction

/*
 thunk / portfolioActions creator definitions
 */
const actions = {
  /**
   * submits the registration form and tries to log the user in
   */
  submitRegistration: () => (dispatch: Dispatch<any>, getState: () => RootState) => {
    const {registration, registration: {fields}} = getState();
    axios
      .put('/registration', {
          ...fromPairs(Object.keys(fields).map(k => [k, fields[k].value])),
          grantedAuthorities: []
        }
      )
      .then(
        () => {
          /*
           automatically login after registration so we can access the app immediately
           */
          const username = fields['username'].value;
          const password = fields['password'].value;
          loginActionCreators.login(username, password)(dispatch)
        },
        ({response: {data, status}}) => {
          if (status === 400) {
            dispatch({type: SERVER_VALIDATION_ERROR, payload: data})
          } else if (status === 500) {
            alert('Something went wrong on the server')
          }
        })
      .catch(ignored => {
      });
  },
  updateRegistration: createAction<{ [key: string]: RegistrationField }>(UPDATE_REGISTRATION_ACTION)
};

const initialState: RegistrationState = {
  fields: {
    email: {type: 'email', title: 'Email', value: '', error: ''},
    username: {type: 'text', title: 'Username', value: '', error: ''},
    password: {type: 'password', title: 'Password', value: '', error: ''},
    confirmPassword: {type: 'password', title: 'Confirm Password', value: '', error: ''},
    lastName: {type: 'text', title: 'Last Name', value: '', error: ''},
    firstName: {type: 'text', title: 'First Name', value: '', error: ''},
    occupation: {type: 'text', title: 'Occupation', value: '', error: ''},
  },
  registrationInProgress: false
};

function isPasswordValid(password: RegistrationField, confirmPassword: RegistrationField) {
  return password.value && confirmPassword.value && password.value !== confirmPassword.value;
}

/**
 * validates the given tuple of registration field + value combinations, such as whether passwords match
 * @param payload
 * @return {{confirmPassword: any}}
 */
function validatePayload(payload: { [key: string]: RegistrationField }): { [key: string]: RegistrationField } {
  const {password, confirmPassword} = payload;

  let validatedConfirmPassword = confirmPassword;

  if (isPasswordValid(password, confirmPassword)) {
    validatedConfirmPassword = {...confirmPassword, error: 'Passwords do not match!'}
  } else {
    validatedConfirmPassword = {...confirmPassword, error: ''}
  }

  return {...payload, confirmPassword: validatedConfirmPassword};
}

export function registrationReducer(state: RegistrationState = initialState, action: RegistrationActions) {
  switch (action.type) {
    case UPDATE_REGISTRATION_ACTION:
      const {payload} = action;
      const validatedPayload = validatePayload(payload);
      return {...state, fields: validatedPayload};
    case SUBMIT_REGISTRATION:
      return {...state, registrationInProgress: true};
    case SERVER_VALIDATION_ERROR:
      const serverUpdatedFields = action.payload;
      /*
       merge the UI state and the server insisted state deeply
       */
      const withServerUpdate = fromPairs(Object
        .keys(state.fields)
        .map(fieldKey => [fieldKey, {...state.fields[fieldKey], ...serverUpdatedFields[fieldKey]}]));
      return {...state, fields: withServerUpdate};
    default:
      return state;
  }
}

interface RegistrationComponentProps {
  registrationState: RegistrationState
}

/**
 * The component that renders a registration form, and transmit updates to the form back to the state
 * also provide a button to submit the form
 */
class Registration extends React.Component<RegistrationComponentProps & typeof actions, any> {

  constructor(props) {
    super(props);
  }

  updateRegistration(k, v) {
    const {updateRegistration, registrationState: {fields}} = this.props;
    const withUpdate = {...fields, [k]: {...fields[k], value: v}};
    updateRegistration(withUpdate);
  }

  renderField(fieldKey, field: RegistrationField): JSX.Element {
    const {error, value, type, title} = field;
    return (
      <Form.Field key={fieldKey}>
        <label>{title}</label>
        <input
          defaultValue={value}
          type={type}
          onChange={ ({target: {value}}) => this.updateRegistration(fieldKey, value)}
        />
        <Message error visible={!!error} content={error}/>
      </Form.Field>
    );
  }

  render() {
    const {props: {registrationState: {fields}}} = this;
    const formFields = Object.keys(fields).map(fieldKey => this.renderField(fieldKey, fields[fieldKey]));
    return (
      <Container>
        <Header as="h1" content="Register for an Account"/>
        <Form>
          {formFields}
          <Button primary onClick={() => this.props.submitRegistration()}>Register</Button>
        </Form>
      </Container>
    )
  }

}

function mapStateToProps(state: RootState): RegistrationComponentProps {
  return {
    registrationState: state.registration
  };
}

export default connect<RegistrationComponentProps, any, any>(mapStateToProps, actions)(Registration)
