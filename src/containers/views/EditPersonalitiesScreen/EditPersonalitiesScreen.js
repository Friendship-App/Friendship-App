import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditPersonalitiesList from '../../../components/EditPersonalitiesList';
import rest from '../../../utils/rest';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  userPersonalities: state.personalitiesForUser,
});

const mapDispatchToProps = dispatch => ({
  getUserPersonalities: userId =>
    dispatch(rest.actions.personalitiesForUser.get({ userId })),
  updateUserPersonalities: credentials =>
    dispatch(
      rest.actions.updateUserPersonalities(
        {},
        { body: JSON.stringify({ ...credentials }) },
      ),
    ),
});

class EditPersonalitiesScreen extends Component {
  state = {
    selectedPersonalities: [],
  };

  componentWillMount() {
    const userId = this.props.userId;
    this.props
      .getUserPersonalities(userId)
      .then(data => this.prepareData(data));
  }

  prepareData = selectedPersonalities => {
    let data = [];
    selectedPersonalities.map(personality =>
      data.push(personality.personalityId),
    );
    this.setState({ selectedPersonalities: data });
  };

  render() {
    console.log(this.state);
    const { userPersonalities } = this.props;
    const { selectedPersonalities } = this.state;

    if (
      userPersonalities.loading ||
      !userPersonalities.sync ||
      !selectedPersonalities
    ) {
      return <ActivityIndicator />;
    }

    return (
      <EditPersonalitiesList
        updatePersonalities={this.props.updatePersonalities}
        selectedPersonalities={selectedPersonalities}
      />
    );
  }
}

EditPersonalitiesScreen.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(
  EditPersonalitiesScreen,
);
