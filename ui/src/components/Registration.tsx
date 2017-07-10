import * as React from "react";
import {Button, Container, Form, Header, Message} from "semantic-ui-react";
import {connect} from "react-redux";
import {RootState} from "../reducers/index";
import {actions, RegistrationField, RegistrationState} from "../reducers/registration";

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
