import React from 'react';
import { StackNavigator } from 'react-navigation';
import EventsView from '../views/EventsView';
import EventCreateView from '../views/EventCreateView';
import EventDetailView from '../views/EventDetailView';
import HeaderContainer from '../HeaderContainer/HeaderContainer';

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
      header: props => (
        <HeaderContainer left="white-back" color="transparent" {...props} />
      ),
    },
  },
  // ## End StackNavigator Views ##
});
