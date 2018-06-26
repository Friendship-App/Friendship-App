import React from 'react';
import { TabNavigator } from 'react-navigation';
import { IconImage } from '../../components/Layout/Layout';

import InboxChat from './InboxChat';
import PeopleNavigator from './People';
import MyProfile from './Profile';
import EventsNavigator from './Events';
import {
  Chat,
  Chat_selected,
  Events,
  Events_selected,
  People,
  People_selected,
  Profile,
  Profile_selected,
} from '../../../assets/tabIcons';
import { colors } from '../../styles';

const tabNavigationOptions = title => {
  switch (title) {
    case 'People':
      return {
        title,
        tabBarIcon: ({ focused, tintColor }) => (
          <IconImage source={focused ? People_selected : People} />
        ),
      };
    case 'Inbox':
      return {
        title,
        tabBarIcon: ({ focused, tintColor }) => (
          <IconImage source={focused ? Chat_selected : Chat} />
        ),
      };
    case 'Profile':
      return {
        title,
        tabBarIcon: ({ focused, tintColor }) => (
          <IconImage source={focused ? Profile_selected : Profile} />
        ),
      };
    case 'Events':
      return {
        title,
        tabBarIcon: ({ focused, tintColor }) => (
          <IconImage source={focused ? Events_selected : Events} />
        ),
      };
    default:
      break;
  }
};

const TabNavigatorConfig = {
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  tabBarOptions: {
    indicatorStyle: {
      tintColor: colors.ORANGE,
    },
    tintColor: 'black',
    activeTintColor: colors.ORANGE,
    inactiveTintColor: '#000000',
    style: {
      backgroundColor: 'white',
    },
    showIcon: true,
    labelStyle: {
      fontSize: 11,
      paddingBottom: 2,
    },
  },
};

export default TabNavigator(
  {
    People: {
      screen: PeopleNavigator,
      navigationOptions: tabNavigationOptions('People'),
    },
    Events: {
      screen: EventsNavigator,
      navigationOptions: tabNavigationOptions('Events'),
    },
    Inbox: {
      screen: InboxChat,
      navigationOptions: tabNavigationOptions('Inbox'),
    },
    MyProfile: {
      screen: MyProfile,
      navigationOptions: tabNavigationOptions('Profile'),
    },
  },
  TabNavigatorConfig,
);
