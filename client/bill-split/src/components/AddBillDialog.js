import React, { Component } from "react";
import { Dialog, Button, FormGroup, InputGroup, Classes } from "@blueprintjs/core";
import { connect } from "react-redux";
import { toggleAddBillDialog } from "../redux/actions";

class AddBillDialog extends Component {
  constructor(props) {
    super(props);

    this.handleToggleDialog = this.handleToggleDialog.bind(this);
  }

  handleToggleDialog() {
    this.props.toggleAddBillDialog();
  }

  render() {
    return (
      <Dialog
        icon="series-add"
        onClose={this.handleToggleDialog}
        title={this.props.addBillDialog.title}
        isOpen={this.props.addBillDialog.isOpen}
        canOutsideClickClose="true"
        canEscapeKeyClose="true"
      >
        <div className={Classes.DIALOG_BODY}>
          <FormGroup
            helperText="Helper text with details..."
            label="Label A"
            labelFor="text-input"
            labelInfo="(required)"
          >
            <InputGroup id="text-input" placeholder="Placeholder text" />
          </FormGroup>
        </div>
        
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => ({
  addBillDialog: state.addBillDialog,
});

export default connect(mapStateToProps, { toggleAddBillDialog })(AddBillDialog);
