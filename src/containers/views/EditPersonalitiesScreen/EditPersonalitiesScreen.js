import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import rest from '../../../utils/rest';
import { connect } from 'react-redux';
import Background from '../../../components/Background';
import EditPersonalitiesList from '../../../components/EditPersonalitiesList';

const mapStateToProps = state => ({
  personalities: state.personalities,
});

const mapDispatchToProps = dispatch => ({
  getPersonalities: () => dispatch(rest.actions.personalities()),
});

class EditPersonalitiesScreen extends Component {
  componentWillMount() {
    this.props.getPersonalities();
  }

  render() {
    return (
      <Background scrollable>
        <EditPersonalitiesList />
      </Background>
    );
  }
}

EditPersonalitiesScreen.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(
  EditPersonalitiesScreen,
);
