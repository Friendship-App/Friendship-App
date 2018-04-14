import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const mapStateToProps = state => ({
  chatrooms: state.chatRoomsWithUserId.data.data,
});

const mapDispatchToProps = dispatch => ({
  openChatView: (chatroomId, id, username, userEmoji) =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ChatView',
        params: { chatroomId, id, username, userEmoji },
      }),
    ),
});

class PersonCard extends Component {
  /*
  This function takes the id of the target person that current user wants to open the chat as an argument
  Then it checks all the chatrooms that current user has.
  If none of the chat includes the target person,
    the app prompts current user to the "Start a new chat" view.
  If there is already a chat that includes the target user,
    the app prompts current user to that chat room view.
  */
  openChat = (targetUserId, targetUsername, targetUserEmoji) => {
    const existedChatroom = this.props.chatrooms.filter(
      chatroom =>
        chatroom.creator.id === targetUserId ||
        chatroom.receiver.id === targetUserId,
    );
    if (existedChatroom.length === 0) {
    } else if (existedChatroom.length === 1) {
      this.props.openChatView(
        existedChatroom.id,
        targetUserId,
        targetUsername,
        targetUserEmoji,
      );
    } else {
      //This block of code is saved for future use when the app has group chat feature, as the target user may appear in more than 1 chat
    }
  };

  render() {
    const { id, username, emoji } = this.props.data;
    return (
      <TouchableHighlight onPress={() => this.openChat(id, username, emoji)}>
        <View style={styles.personCard}>
          <View style={styles.iconWrapper}>
            <View style={styles.iconHolder}>
              <Text>{emoji}</Text>
            </View>
          </View>
          <View style={styles.usernameWrapper}>
            <Text style={{ fontSize: 18 }}> {username}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  personCard: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 6,
    marginBottom: 6,
  },
  iconWrapper: {
    flex: 1,
  },
  iconHolder: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameWrapper: {
    flex: 6,
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonCard);
