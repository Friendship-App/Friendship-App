import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  AppState,
} from 'react-native';
import {
  CompatibilityText,
  Details,
  FrienshipFont,
  LocationText,
  NaahColor,
  UsernameText,
  YeahColor,
} from '../Layout/TextLayout';

import Icon from 'react-native-vector-icons/Ionicons';
import waveShape from '../../../assets/img/curve/curve.png';
import resolveAssetSource from 'resolveAssetSource';

const { width, height } = resolveAssetSource(waveShape);

class ProfileTopPart extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),
  };

  componentDidMount() {
    //AppState.addEventListener('click', () => {console.log('Event detected !');})
  }

  fade(toValue) {
    Animated.timing(this.state.fadeAnim, {
      toValue,
      duration: 100,
    }).start();
  }

  render() {
    const {
      birthyear,
      avatar,
      location,
      navigateBack,
      numberOfNaah,
      numberOfYeah,
      srcImage,
      showModal,
      username,
      myProfile,
      genderList,
      showEditForm,
    } = this.props;

    const getAge = () => {
      const parsedBirthYear = parseInt(birthyear);
      const now = new Date();
      let age = now.getFullYear() - parsedBirthYear;

      const early = [0, 1, 2, 3];
      const mid = [4, 5, 6];
      const late = [7, 8, 9];
      let ageName = '';
      const lastDigit = age.toString().substr(age.toString().length - 1);
      if (age < 20) {
        ageName = age + ' years old';
      } else if (early.indexOf(parseInt(lastDigit)) > -1) {
        ageName = 'early ' + (age - parseInt(lastDigit)) + "'s";
      } else if (mid.indexOf(parseInt(lastDigit)) > -1) {
        ageName = 'mid ' + (age - parseInt(lastDigit)) + "'s";
      } else if (late.indexOf(parseInt(lastDigit)) > -1) {
        ageName = 'late ' + (age - parseInt(lastDigit)) + "'s";
      } else {
        ageName = "It's a mystery";
      }
      return ageName;
    };

    const getGenders = () => {
      return genderList
        ? genderList.map(gender => gender && gender.toLowerCase()).join(' and ')
        : 'no gender';
    };

    const displaySettingsButton = () => {
      if (myProfile) {
        return (
          <TouchableOpacity
            onPress={() => this.fade(this.state.fadeAnim._value === 0 ? 1 : 0)}
            style={{
              backgroundColor: 'rgb(255,138,101)',
              height: 35,
              width: 35,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 2,
              paddingLeft: 2,
              marginRight: 10,
            }}
          >
            <Icon name="md-settings" size={26} style={styles.backButton} />
          </TouchableOpacity>
        );
      }

      return null;
    };

    return (
      <View
        onResponderGrant={evt =>
          this.state.fadeAnim._value > 0 ? this.fade(0) : null}
        onStartShouldSetResponder={evt => true}
      >
        <Animated.View
          style={{
            width: '70%',
            position: 'absolute',
            top: 50,
            right: 10,
            backgroundColor: '#fff',
            elevation: 10,
            shadowOpacity: 1,
            shadowOffset: { width: 0, height: 0 },
            zIndex: this.state.fadeAnim,
            borderRadius: 10,
            opacity: this.state.fadeAnim,
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => console.log('clicked 1 ...')}
          >
            <Text>Privacy Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => console.log('clicked 2...')}
          >
            <Text>Send Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => console.log('clicked 3...')}
          >
            <Text>Log Out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => console.log('clicked 4...')}
          >
            <Text>Test</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => console.log('clicked 5...')}
          >
            <Text>Test</Text>
          </TouchableOpacity>
        </Animated.View>
        <Image style={styles.imageUser} source={{ uri: srcImage }} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            width: '100%',
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}
        >
          <View style={styles.backAndSettingsView}>
            <TouchableOpacity
              onPress={navigateBack}
              style={{
                backgroundColor: 'rgb(255,138,101)',
                height: 35,
                width: 35,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 10,
              }}
            >
              <Icon name="md-arrow-back" size={26} style={styles.backButton} />
            </TouchableOpacity>
            {displaySettingsButton()}
          </View>
          <View style={{ flex: 3, flexDirection: 'column' }}>
            <View style={styles.avatarCircle}>
              <Image
                source={{ uri: avatar }}
                style={{
                  width: 64,
                  height: 64,
                  backgroundColor: 'transparent',
                  marginRight: 15,
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: 'transparent',
                flex: 2,
              }}
            >
              <Image
                source={waveShape}
                style={styles.waveShape}
                resizeMode="stretch"
              />
              <View style={{ flex: 3, backgroundColor: '#F9F6F1' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <UsernameText>
                    {username.length > 15 ? (
                      username.substr(0, 15).concat('…')
                    ) : (
                      username
                    )}
                  </UsernameText>
                  {myProfile ? (
                    <TouchableOpacity onPress={() => showEditForm()}>
                      <Image
                        source={require('../../../assets/edit.png')}
                        style={{ width: 38, height: 38, tintColor: '#000' }}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
                <CompatibilityText
                  style={{
                    textAlign: 'center',
                    marginBottom: 0,
                  }}
                >
                  {myProfile ? 'You have ' : null}
                  <YeahColor>
                    {numberOfYeah} <FrienshipFont> YEAHS </FrienshipFont>
                  </YeahColor>
                  &
                  <NaahColor>
                    {' ' + numberOfNaah} <FrienshipFont> NAAHS </FrienshipFont>
                  </NaahColor>
                  {myProfile ? null : ' in common'}
                </CompatibilityText>
                <Details>
                  <LocationText>{location ? location : 'Narnia'}</LocationText>
                  {', ' + getAge() + ', '}
                  {getGenders()}
                </Details>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatarCircle: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
    width: '100%',
  },
  avatar: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    fontSize: Platform.OS === 'android' ? 30 : 40,
    paddingTop: 8,
  },
  waveShape: {
    height: 40,
    width: Dimensions.get('window').width,
    tintColor: '#F9F6F1',
  },
  imageUser: {
    width: Dimensions.get('window').width,
    height: 350,
  },
  backAndSettingsView: {
    marginTop: 10,
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  buttonStyle: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});

export default ProfileTopPart;
