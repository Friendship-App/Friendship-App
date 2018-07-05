import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, fonts, fontSizes, paddings } from '../../styles';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { Chat } from '../../../assets/tabIcons';
import { IconImage } from '../../components/Layout/Layout';

const mapDispatchToProps = dispatch => ({
  back: (backTo = {}) => dispatch(NavigationActions.back(backTo)),
  navigateTo: (screen, args = {}) =>
    dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: screen,
            params: args,
          }),
        ],
      }),
    ),
});

class HeaderContainer extends Component {
  state = {
    anim: new Animated.Value(0),
    dropdownVisible: false,
  };

  render() {
    return (
      <View>
        <Animated.View
          style={[
            {
              width: '100%',
              position: 'absolute',
              backgroundColor: colors.DARK_GREY,
              paddingTop: paddings.SM,
            },
            {
              top: this.state.anim.interpolate({
                inputRange: [0, 1],
                outputRange: [-400, 60],
              }),
            },
          ]}
        >
          <TouchableOpacity
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              this.toggleDropdown(100);
              this.props.navigation.navigate('EditUserProfile', {
                userId: this.props.navigation.state.routes[
                  this.props.navigation.state.index
                ].params.userData.id,
                updateScreen: 'tags',
              });
            }}
          >
            <Text
              style={{
                fontFamily: fonts.SEMI_BOLD,
                fontSize: fontSizes.BODY_TEXT,
                paddingBottom: paddings.SM,
              }}
            >
              Tags Settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              this.toggleDropdown(100);
              this.props.navigation.navigate('EditUserProfile', {
                userId: this.props.navigation.state.routes[
                  this.props.navigation.state.index
                ].params.userData.id,
                updateScreen: 'personalities',
              });
            }}
          >
            <Text
              style={{
                fontFamily: fonts.SEMI_BOLD,
                fontSize: fontSizes.BODY_TEXT,
                paddingBottom: paddings.SM,
              }}
            >
              Personalities Settings
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Header
          leftComponent={this.getLeftComponent(this.props.left)}
          rightComponent={this.getRightComponent(this.props.right)}
          title={this.props.title}
          titleComponent={this.props.titleComponent}
          color={this.props.color}
        />
      </View>
    );
  }

  getLeftComponent(type) {
    switch (type) {
      case 'cancel':
        return (
          <Button
            text="Cancel"
            type="secondary"
            header
            onPress={() => this.props.back(this.props.backTo)}
          />
        );
      case 'back':
        return (
          <Button
            icon={
              <Icon name={'md-arrow-back'} color={colors.ORANGE} size={26} />
            }
            type="secondary"
            header
            onPress={() => this.props.back(this.props.backTo)}
          />
        );
      case 'white-back':
        return (
          <Button
            icon={
              <Icon name={'md-arrow-back'} color={colors.WHITE} size={26} />
            }
            type="floatingButton"
            header
            onPress={() => this.props.back(this.props.backTo)}
          />
        );
    }
  }

  toggleDropdown = duration => {
    Animated.timing(this.state.anim, {
      toValue: Number(!this.state.dropdownVisible),
      duration,
    }).start();
    this.setState(prevState => ({
      dropdownVisible: !prevState.dropdownVisible,
    }));
    return true;
  };

  getRightComponent(type) {
    switch (type) {
      case 'join':
        return (
          <Button
            text="Join"
            type="secondary"
            header
            onPress={() => this.props.navigation.navigate('SignUp')}
          />
        );
      case 'edit-more':
        return (
          <Button
            text="+"
            type="secondary"
            header
            onPress={() => {
              this.toggleDropdown(300);
            }}
          />
        );
      case 'event-chat':
        return (
          <Button
            icon={
              <IconImage
                source={Chat}
                tintColor={colors.WHITE}
                style={{ marginVertical: paddings.XXS }}
              />
            }
            type="floatingButton"
            header
            onPress={() => {
              /*params: { chatroomId, id, username, avatar },*/
              this.props.navigation.navigate('ChatView', {
                chatroomId: this.props.navigation.state.routes[
                  this.props.navigation.state.routes.length - 1
                ].params.eventId,
                username: this.props.navigation.state.routes[
                  this.props.navigation.state.routes.length - 1
                ].params.eventTitle,
                avatar: this.props.navigation.state.routes[
                  this.props.navigation.state.routes.length - 1
                ].params.eventImage,
                event: true,
              });
            }}
          />
        );
    }
  }
}

HeaderContainer.propTypes = {};

export default connect(null, mapDispatchToProps)(HeaderContainer);
