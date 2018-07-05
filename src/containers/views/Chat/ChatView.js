import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import ReversedFlatList from 'react-native-reversed-flat-list';
import styled from 'styled-components/native';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import rest from '../../../utils/rest';
import HeaderContainer from '../../HeaderContainer/HeaderContainer';
import { colors } from '../../../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { socket } from '../../../utils/socket';
import moment from 'moment/moment';

const mapDispatchToProps = dispatch => ({
  chatRoomsWithUserId: id => {
    dispatch(rest.actions.chatRoomsWithUserId({ id }));
  },
  openProfile: (personId, personName) =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'ProfileUser',
        params: { personId, personName },
      }),
    ),
  chatRoomMessages: id => {
    dispatch(rest.actions.chatRoomMessages({ id }));
  },
  //update all messages that have been read
  updateReadMessages: (chatroomId, userId) => {
    dispatch(
      rest.actions.updateReadMessages(
        {},
        { body: JSON.stringify({ chatroomId, userId }) },
      ),
    );
  },
  sendMessage: (id, textMessage, userId) => {
    dispatch(
      rest.actions.sendMessage(
        { id },
        {
          body: JSON.stringify({ textMessage, userId }),
        },
      ),
    );
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  currentUserId: state.auth.data.decoded ? state.auth.data.decoded.id : null,
  chatRoom: state.chatRoomMessages.data,
  sentMessage: state.sendMessage,
});

class ChatView extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: props => (
        <HeaderContainer
          left="white-back"
          color="light"
          backTo={
            navigation.state.params.previousRoute ? (
              { key: navigation.state.params.previousRoute }
            ) : null
          }
          titleComponent={
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() =>
                navigation.dispatch(
                  NavigationActions.navigate({
                    routeName: 'ProfileUser',
                    params: {
                      personId: navigation.state.params.id,
                      personName: navigation.state.params.username,
                    },
                  }),
                )}
            >
              <Image
                source={{ uri: navigation.state.params.avatar }}
                style={{ width: 35, height: 35, marginRight: 5 }}
              />
              <Text style={{ fontFamily: 'NunitoSans-Regular', fontSize: 15 }}>
                {navigation.state.params.username}
              </Text>
            </TouchableOpacity>
          }
          {...props}
        />
      ),
    };
  };

  constructor() {
    super();
    socket.on('message', message => {
      this.props.chatRoomMessages(
        this.props.navigation.state.params.chatroomId,
      );
    });
  }

  open = () => {
    this.props.openProfile(
      this.props.navigation.state.params.id,
      this.props.navigation.state.params.username,
    );
  };

  state = {
    chatroomId: '',
    text: '',
    description: '',
    isOptionsVisible: false,
  };

  componentDidMount = () => {
    this.setState({
      chatroomId: this.props.navigation.state.params.chatroomId
        ? this.props.navigation.state.params.chatroomId
        : this.props.navigation.state.params.existingChatRoomId,
    });
    this.props.navigation.setParams({
      showReport: this.showReport,
      currentUser: this.props.currentUserId,
      auth: this.props.auth.data.token,
    });
    this.props.chatRoomMessages(
      this.props.navigation.state.params.chatroomId
        ? this.props.navigation.state.params.chatroomId
        : this.props.navigation.state.params.existingChatRoomId,
    );
  };

  componentWillReceiveProps = () => {
    if (this.props.chatroom) {
      this.props.navigation.setParams({ chatroom: this.props.chatroom });
    }
  };

  async componentWillUnmount() {
    this.props.updateReadMessages(
      this.props.navigation.state.params.chatroomId,
      this.props.navigation.state.params.currentUser,
    );
    await this.props.chatRoomsWithUserId(
      this.props.navigation.state.params.currentUser,
    );
  }

  sendMessage = () => {
    const chatroomId = this.state.chatroomId;
    const textMessage = this.state.text;
    const userId = this.props.currentUserId;

    this.props.sendMessage(chatroomId, textMessage, userId);
    socket.emit('message', { chatroomId, textMessage, userId });
    this.setState({ text: '' });
  };

  getMessageTime = lastMessageTime => {
    const currentDay = moment().format('dddd');
    const currentMonth = moment().format('MMM');
    const currentYear = moment().format('YYYY');

    if (
      currentYear === moment(lastMessageTime).format('YYYY') &&
      currentMonth === moment(lastMessageTime).format('MMM') &&
      currentDay === moment(lastMessageTime).format('dddd')
    ) {
      return moment(lastMessageTime).format('HH:mm');
    }
    return moment(lastMessageTime).format('dddd - HH:mm');
  };

  keyExtractor = (item, index) => `msg-${index}`;

  renderItem = ({ item }) => {
    const textAlign =
      item.user_id === this.props.currentUserId ? 'right' : 'left';
    const messageCardStyle =
      item.user_id === this.props.currentUserId
        ? styles.SendCard
        : styles.ReceiveCard;
    const CardMargin =
      item.user_id === this.props.currentUserId
        ? { marginRight: 20 }
        : { marginLeft: 20 };

    let time = this.getMessageTime(item.chat_time);

    return (
      <View
        style={[
          styles.Card,
          CardMargin,
          { display: 'flex', flexDirection: 'row' },
        ]}
      >
        {item.user_id === this.props.currentUserId ? null : (
          <Image
            source={require('../../../../assets/chatBubble/chatBubbleOther.png')}
            style={{ tintColor: colors.MEDIUM_GREY }}
          />
        )}
        <View style={messageCardStyle}>
          <Text
            style={{
              textAlign,
              fontSize: 10,
              color: '#60686d',
              marginBottom: 10,
            }}
          >
            {time}
          </Text>
          <Text style={{ color: '#4a4a4a', textAlign }}>
            {item.text_message}
          </Text>
        </View>
        {item.user_id === this.props.currentUserId ? (
          <Image
            source={require('../../../../assets/chatBubble/chatBubbleMe.png')}
            style={{ tintColor: colors.ORANGE }}
          />
        ) : null}
      </View>
    );
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={Platform.select({
          ios: () => 20,
          android: () => 20,
        })()}
      >
        <ReversedFlatList
          data={this.props.chatRoom.messages || []}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          style={{ flex: 1, backgroundColor: 'white' }}
        />
        <TextInputCard>
          <TextInput
            style={{ flex: 5, paddingLeft: 20 }}
            returnKeyType="send"
            placeholder={'Message '}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            onSubmitEditing={() => this.sendMessage()}
            underlineColorAndroid={'transparent'}
          />

          <ChatInputButtonCard>
            <TouchableOpacity
              onPress={() => this.sendMessage()}
              disabled={!this.state.text.trim().length > 0}
            >
              <Icon
                name={'md-send'}
                color={
                  this.state.text.trim().length > 0 ? (
                    colors.ORANGE
                  ) : (
                    colors.DARK_GREY
                  )
                }
                size={26}
              />
            </TouchableOpacity>
          </ChatInputButtonCard>
        </TextInputCard>
      </KeyboardAvoidingView>
    );
  }
}

const ChatInputButtonCard = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TextInputCard = styled.View`
  height: 44px;
  background-color: #e8e9e8;
  flex-direction: row;
`;

const styles = {
  Card: {
    marginVertical: 10,
  },
  SendCard: {
    flex: 1,
    padding: 10,
    marginLeft: 60,
    backgroundColor: colors.ORANGE,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    alignSelf: 'flex-end',
  },
  ReceiveCard: {
    flex: 1,
    padding: 10,
    marginRight: 60,
    backgroundColor: colors.MEDIUM_GREY,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    alignSelf: 'flex-start',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatView);
