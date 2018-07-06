import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {
  ActivityIndicator,
  Image,
  Linking,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import moment from 'moment';

import CardSection from './CardSection';
import Card from './Card';
import { disableTouchableOpacity } from '../../actions';
import rest from '../../utils/rest';
import { FullscreenCentered } from '../Layout/Layout';

const mapDispatchToProps = dispatch => ({
  openEvent: (eventId, eventTitle, eventImage, participate, chatroomId) =>
    dispatch(
      NavigationActions.navigate({
        routeName: 'EventDetails',
        params: {
          eventId,
          eventTitle,
          eventImage,
          participate,
          chatroomId,
          isFromChat: false,
        },
      }),
    ),
});

class EventsDetail extends Component {
  state = { disabled: false };

  openMap = (city, address) => {
    if (Platform.OS === 'ios') {
      Linking.openURL(`http://maps.apple.com/maps?address=${city}, ${address}`);
    } else if (Platform.OS === 'android') {
      Linking.openURL(
        `http://maps.google.com/maps?address=${city}, ${address}`,
      );
    }
  };

  renderDateAndTime = date => {
    moment.updateLocale('en', {
      calendar: {
        lastDay: '[Yesterday]',
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        lastWeek: 'dddd, Do MMM',
        nextWeek: 'dddd, Do MMM',
        sameElse: 'dddd, Do MMM',
      },
    });

    const eventTime = moment.utc(new Date(date)).format('HH:mm');
    let eventDate;
    new Date().getMonth() === new Date(date).getMonth()
      ? (eventDate = moment.utc(new Date(date)).calendar())
      : (eventDate = moment.utc(new Date(date)).format('dddd, Do MMM'));

    if (eventDate === 'Today' || eventDate === 'Tomorrow') {
      return (
        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
          <Text style={{ fontFamily: 'NunitoSans-Bold' }}>{eventDate}</Text>
          <Text style={{ marginLeft: 5 }}>{eventTime}</Text>
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
          <Text>{eventDate}</Text>
          <Text style={{ marginLeft: 5 }}>{eventTime}</Text>
        </View>
      );
    }
  };

  render = () => {
    const {
      title,
      description,
      city,
      address,
      date,
      id,
      srcImage,
      avatars,
    } = this.props;
    const { titleTextStyle } = styles;

    return (
      <Card
        disabled={this.state.disabled}
        onPress={() => {
          disableTouchableOpacity(this);
          this.props.openEvent(
            id,
            title,
            srcImage,
            this.props.userParticipate,
            this.props.chatroomId,
          );
        }}
      >
        <Image
          source={{ uri: srcImage }}
          style={{ width: '100%', height: 250 }}
          resizeMode="stretch"
        />

        <CardSection>
          <View style={{ paddingTop: 9 }}>
            <Text style={titleTextStyle}>{title}</Text>
            <Text numberOfLines={1} style={styles.descriptionTextStyle}>
              {description}
            </Text>
          </View>
        </CardSection>

        {/* You can access participants avatars through "avatars" variable */}
        <CardSection>
          <View style={{ flexDirection: 'row' }}>
            {avatars.slice(0, 5).map(avatar => avatar)}
            <Text>
              {avatars.length > 0 ? avatars.length > 5 ? (
                `and ${avatars.length - 5} more`
              ) : (
                ''
              ) : (
                'No participants'
              )}
            </Text>
          </View>
        </CardSection>

        <CardSection>
          {this.renderDateAndTime(date)}
          <Text
            style={{ textAlign: 'right', paddingTop: 5, paddingBottom: 9 }}
            onPress={() => this.openMap(city, address)}
          >
            {city ? `${city}` : 'Narnia'}
          </Text>
        </CardSection>
      </Card>
    );
  };
}

const styles = StyleSheet.create({
  titleTextStyle: {
    fontSize: 22,
    fontFamily: 'NunitoSans-Bold',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionTextStyle: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 17,
    color: '#9d9fa9',
  },
});

export default connect(null, mapDispatchToProps)(EventsDetail);
