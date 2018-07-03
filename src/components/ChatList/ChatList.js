import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RoundTab from '../RoundTab';
import { FlatList, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import rest from '../../utils/rest';
import { connect } from 'react-redux';
import InboxCard from '../InboxCard';
import styles from './styles';
import EmptyChatMessage from '../EmptyChatMessage';

const mapStateToProps = state => ({
  currentUserId: state.auth.data.decoded ? state.auth.data.decoded.id : null,
  chatrooms: state.chatRoomsWithUserId.data,
  chatroomRefreshState: state.chatRoomsWithUserId,
});

const mapDispatchToProps = dispatch => ({
  chatRoomsWithUserId: id => {
    dispatch(rest.actions.chatRoomsWithUserId({ id }));
  },
  goToPeopleView: () =>
    dispatch(NavigationActions.navigate({ routeName: 'People' })),
});

class ChatList extends Component {
  /*componentDidMount() {
    this.timer = setInterval(
      async () =>
        await this.props.chatRoomsWithUserId(this.props.currentUserId),
      3000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }*/

  componentWillMount() {
    this.props.chatRoomsWithUserId(this.props.currentUserId);
  }

  keyExtractor = (item, index) => 'list-item-' + index;

  renderItem = ({ item }) => {
    return <InboxCard data={item} />;
  };

  render() {
    const sortedChatrooms = this.props.chatrooms
      ? this.props.chatrooms.sort(function(a, b) {
          const aLastMessageTime = a.messages[a.messages.length - 1].chat_time;
          const bLastMessageTime = b.messages[b.messages.length - 1].chat_time;
          return new Date(bLastMessageTime) - new Date(aLastMessageTime);
        })
      : [];

    return (
      <View style={[styles.chatList]}>
        <RoundTab tint="#ffffff" title="CHATS" fontSize="12" />
        {sortedChatrooms.length > 0 ? (
          <FlatList
            data={sortedChatrooms}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            style={[styles.chats]}
          />
        ) : (
          <EmptyChatMessage goToPeopleView={this.props.goToPeopleView} />
        )}
      </View>
    );
  }
}

ChatList.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
