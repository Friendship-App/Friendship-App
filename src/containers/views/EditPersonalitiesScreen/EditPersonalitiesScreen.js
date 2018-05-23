import React, { Component } from 'react';
import Background from '../../../components/Background';
import EditPersonalitiesList from '../../../components/EditPersonalitiesList';
import Footer from '../../../components/Footer';
import { ActivityIndicator, Text } from 'react-native';
import rest from '../../../utils/rest';
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
    // const userId = this.props.navigation.state.params.personId;
    this.props.getUserPersonalities(2).then(data => this.prepareData(data));
  }

  prepareData = selectedPersonalities => {
    let data = [];
    selectedPersonalities.map(personality =>
      data.push(personality.personalityId),
    );
    this.setState({ selectedPersonalities: data });
  };

  updatePersonalities = (oldPersonality, newPersonality) => {
    let newSelectedPersonalities = this.state.selectedPersonalities;
    let pos = newSelectedPersonalities.indexOf(oldPersonality);
    if (pos > -1) {
      newSelectedPersonalities.splice(pos, 1, newPersonality);
    } else {
      newSelectedPersonalities.push(newPersonality);
    }
    newSelectedPersonalities.sort();
    this.setState({ selectedPersonalities: newSelectedPersonalities });
  };

  render() {
    const { userPersonalities, updateUserPersonalities } = this.props;
    const { selectedPersonalities } = this.state;

    if (
      userPersonalities.loading ||
      !userPersonalities.sync ||
      !selectedPersonalities
    ) {
      return <ActivityIndicator />;
    }

    return (
      <Background>
        <EditPersonalitiesList
          updatePersonalities={this.updatePersonalities}
          selectedPersonalities={selectedPersonalities}
        />
        <Footer
          secondary
          onPress={() => {
            updateUserPersonalities({
              userId: 10,
              personalities: selectedPersonalities,
            });
          }}
        >
          <Text>SAVE</Text>
        </Footer>
      </Background>
    );
  }
}

EditPersonalitiesScreen.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(
  EditPersonalitiesScreen,
);
