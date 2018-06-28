import React from 'react';
import { StackNavigator } from 'react-navigation';
import MyProfile from '../views/MyProfileView';
import UsersForTagView from '../views/UsersForTagView';
import HeaderContainer from '../HeaderContainer';
import UpdateUserInformationScreen from '../views/UpdateUserInformationScreen';
import EditForm from '../../components/Profile/EditForm';
import ProfileUser from '../views/PeopleProfileView';

export default StackNavigator({
  MyProfile: {
    screen: MyProfile,
    navigationOptions: { header: () => null },
  },
  EditForm: {
    screen: EditForm,
    navigationOptions: {
      tabBarVisible: false,
      header: props => (
        <HeaderContainer
          left="cancel"
          right="edit-more"
          color="light"
          {...props}
        />
      ),
    },
  },
  EditUserProfile: {
    screen: UpdateUserInformationScreen,
    navigationOptions: {
      tabBarVisible: false,
      header: props => <HeaderContainer left="back" {...props} />,
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
