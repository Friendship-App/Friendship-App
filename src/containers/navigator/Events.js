import React from 'react';
import { StackNavigator } from 'react-navigation';
import EventsView from '../views/EventsView';
import EventCreateView from '../views/EventCreateView';
import EventDetailView from '../views/EventDetailView';
import HeaderContainer from '../HeaderContainer/HeaderContainer';
import UsersForTagView from '../views/UsersForTagView';
import EventEditView from '../views/EventEditView';
import ProfileUser from '../views/PeopleProfileView';

export default StackNavigator({
  Events: {
    screen: EventsView,
    navigationOptions: { header: () => null },
  },
  EventDetails: {
    screen: EventDetailView,
    navigationOptions: {
      tabBarVisible: false,
      header: props => (
        <HeaderContainer left="white-back" color="transparent" {...props} />
      ),
    },
  },
  CreateEvent: {
    screen: EventCreateView,
    navigationOptions: {
      tabBarVisible: false,
      header: props => (
        <HeaderContainer left="white-back" color="transparent" {...props} />
      ),
    },
  },
  EventEditView: {
    screen: EventEditView,
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
  ProfileUser: {
    screen: ProfileUser,
    navigationOptions: {
      tabBarVisible: false,
      header: props => (
        <HeaderContainer left="white-back" color="transparent" {...props} />
      ),
    },
  },
  // ## End StackNavigator Views ##
});
