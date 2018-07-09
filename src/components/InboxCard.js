import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { disableTouchableOpacity } from '../actions';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles';
import rest from '../utils/rest';

const mapStateToProps = state => ({
  currentUserId: state.auth.data.decoded ? state.auth.data.decoded.id : null,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  openChatView: (chatroomId, id, username, avatar) =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ChatView',
        params: { chatroomId, id, username, avatar },
      }),
    ),
  updateReadMessages: (chatroomId, userId) => {
    dispatch(
      rest.actions.updateReadMessages(
        {},
        { body: JSON.stringify({ chatroomId, userId }) },
      ),
    );
  },
});

initialState = {
  disabled: false,
  isLoading: true,
  totalUnreadMessages: 0,
};

class InboxCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
    const newTotalNumberOfMessages = nextProps.data.messages.length;
    return (
      newTotalNumberOfMessages !== this.props.data.messages.length ||
      nextProps.data.messages[newTotalNumberOfMessages - 1].read !==
        this.props.data.messages[nextProps.data.messages.length - 1].read
    );
  }

  getUnreadMessages = () => {
    const { messages } = this.props.data;
    const totalUnreadMessages = messages.filter(
      message =>
        message.read === false && message.user_id !== this.props.currentUserId,
    );

    return totalUnreadMessages.length;
  };

  getMessageTime = lastMessageTime => {
    const currentDay = moment().format('dddd');
    const currentMonth = moment().format('MMM');
    const currentYear = moment().format('YYYY');

    if (currentYear === moment(lastMessageTime).format('YYYY')) {
      if (currentMonth === moment(lastMessageTime).format('MMM')) {
        if (currentDay === moment(lastMessageTime).format('dddd')) {
          return moment(lastMessageTime).format('HH:mm');
        }
        return moment(lastMessageTime).format('dddd');
      }
      return moment(lastMessageTime).format('dddd MMM');
    }
    return moment(lastMessageTime).format('dddd MMM YYYY');
  };

  getTime = () => {
    const { lastMessage } = this.props.data;
    const lastMessageTime = lastMessage.chat_time;
    return this.getMessageTime(lastMessageTime);
  };

  render() {
    // const { creator, receiver, messages, event } = this.props.data;
    const {
      unreadMessages,
      lastMessage,
      creatorId,
      creatorUsername,
      creatorAvatar,
      participantId,
      participantUsername,
      participantAvatar,
      chatroomId,
    } = this.props.data;

    if (this.props.data.event) {
      return (
        <View style={{ backgroundColor: 'red', height: 20, width: '100%' }} />
      );
    }

    const time = this.getTime();
    // const totalUnreadMessages = this.getUnreadMessages();

    const unreadMessagesText =
      unreadMessages > 0 ? `( ${unreadMessages} unread messages )` : '';

    const lastMessageText =
      lastMessage.text_message.length > 35
        ? lastMessage.text_message.slice(0, 35) + '...'
        : lastMessage.text_message;

    const userId =
      this.props.currentUserId === creatorId ? participantId : creatorId;

    const username =
      this.props.currentUserId === creatorId
        ? participantUsername
        : creatorUsername;

    const emoji =
      this.props.currentUserId === creatorId
        ? participantAvatar
        : creatorAvatar;

    return (
      <TouchableHighlight
        onPress={() => {
          disableTouchableOpacity(this);
          this.props.updateReadMessages(chatroomId, this.props.currentUserId);
          this.props.openChatView(chatroomId, userId, username, emoji);
        }}
        disabled={this.state.disabled}
        underlayColor={'#ddd'}
      >
        <View style={styles.inboxCard}>
          <View style={styles.inboxCardIcon}>
            <Image source={{ uri: emoji }} style={{ width: 50, height: 50 }} />
          </View>
          <View style={styles.inboxCardContent}>
            <View style={styles.inboxCardHeader}>
              <Text style={styles.inboxCardName}>{username}</Text>
              <Text style={styles.inboxCardTime}>{time}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {unreadMessages > 0 ? (
                <Icon
                  name={'md-mail'}
                  color={colors.ORANGE}
                  size={10}
                  style={{ marginRight: 5 }}
                />
              ) : null}
              <Text style={styles.inboxCardMessage}>{unreadMessagesText}</Text>
            </View>
            <Text style={styles.inboxCardMessage}>{lastMessageText}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = {
  inboxCard: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 24,
  },
  inboxCardHeader: {
    flexDirection: 'row',
  },
  inboxCardName: {
    fontSize: 18,
    color: '#4a4a4a',
  },
  inboxCardTime: {
    position: 'absolute',
    top: 0,
    right: 20,
    fontSize: 10,
    color: '#5c5c5c',
  },
  inboxCardMessage: {
    fontSize: 13,
    color: '#4a4a4a',
  },
  inboxCardIcon: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconHolder: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: '#e8e9e8',
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userEmoji: {
    fontSize: 20,
    padding: 8,
  },
  inboxCardContent: {
    flex: 6,
    justifyContent: 'center',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(InboxCard);
