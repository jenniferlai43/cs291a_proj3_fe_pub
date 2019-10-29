import React from 'react';

import ChatApp from '../chatapp';
import LoginContainer from '../loginform';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.eventSource = null;

    this.state = {
      chatUrl: '',
      connected: false,
      token: '',
      username: '',
      msgList: [],
      userList: [],
      loginError: "",
      lastEventId: "",
      lastEvent: ""
    };
  };

  dateFormat = (timestamp) => {
    var date = new Date(timestamp * 1000);
    return (
        date.toLocaleDateString("en-US") +
        " " +
        date.toLocaleTimeString("en-US")
    );
  };

  setupEventSource = (chatUrl, clearFields) => {
      const { token } = this.state;

      this.eventSource = new EventSource(chatUrl + '/stream/' + token);

      this.setState({ chatUrl: chatUrl, connected: true });

      this.handleDisconnect = () => {
        this.setState({ chatUrl: "", token: "", connected: false, username: "", msgList: [], userList: [], loginError:"" });
      };        

      this.eventSource.addEventListener('Disconnect', e => {
        console.log('Got Disconnect Event');
        this.handleDisconnect();
        this.eventSource.close();
      });

      this.eventSource.addEventListener('Join', e => {
        console.log('Got Join Event');
        const data = JSON.parse(e.data);
        console.log(data.user + " joined");
        const dateParsed = this.dateFormat(data.created);
        if (this.state.userList.indexOf(data.user) === - 1) {
          if (data.user !== this.state.username) {
            this.setState(prevState => ({
              userList: [...prevState.userList, data.user],
            }));
          }
        }
        this.setState(prevState => ({
          msgList: [...prevState.msgList, `${dateParsed} JOIN: ${data.user}`]
        }));
        console.log("new msg list: " + this.state.msgList);
      });

      this.eventSource.addEventListener('Message', e => {
        console.log('Got Message Event');
        const data = JSON.parse(e.data);
        console.log("created: ", data.created);
        const dateParsed = this.dateFormat(data.created);
        this.setState(prevState => ({
          msgList: [...prevState.msgList, `${dateParsed} (${data.user}) ${data.message}`],
          lastEventId: e.lastEventId,
          lastEvent: `${dateParsed} STATUS: ${data.status}`
        }));
        console.log("lastEventId: ", this.state.lastEventId);
        console.log("lastEvent: ", this.state.lastEvent);
        //console.log(this.state.msgList);
      });

      this.eventSource.addEventListener('Part', e => {
        console.log('Got Part Event');
        const data = JSON.parse(e.data);
        const dateParsed = this.dateFormat(data.created);
        this.setState(prevState => ({
          userList: prevState.userList.filter(user => user !== data.user)
        }));
        console.log("new list: " + this.state.userList);
        this.setState(prevState => ({
          msgList: [...prevState.msgList, `${dateParsed} PART: ${data.user}`]
        }));
      });

      this.eventSource.addEventListener('ServerStatus', e => {
        console.log('Got ServerStatus Event');
        const data = JSON.parse(e.data);
        const dateParsed = this.dateFormat(data.created);
        this.setState(prevState => ({
          msgList: [...prevState.msgList, `${dateParsed} STATUS: ${data.status}`],
          lastEventId: e.lastEventId,
          lastEvent: `${dateParsed} STATUS: ${data.status}`
        }));
        console.log("lastEventId: ", this.state.lastEventId);
        console.log("lastEvent: ", this.state.lastEvent);
        // console.log(e);
      });

      this.eventSource.addEventListener('Users', e => {
        console.log('Got Users Event');
        const data = JSON.parse(e.data);
        console.log(data);
        this.setState({ userList: data.users });
      });

      this.eventSource.addEventListener('error', e => {
        console.log('Got error Event');
        // console.log(e);
      });
    };

  clearLoginError = () => {
    this.setState({ loginError: "" });
  };
  
  convertToForm = (formFields) => {
    const formData = new FormData();

    for(const name in formFields) {
      formData.append(name, formFields[name]);
    }

    return formData;
  };

  handleLoginSubmit = (formFields) => {
    console.log('app handle login fields: ');
    console.log(formFields);
    const { chatUrl, lastEventId, password, username } = formFields;
    const data = {
      username: username,
      password: password
    };

    const formData  = this.convertToForm(data);
    fetch(chatUrl + '/login', {
      method: 'POST',
      body: formData,
    }).then(res => {
      if (res.status === 403) {
        this.setState({ loginError: "The username and password do not match." });
        console.log('login errors: ', this.state.loginErrors);
      }
      else if (res.status === 201) {
        res.json().then(data => {
          this.setState({token: data.token});
          this.setState({username: username});
          this.setupEventSource(chatUrl, this.clearFields);
        });
      }
      else if (res.status == 422) {
        /* Should not happen on client because cannot login if username or password field blank */
         console.log("Form can only have username and password field and neither can be empty.");
      }
    })
  };

  handleSend = (message) => {
    const { chatUrl } = this.state;
    const data = {
      message: message
    };

    const formData  = this.convertToForm(data);

    fetch(chatUrl + '/message', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.state.token,
      },
      body: formData,
    }).then(res => {
      if (res.status === 403) {
        /* Should not happen on client because uses token that was valid from /login */
        console.log("Signed token not valid.");
      }
      else if (res.status === 422) {
        /* Should not happen on client because cannot enter if message field blank */
        console.log("Form can only have message field and message cannot be empty.");
      }
    });
  };

  render() {
    const { connected, loginError, msgList, userList } = this.state;
    // console.log('parent connected: ' + connected);
    console.log('userList: ' + userList);
    return (
      <div>
        <ChatApp connected={connected} handleSend={this.handleSend} msgList={msgList} userList={userList}/>
        <LoginContainer 
          connected={connected}
          clearLoginError={this.clearLoginError}
          handleLoginSubmit={this.handleLoginSubmit}
          loginErrors={loginError}
        />
      </div>
    );
  }
  
}

export default App;
