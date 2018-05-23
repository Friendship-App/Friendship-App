import React, { Component } from 'react';
import Background from '../../../components/Background';
import EditPersonalitiesList from '../../../components/EditPersonalitiesList';
import Footer from '../../../components/Footer';
import { Text } from 'react-native';

class EditPersonalitiesScreen extends Component {
  render() {
    return (
      <Background scrollable>
        <EditPersonalitiesList />
        <Footer>
          <Text>SAVE</Text>
        </Footer>
      </Background>
    );
  }
}

EditPersonalitiesScreen.propTypes = {};

export default EditPersonalitiesScreen;
