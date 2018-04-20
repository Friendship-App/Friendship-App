import React from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
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

  keyExtractor = (item, index) => index;

  renderItem = ({ item }) => {
    return <InboxCard data={item} />;
  };

  updateSearchKeyword = searchKeyword => {
    console.log(`Search for ${searchKeyword}`);
    this.setState({
      searchKeyword: searchKeyword,
    });
  };

  render() {
    if (this.state.showReport) {
      return <Report />;
    }
    let chatrooms = this.props.chatrooms ? this.props.chatrooms : [];
    let searchedChatrooms =
      this.state.searchKeyword !== '' ? chatrooms : chatrooms;
    let sortedChatrooms = searchedChatrooms.sort(function(a, b) {
      const aLastMessageTime = a.messages[a.messages.length - 1].chat_time;
      const bLastMessageTime = b.messages[b.messages.length - 1].chat_time;
      return new Date(bLastMessageTime) - new Date(aLastMessageTime);
    });
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
        <View>
          <RoundTab tint="#ffffff" title="CHATS" fontSize="12" />
          <FlatList
            data={sortedChatrooms}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            style={{ flex: 1, backgroundColor: 'white', minHeight: 300 }}
          />
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInbox);
