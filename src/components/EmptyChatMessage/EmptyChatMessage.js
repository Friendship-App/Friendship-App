import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import { Text, View } from 'react-native';

class EmptyChatMessage extends Component {
  render() {
    return (
      <View style={[styles.emptyChat]}>
        <Text style={[styles.title, styles.message]}>Get busy chatting!</Text>
        <Text style={[styles.message]}>
          You have no active chats yet. To start a new chat, first find a person
          that seems interesting to you. Open their profile, see what you have
          in common and take it from there.
        </Text>
        <Text
          style={[styles.redirect]}
          onPress={() => this.props.goToPeopleView()}
        >
          Browse profiles
        </Text>
      </View>
    );
  }
}

EmptyChatMessage.propTypes = {};

export default EmptyChatMessage;
