import React from 'react';
import {
  Text,
  Image,
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  Details,
  CompatibilityText,
  LocationText,
  YeahColor,
  NaahColor,
  UsernameText,
} from '../Text';
import Modal from 'react-native-modal';
import waveShape from '../../../assets/img/roundTab/roundTab.png';
import resolveAssetSource from 'resolveAssetSource';
const { width, height } = resolveAssetSource(waveShape);

const MyProfileTopPart = ({
  username,
  emoji,
  srcImage,
  location,
  age,
  genders,
  numberOfYeah,
  numberOfNaah,
  showModal,
}) => {
  return (
    <Image style={styles.imageUser} source={srcImage}>
      <TouchableOpacity onPress={showModal} style={styles.settings}>
        <Image
          style={styles.settingsIcon}
          source={require('../../../assets/settingsIcon.png')}
        />
      </TouchableOpacity>

      <View style={styles.emojiCircle}>
        <Text style={styles.emoji}>{emoji ? emoji : '✌️'}</Text>
      </View>

      <View
        style={{
          backgroundColor: 'transparent',
          justifyContent: 'flex-end',
          flex: 1,
        }}
      >
        <Image source={waveShape} style={styles.waveShape}>
          <UsernameText style={styles.username}>{username}</UsernameText>
          <CompatibilityText>
            you have
            <YeahColor> 15 Yeah </YeahColor>
            &
            <NaahColor> 30 Naah </NaahColor>
          </CompatibilityText>
        </Image>
        <View style={{ backgroundColor: '#F9F6F1' }}>
          <Details>
            <LocationText>{location ? location : 'Narnia'}</LocationText>
            {', ' + age + ', '}
            {genders}
          </Details>
        </View>
      </View>
    </Image>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 20,
  },
  viewContent: {
    backgroundColor: '#e8e9e8',
  },
  profileContainer: {
    alignItems: 'center',
    backgroundColor: '#faf5f0',
  },
  emojiCircle: {
    alignSelf: 'flex-end',
    marginTop: 65,
    marginRight: 5,
    width: 64,
    height: 64,
    borderRadius: 64,
    backgroundColor: '#ffffff',
  },
  emoji: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    fontSize: 40,
    paddingTop: 8,
  },
  username: {
    marginTop: 25,
  },
  waveShape: {
    height: Dimensions.get('window').width * height / width,
    width: Dimensions.get('window').width,
    tintColor: '#F9F6F1',
  },
  inCommon: {
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  yeahInCommon: {
    color: 'red',
  },
  naahInCommon: {
    color: 'blue',
  },
  imageUser: {
    width: Dimensions.get('window').width,
    height: 250,
  },
  settings: {
    alignSelf: 'flex-end',
    marginRight: 5,
    marginTop: 7,
  },
  settingsIcon: {
    width: 24,
    height: 24,
    tintColor: '#4A4A4A',
  },
});

export default MyProfileTopPart;
