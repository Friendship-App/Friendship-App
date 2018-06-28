import React from 'react';
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import Header from './Header';
// ## View Imports ##
import ChatView from '../views/Chat/ChatView';
import ChatRequest from '../views/Chat/ChatRequest';
import InboxView from '../views/Chat/ChatInbox';
import HeaderContainer from '../HeaderContainer';
import { Image, Text, View } from 'react-native';
import ProfileUser from '../views/PeopleProfileView';
import UsersForTagView from '../views/UsersForTagView';

const StackNavigatorConfig = {
  navigationOptions: {
    header: props => <Header {...props} />,
    headerStyle: {
      backgroundColor: '#e8e9e8',
      elevation: 0, // disable header elevation when TabNavigator visible
    },
    headerTintColor: '#ff8a65',
  },
};

export default StackNavigator(
  {
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
  },
  StackNavigatorConfig,
);
