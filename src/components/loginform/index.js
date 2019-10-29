import React from 'react';

import { Modal } from "semantic-ui-react";
import LoginForm from './LoginForm';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formFields: {}
    };

    this.submitLogin = (formFields) => {
      console.log('LoginForm fields: ');
      console.log(formFields);
      this.props.handleLoginSubmit(formFields)
    }
  }

  componentDidMount() {
    
  }

  render() {
    var modalProps = {
      centered: true,
      open: !this.props.connected,
      size: "small"
    }
    return (
      <div>
        <Modal {...modalProps} style={{marginTop: '-20vh'}}>
          <Modal.Content>
            <LoginForm clearLoginError={this.props.clearLoginError} loginError={this.props.loginErrors} submitLogin={this.submitLogin}/> 
          </Modal.Content>
        </Modal>
      </div>
    );
  }
  
}

export default LoginContainer;
