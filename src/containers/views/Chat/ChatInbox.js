import React from 'react';
import Report from '../Report/Report';
import Background from '../../../components/Background';
import ChatList from '../../../components/ChatList';

export class ChatInbox extends React.Component {
  state = { showReport: false };

  render() {
    if (this.state.showReport) {
      return <Report />;
    }

    return (
      <Background color="grey">
        <ChatList />
      </Background>
    );
  }
}

export default ChatInbox;
