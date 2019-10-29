import React from 'react';
import { Button, Form, Input, Message, Segment } from "semantic-ui-react";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chatUrl: '',
      password: '',
      username: ''
    };
  }

  componentDidMount() {
  }

  submitLogin = (e) => {
    console.log('submitting login');
    const { chatUrl, password, username } = this.state;
    e.preventDefault();
    const formFields = {
      chatUrl: chatUrl,
      password: password,
      username: username
    }
    this.props.submitLogin(formFields)
  }

  render() {
    const { chatUrl, password, username} = this.state;
    var buttonProps = {
      color: 'blue',
      size: 'small',
      type: 'submit',
      disabled: !username || !password || !chatUrl
    };

    //console.log('loginform errors', loginErrors);
    return (
      <div>
        <Form>
          <Form.Field required onSubmit={this.submitLogin}>
            <label>Chat URL</label>
            <Input
              fluid
              placeholder="Enter chat url..."
              name="chatUrl"
              type="text"
              value={chatUrl}
              onChange={(e) => {
                this.setState({ chatUrl: e.target.value });
              }}
              />
          </Form.Field>
          <Form.Field required onChange = {(e) => {
            if (this.props.loginError !== 0) {
              this.props.clearLoginError();
            }
          }}>
            <label>Username</label>
            <Input
              fluid
              placeholder="Enter Username..."
              name="username"
              type="text"
              value={username}
              onChange={(e) => {
                this.setState({ username: e.target.value });
              }}
              />
          </Form.Field>
          <Form.Field required onChange = {(e) => {
            if (this.props.loginError !== 0) {
              this.props.clearLoginError();
            }
          }}>
            <label>Password</label>
            <Input
              fluid
              placeholder="Enter Password..."
              name="password"
              type="password"
              value={password}
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              />
              {this.props.loginError !== "" && <Message negative>{this.props.loginError}</Message>}
          </Form.Field>
          <Button {...buttonProps} onClick={this.submitLogin}>Login</Button>
        </Form>
      </div>
    );
  }
  
}

export default LoginForm;