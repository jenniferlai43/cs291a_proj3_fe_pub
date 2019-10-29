import React from 'react';

import { Grid, Image } from 'semantic-ui-react';

import Compose from './Compose';
import TitleHeader from './TitleHeader';
import MessageList from './MessageList';
import UserList from './UserList';

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const chatStyle = {
      border: '1px solid black',
      height: '80vh',
      overflowY: 'scroll'
    }
    const msgListStyle = {
      padding: '10px',
      width: '80vw'
    }
    const userListStyle = {
      paddingRight: '0'
    }

    return (
      <div>
        <TitleHeader hstyle='h2' color='violet' text='CS291 Chat App'/>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={2} style={{...chatStyle,...userListStyle}}>
              <TitleHeader hstyle='h5' color='violet' text='Online Users'/>
              <UserList userList={ this.props.userList } />
            </Grid.Column>
            <Grid.Column width={14} style={{...chatStyle,...msgListStyle}}>
              <MessageList msgList={ this.props.msgList }  />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row width={16}>
            <Compose handleSend={this.props.handleSend} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
  
}

export default ChatApp;
