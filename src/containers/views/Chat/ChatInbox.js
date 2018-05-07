import React from 'react';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

import rest from '../../../utils/rest';
import RoundTab from '../../../components/RoundTab';
import InboxCard from '../../../components/InboxCard';
import Report from '../Report/Report';

const mapStateToProps = state => ({
  currentUserId: state.auth.data.decoded ? state.auth.data.decoded.id : null,
  chatrooms: state.chatRoomsWithUserId.data.data,
  chatroomRefreshState: state.chatRoomsWithUserId,
});

const mapDispatchToProps = dispatch => ({
  chatRoomsWithUserId: id => {
    dispatch(rest.actions.chatRoomsWithUserId({ id }));
  },
});

export class ChatInbox extends React.Component {
  state = {
    searchKeyword: '',
    showReport: false,
  };

  componentDidMount() {
    this.timer = setInterval(
      async () =>
        await this.props.chatRoomsWithUserId(this.props.currentUserId),
      3000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  flatList = (title, data) => {
    return (
      <FlatList
        data={data}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        style={{ flex: 1, backgroundColor: 'white' }}
        ListHeaderComponent={this.renderHeader(title)}
        scrollEnabled={false}
      />
    );
  };

  renderHeader = title => {
    return (
      <Text
        style={{
          marginTop: 20,
          marginBottom: 20,
          justifyContent: 'center',
          height: 27,
          fontFamily: 'NunitoSans-Regular',
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          backgroundColor: 'transparent',
        }}
      >
        {title}
      </Text>
    );
  };

  keyExtractor = (item, index) => index;

  renderItem = ({ item }) => {
    return <InboxCard data={item} searchKeyword={this.state.searchKeyword} />;
  };

  updateSearchKeyword = searchKeyword => {
    this.setState({
      searchKeyword: searchKeyword.toLowerCase(),
    });
  };

  sortChatrooms = (a, b) => {
    const aLastMessageTime = a.messages[a.messages.length - 1].chat_time;
    const bLastMessageTime = b.messages[b.messages.length - 1].chat_time;
    return new Date(bLastMessageTime) - new Date(aLastMessageTime);
  };

  searchedChatrooms = chatrooms => {
    const searchResult = {
      chatrooms: [],
      messages: [],
    };
    searchResult.chatrooms = chatrooms.filter(
      chatroom =>
        chatroom.creator.id === this.props.currentUserId
          ? chatroom.receiver.username
              .toLowerCase()
              .indexOf(this.state.searchKeyword) !== -1
          : chatroom.creator.username
              .toLowerCase()
              .indexOf(this.state.searchKeyword) !== -1,
    );
    chatrooms.forEach(chatroom => {
      for (let i = 0; i < chatroom.messages.length; i++) {
        let chatroomResult = {
          id: chatroom.id,
          creator: chatroom.creator,
          receiver: chatroom.receiver,
          messages: [],
          messageIndex: 0,
        };

        let message = chatroom.messages[i];

        if (
          message.text_message
            .toLowerCase()
            .indexOf(this.state.searchKeyword) !== -1
        ) {
          chatroomResult.messages.push(message);
          chatroomResult.messageIndex = i;
          searchResult.messages.push(chatroomResult);
        }
      }
    });

    return searchResult;
  };

  render() {
    if (this.state.showReport) {
      return <Report />;
    }
    let chatrooms = this.props.chatrooms ? this.props.chatrooms : [];

    let displayInboxCard;

    if (this.state.searchKeyword !== '') {
      let searchResult = this.searchedChatrooms(chatrooms);
      let sortedChatrooms = searchResult.chatrooms.sort((a, b) =>
        this.sortChatrooms(a, b),
      );
      let sortedMessages = searchResult.messages.sort((a, b) =>
        this.sortChatrooms(a, b),
      );
      displayInboxCard = (
        <ScrollView>
          {searchResult.chatrooms.length > 0 ? (
            this.flatList('CHATS', sortedChatrooms)
          ) : (
            <View />
          )}
          {searchResult.messages.length > 0 ? (
            this.flatList('MESSAGES', sortedMessages)
          ) : (
            <View />
          )}
        </ScrollView>
      );
    } else {
      let sortedChatrooms = chatrooms.sort((a, b) => this.sortChatrooms(a, b));
      displayInboxCard = this.flatList('CHATS', sortedChatrooms);
    }

    return (
      <View style={{ flex: 1 }}>
        <SearchBar
          lightTheme
          containerStyle={{
            backgroundColor: '#e8e9e8',
            borderTopColor: '#e8e9e8',
            borderBottomColor: '#e8e9e8',
            marginTop: 25,
            marginHorizontal: 5,
          }}
          inputStyle={{ backgroundColor: '#fff' }}
          onChangeText={input => this.updateSearchKeyword(input)}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search in conversations"
          clearIcon
        />
        {displayInboxCard}
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInbox);
