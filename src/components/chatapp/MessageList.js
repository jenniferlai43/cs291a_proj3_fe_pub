import React from 'react';

import { Grid, Segment } from 'semantic-ui-react';

// class MessageList extends React.Component {
//   // constructor(props) {
//   //   super(props);
//   // }

//   render() {
//   	const msgList = [];
//   	for (let i=0; i<50; i++) {
//   		let testStr = '';
//   		for (let j=0; j<50; j++) {
//   			testStr += 'testmsg ' + i;
//   		}
//   		msgList.push(<p style={{width: 'break-word'}}>{testStr}</p>);
//   	}
//     return (
//       <div>
//       {/*}
//         <Grid container padded style={{marginTop: '1rem'}}>
// 	      {msgList.map((m) => (
// 	        <Grid.Row key={m} style={{ padding: '2px', margin: '5px 0px' }} textAlign='justified'>
// 	        	<p>{m}</p>
// 	      	</Grid.Row>
// 		     ))}
// 	    </Grid>*/}
// 	    {msgList.map((m) => (
// 			<Segment>{m}</Segment>
// 	    ))}
//       </div>
//     );
//   }
// }

class MessageList extends React.Component {
	constructor(props) {
		super(props);
	}

	scrollToBottom = () => {
  		this.messagesEnd.scrollIntoView({ behavior: "smooth" });
	}

	componentDidMount() {
	  this.scrollToBottom();
	}

	componentDidUpdate() {
	  this.scrollToBottom();
	}

	render() {
		return (
	      <div>
		    {this.props.msgList.map((m, index) => (
				<Segment key={index}>{m}</Segment>
		    ))}
		    <div style={{ float:"left", clear: "both" }}
	             ref={(el) => { this.messagesEnd = el; }}>
	        </div>
	      </div>
	    );
	}	
}

// const MessageList = ({ msgList }) => {
// 	return (
//       <div>
// 	    {msgList.map((m, index) => (
// 			<Segment key={index}>{m}</Segment>
// 	    ))}
// 	    <div style={{ float:"left", clear: "both" }}
//              ref={(el) => { this.messagesEnd = el; }}>
//         </div>
//       </div>
//     );
// };

export default MessageList;
