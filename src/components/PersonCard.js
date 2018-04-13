import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({});

const PersonCard = ({ data }) => (
  <TouchableHighlight onPress={() => console.log(`User ${data.username}`)}>
    <View style={styles.personCard}>
      <View style={styles.iconWrapper}>
        <View style={styles.iconHolder}>
          <Text>{data.emoji}</Text>
        </View>
      </View>
      <View style={styles.usernameWrapper}>
        <Text style={{ fontSize: 18 }}> {data.username}</Text>
      </View>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  personCard: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 12,
  },
  iconWrapper: {
    flex: 1,
  },
  iconHolder: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameWrapper: {
    flex: 6,
    justifyContent: 'center',
  },
});

export default PersonCard;
