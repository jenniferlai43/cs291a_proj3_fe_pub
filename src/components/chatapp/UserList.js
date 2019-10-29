import React from 'react';

import { Header, Grid } from 'semantic-ui-react';

// class UserList extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//     	users: []
//     }
//   }

//   render() {
//   	/*const { users } = this.state;*/
//   	const users = [];
//     for (let i=0; i<50; i++) {
//       users.push(<p style={{width: 'break-word'}}>{'jennifer' + i}</p>);
//     }
//     return (
//       <div>
//   	      {users.map((u) => (
//   	        <Grid.Row key={u} style={{padding: '10px', overflow: 'hidden', textAlign: 'center'}}>
//   	        	<p style={{width: 'break-word'}}>{u}</p>
//   	      	</Grid.Row>
//   		     ))}
//       </div>
//     );
//   }
// }

const UserList = ({ userList }) => {
  return (
      <div>
          {userList.map((u) => (
            <Grid.Row key={u} style={{padding: '10px', overflow: 'hidden', textAlign: 'center'}}>
              <p style={{width: 'break-word'}}>{u}</p>
            </Grid.Row>
           ))}
      </div>
    );
};

export default UserList;
