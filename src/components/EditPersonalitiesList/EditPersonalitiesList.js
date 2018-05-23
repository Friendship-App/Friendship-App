import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import rest from '../../utils/rest';
import { connect } from 'react-redux';
import Personality from '../SignUp/Personality';
import { colors, paddings } from '../../styles';

const mapStateToProps = state => ({
  personalities: state.personalities,
});

const mapDispatchToProps = dispatch => ({
  getPersonalities: () => dispatch(rest.actions.personalities()),
});

const renderItem = ({ item }) => {
  return (
    <View
      style={{
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <Personality
        profile
        title={item.firstPersonality.name}
        image={item.firstPersonality.name}
        onPress={() => {
          console.log('clicked...');
        }}
      />
      <Text>or</Text>
      <Personality
        profile
        title={item.secondPersonality.name}
        image={item.secondPersonality.name}
        onPress={() => {
          console.log('clicked...');
        }}
      />
    </View>
  );
};

const keyExtractor = (personality, index) => `personality-${index}`;

const prepareData = personalities => {
  let preparedData = [];
  for (let i = 0; i < personalities.length; i += 2) {
    preparedData.push({
      firstPersonality: personalities[i],
      secondPersonality: personalities[i + 1],
    });
  }
  return preparedData;
};

class EditPersonalitiesList extends Component {
  componentWillMount() {
    this.props.getPersonalities();
  }

  render() {
    const { personalities } = this.props;

    if (personalities.loading || !personalities.sync) {
      return <ActivityIndicator />;
    }

    const data = prepareData(personalities.data);

    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={{ width: '100%', marginVertical: paddings.SM }}
      />
    );
  }
}

EditPersonalitiesList.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(
  EditPersonalitiesList,
);
