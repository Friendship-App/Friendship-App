import React from 'react';
import { StackNavigator } from 'react-navigation';
import EventsView from '../views/EventsView';
import EventsDetail from '../../components/Events/EventsDetail';
import EventCreateView from '../views/EventCreateView';
import HeaderContainer from '../HeaderContainer/HeaderContainer';

export default StackNavigator({
  Events: {
    screen: EventsView,
    navigationOptions: { header: () => null },
  },
  EventDetails: {
    screen: EventsDetail,
    navigationOptions: {
      tabBarVisible: false,
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
