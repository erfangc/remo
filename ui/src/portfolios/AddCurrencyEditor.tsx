import * as React from "react";
import {Button, Dropdown, Form} from "semantic-ui-react";

export interface AddCurrencyEditorProps {
  availableCurrencies: string[]
  onSubmit: (ccy: string, qty: number) => void
}

interface State {
  ccy: string
  qty: number
}

export class AddCurrencyEditor extends React.Component<AddCurrencyEditorProps, State> {

  constructor(props: AddCurrencyEditorProps, context: any) {
    super(props, context);
    this.state = {
      ccy: '', qty: 0
    };
  }

  render(): JSX.Element | any | any {
    const {props: {onSubmit, availableCurrencies}, state: {ccy, qty}} = this;
    return (
      <Form.Group>
        <Dropdown selection
                  options={availableCurrencies.map(ccy => ({text: ccy, value: ccy, key: ccy}))}
                  onChange={(_, data) => {
                    this.setState({ccy: data.value.toString()});
                  }}
        />
        <Form.Field>
          <input
            type="number"
            value={qty}
            onChange={({target: {value}}) => this.setState({qty: parseFloat(value)})}
          />
        </Form.Field>
        <Button icon="plus" primary onClick={() => onSubmit(ccy, qty)}/>
      </Form.Group>
    );
  }

}
