import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { SearchBar } from 'react-native-elements';

import { ViewContainerTop } from '../../../components/Layout/Layout';

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({});

class ChatStartNew extends Component {
  navigateBack = () => {
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  };

  render() {
    return (
      <View>
        <ViewContainerTop style={{ backgroundColor: '#e8e9e8' }}>
          <TouchableOpacity
            onPress={() => this.navigateBack()}
            style={styles.backButton}
          >
            <Text style={{ fontSize: 22 }}> {'<'} </Text>
          </TouchableOpacity>
          <SearchBar
            lightTheme
            containerStyle={{
              backgroundColor: '#e8e9e8',
              borderTopColor: '#e8e9e8',
              borderBottomColor: '#e8e9e8',
              marginVertical: 10,
              marginHorizontal: 5,
            }}
            inputStyle={{ backgroundColor: '#fff' }}
            onChangeText={() => console.log('Searching')}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Search People"
            clearIcon
          />
        </ViewContainerTop>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    marginTop: 20,
    marginLeft: 10,
    backgroundColor: 'transparent',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatStartNew);
