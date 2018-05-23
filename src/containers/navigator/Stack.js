import React from 'react';
import { StackNavigator } from 'react-navigation';
// ## View Imports ##
import Tabs from './Tabs';
import WelcomeView from '../views/WelcomeView';
import SignInView from '../views/SignIn/SignInView';
import ChatView from '../views/Chat/ChatView';
import ChatRequest from '../views/Chat/ChatRequest';
import UsersForTagView from '../views/UsersForTagView';
import EventDetailView from '../views/EventDetailView';
import EventCreateView from '../views/EventCreateView';
import EventEditView from '../views/EventEditView';
import Report from '../views/Report/Report';
import Feedback from '../views/Feedback/Feedback';
import Signup from '../views/SignUp/Signup';
import PeopleProfileView from '../views/PeopleProfileView';
import MyProfileView from '../views/MyProfileView';
import HeaderContainer from '../HeaderContainer/HeaderContainer';
import EditPersonalitiesScreen from '../views/EditPersonalitiesScreen';
import EditForm from '../../components/Profile/EditForm';

const StackNavigatorConfig = {
  transitionConfig: () => ({
    screenInterpolator: screenProps => {
      // Disable the transition animation when resetting to the welcome screen.
      if (
        screenProps.index === 0 &&
        screenProps.scene.route.routeName !== 'Welcome' &&
        screenProps.scenes.length > 2
      ) {
        return null;
      }
      // Otherwise, use the usual horizontal animation.
      return CardStackStyleInterpolator.forHorizontal(screenProps);
    },
  }),
};

//props => (<Header title='Welcome' {...props}/>)
export default StackNavigator(
  {
    Welcome: {
      screen: WelcomeView,
      navigationOptions: { header: null },
    },
    EditPersonalities: {
      screen: EditPersonalitiesScreen,
      navigationOptions: { header: null },
    },
    EditForm: {
      screen: EditForm,
      navigationOptions: { header: null },
    },
    SignUp: {
      screen: Signup,
      navigationOptions: { header: null },
    },
    Tabs: {
      screen: Tabs,
      navigationOptions: { header: null },
    },
    UsersForTag: {
      screen: UsersForTagView,
      navigationOptions: { title: 'Search page' },
    },
    SignIn: {
      screen: SignInView,
      navigationOptions: {
        header: props => (
          <HeaderContainer left="cancel" right="join" {...props} />
        ),
      },
    },
    ChatView: {
      screen: ChatView,
    },
    ChatRequest: {
      screen: ChatRequest,
      navigationOptions: { header: null },
    },
    EventDetailView: {
      screen: EventDetailView,
      navigationOptions: { header: null },
    },
    EventCreateView: {
      screen: EventCreateView,
      navigationOptions: { header: null },
    },
    EventEditView: {
      screen: EventEditView,
      navigationOptions: { header: null },
    },
    Report: {
      screen: Report,
      navigationOptions: { header: null },
    },
    Feedback: {
      screen: Feedback,
      navigationOptions: { header: null },
    },
    PeopleProfileView: {
      screen: PeopleProfileView,
      navigationOptions: { header: null },
    },
    MyProfileView: {
      screen: MyProfileView,
      navigationOptions: { header: null },
    },
    // ## End StackNavigator Views ##
  },
  // StackNavigatorConfig,
);
