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
import { SearchBar } from 'react-native-elements';
import throttle from 'lodash/throttle';

import rest from '../../../utils/rest';
import {
  ViewContainerTop,
  ViewContainer,
} from '../../../components/Layout/Layout';
import PersonCard from '../../../components/PersonCard';

const mapDispatchToProps = dispatch => ({
  refreshUsersSearch: username => {
    /* .force() abort previous request if it performs and after that perform new request. This
    method combines abort and direct call action methods. it prevent a warning about unhandled
    promises rejection */
    dispatch(rest.actions.usersSearch.force({ username }));
  },
});

const mapStateToProps = state => ({
  usersSearch: state.usersSearch,
});

class ChatStartNew extends Component {
  state = {
    searchedUsername: '',
    userData: [],
  };

  navigateBack = () => {
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  };

  // Creates a throttled function that only invokes refreshUsersSearch at most once per every 1 second.
  getUserByUsername = throttle(username => {
    this.setState({ searchedUsername: username });
    this.props.refreshUsersSearch(username);
  }, 1000);

  keyExtractor = (item, index) => index;

  renderItem = ({ item }) => {
    return <PersonCard data={item} />;
  };

  renderUsersList() {
    const data =
      this.state.searchedUsername.length > 0
        ? this.props.usersSearch.data
        : this.state.userData;
    return (
      <FlatList
        data={data}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        style={{ flex: 1, backgroundColor: '#e8e9e8', minHeight: 300 }}
      />
    );
  }

  render() {
    return (
      <View style={{ backgroundColor: '#e8e9e8' }}>
        <View>
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
            onChangeText={username => this.getUserByUsername(username)}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Search People or Group"
            clearIcon
          />
        </View>
        <ViewContainer>{this.renderUsersList()}</ViewContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    marginTop: 30,
    marginLeft: 10,
    backgroundColor: 'transparent',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatStartNew);
