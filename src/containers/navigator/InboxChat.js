import React from 'react';
import { StackNavigator } from 'react-navigation';
// ## View Imports ##
import ChatView from '../views/Chat/ChatView';
import InboxView from '../views/Chat/ChatInbox';
import HeaderContainer from '../HeaderContainer';
import ProfileUser from '../views/PeopleProfileView';
import UsersForTagView from '../views/UsersForTagView';

export default StackNavigator({
  InboxView: {
    screen: InboxView,
    navigationOptions: { header: () => null },
  },
  ChatView: {
    screen: ChatView,
    navigationOptions: {
      tabBarVisible: false,
    },
  },
  ProfileUser: {
    screen: ProfileUser,
    navigationOptions: {
      tabBarVisible: false,
      header: props => (
        <HeaderContainer left="white-back" color="transparent" {...props} />
      ),
    },
  },
  UsersForTag: {
    screen: UsersForTagView,
    navigationOptions: {
      tabBarVisible: false,
      header: props => (
        <HeaderContainer left="white-back" color="transparent" {...props} />
      ),
    },
  },
  // ## End StackNavigator Views ##
});
