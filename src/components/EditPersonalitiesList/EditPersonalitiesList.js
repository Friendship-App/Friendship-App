import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, FlatList } from 'react-native';
import rest from '../../utils/rest';
import { connect } from 'react-redux';
import Personality from '../SignUp/Personality';

const mapStateToProps = state => ({
  personalities: state.personalities,
});

const mapDispatchToProps = dispatch => ({
  getPersonalities: () => dispatch(rest.actions.personalities()),
});

const renderItem = ({ item }) => {
  console.log(item);
  return (
    <Personality
      title={item.name}
      image={item.name}
      onPress={() => {
        console.log('clicked');
      }}
    />
  );
};

const keyExtractor = personality => `personality-${personality.id}`;

class EditPersonalitiesList extends Component {
  componentWillMount() {
    this.props.getPersonalities();
  }

  render() {
    const { personalities } = this.props;

    if (personalities.loading || !personalities.sync) {
      return <ActivityIndicator />;
    }

    return (
      <FlatList
        data={this.props.personalities.data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={{ width: '100%' }}
      />
    );
  }
}

EditPersonalitiesList.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(
  EditPersonalitiesList,
);
