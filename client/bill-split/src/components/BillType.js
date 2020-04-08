import {Collapse, Icon, Button} from "@blueprintjs/core";
import React, {Component} from "react";

class BillType extends Component {

  state = {
    isOpen: false
  };

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const billType = this.props.billType;
    const bills = billType.bills;

    let billsMarkup = bills.map(bill => 
      <li key={bill.billId}> 
        {`${bill.period.fromDate} - ${bill.period.toDate}`}
        
        <div className="overlay-edit-child">
          <Button icon="edit" ></Button>

          <Button icon="plus" ></Button>
        </div>

      </li>);

    return (

      <li key={billType.billTypeId} className="sidebar-item" >
        <div onClick={this.handleClick}> 
          <Icon icon={this.state.isOpen? "chevron-down" : "chevron-right"}> </Icon>
          {billType.title} 
        </div>

        <Collapse isOpen={this.state.isOpen}>
          <ul className="nav">
          {billsMarkup}
          </ul>
          
        </Collapse>

      </li>

    );
  }
}

export default BillType;