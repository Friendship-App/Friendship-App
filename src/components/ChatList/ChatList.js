import React, { Component } from 'react';
import RoundTab from '../RoundTab';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import rest from '../../utils/rest';
import { connect } from 'react-redux';
import InboxCard from '../InboxCard';
import styles from './styles';
import EmptyChatMessage from '../EmptyChatMessage';
import { FullscreenCentered } from '../Layout/Layout';

const mapStateToProps = state => ({
  currentUserId: state.auth.data.decoded ? state.auth.data.decoded.id : null,
  chatroomLoadingStage: {
    sync: state.chatRoomsWithUserId.sync,
    syncing: state.chatRoomsWithUserId.syncing,
    loading: state.chatRoomsWithUserId.loading,
  },
  chatrooms: state.chatRoomsWithUserId.data,
});

const mapDispatchToProps = dispatch => ({
  chatRoomsWithUserId: id => {
    dispatch(rest.actions.chatRoomsWithUserId({ id }));
  },
  goToPeopleView: () =>
    dispatch(NavigationActions.navigate({ routeName: 'People' })),
});

class ChatList extends Component {
  componentWillMount() {
    this.props.chatRoomsWithUserId(this.props.currentUserId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
    if (nextProps.chatrooms.length !== this.props.chatrooms.length) {
      return true;
    }

    for (let i = 0; i < nextProps.chatrooms.length; i++) {
      if (
        nextProps.chatrooms[i].messages.length !==
        this.props.chatrooms[i].messages.length
      ) {
        return true;
      }
    }

    return false;
  }

  keyExtractor = (item, index) => 'list-item-' + index;

  renderItem = ({ item }) => {
    return <InboxCard data={item} />;
  };

  render() {
    const { chatroomLoadingStage } = this.props;

    if (
      chatroomLoadingStage.syncing ||
      chatroomLoadingStage.loading ||
      !chatroomLoadingStage.sync
    ) {
      return (
        <FullscreenCentered>
          <ActivityIndicator size="large" />
        </FullscreenCentered>
      );
    }

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
