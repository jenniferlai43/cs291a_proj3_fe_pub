import React from 'react';

import { Input } from 'semantic-ui-react';

class Compose extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	message: ""
    }
  }

  sendMessage = () => {
  	const { message } = this.state;
	this.props.handleSend(message);
  };

  clearMessage = () => {
  	this.setState({ message: "" });
  }

  handleKeyDown = (e) => {
	if (e.key === 'Enter' && this.state.message.length > 0) {
      	this.sendMessage();
		this.clearMessage();
    }
  };	


  render() {
  	const divStyle = {
  		margin: '0px 50px',
  		width: '100vw'
  	}
    return (
      <div style={divStyle}>
      	<Input fluid
      		value={this.state.message}
      		placeholder='Enter message...'
      		onChange={(e) => {
            	this.setState({ message: e.target.value });
          	}}
          	onKeyDown={this.handleKeyDown}
      	/>
      </div>
    );
  }
  
}

export default Compose;
