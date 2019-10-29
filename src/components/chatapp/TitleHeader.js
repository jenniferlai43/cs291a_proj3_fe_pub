import React from 'react';

import { Header } from 'semantic-ui-react';

const TitleHeader = ({ hstyle, color, text }) => {
  return (
    <div>
      <Header style={{width: '100%'}} as={hstyle} inverted color={color} block textAlign='center'>
        {text}
      </Header>
    </div>
  );
};

export default TitleHeader;
