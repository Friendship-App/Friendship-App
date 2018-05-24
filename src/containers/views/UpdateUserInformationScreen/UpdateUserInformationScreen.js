import React, { Component } from 'react';
import Background from '../../../components/Background';
import Footer from '../../../components/Footer';
import { Text, View } from 'react-native';
import EditPersonalitiesScreen from '../EditPersonalitiesScreen';
import rest from '../../../utils/rest';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  updateUserPersonalities: credentials =>
    dispatch(
      rest.actions.updateUserPersonalities(
        {},
        { body: JSON.stringify({ ...credentials }) },
      ),
    ),
});

class UpdateUserInformationScreen extends Component {
  state = {
    selectedPersonalities: [],
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
    const { updateUserPersonalities } = this.props;
    const { selectedPersonalities } = this.state;

    let screen;
    let updateMethod;
    switch (this.props.navigation.state.params.updateScreen) {
      case 'personalities':
        screen = (
          <EditPersonalitiesScreen
            updatePersonalities={this.updatePersonalities}
            userId={this.props.navigation.state.params.userId}
          />
        );
        updateMethod = () => {
          updateUserPersonalities({
            userId: this.props.navigation.state.params.userId,
            personalities: selectedPersonalities,
          });
        };
        break;
      case 'tags':
        screen = <View />;
        break;
    }

    console.log(screen);

    return (
      <Background>
        {screen}
        <Footer secondary onPress={updateMethod}>
          <Text>SAVE</Text>
        </Footer>
      </Background>
    );
  }
}

UpdateUserInformationScreen.propTypes = {};

export default connect(null, mapDispatchToProps)(UpdateUserInformationScreen);
