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

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({
  chatrooms: state.chatRoomsWithUserId.data.data,
});

class PersonCard extends Component {
  /*
  This function takes the id of the target person that current user wants to open the chat as an argument
  Then it checks all the chatrooms that current user has.
  */
  openChat = receiverId => {
    const existedChatroom = this.props.chatrooms.filter(
      chatroom =>
        chatroom.creator.id === receiverId ||
        chatroom.receiver.id === receiverId,
    );
  };

  render() {
    const data = this.props.data;
    return (
      <TouchableHighlight onPress={() => this.openChat(data.id)}>
        <View style={styles.personCard}>
          <View style={styles.iconWrapper}>
            <View style={styles.iconHolder}>
              <Text>{data.emoji}</Text>
            </View>
          </View>
          <View style={styles.usernameWrapper}>
            <Text style={{ fontSize: 18 }}> {data.username}</Text>
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
