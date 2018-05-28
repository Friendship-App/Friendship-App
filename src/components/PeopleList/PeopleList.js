import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { paddings } from '../../styles';
import { FlatList, View } from 'react-native';
import RoundTab from '../RoundTab';
import { Centered } from '../Layout/Layout';
import Person from '../Person';

class PeopleList extends Component {
  render() {
    return (
      <View style={{ flex: 1, marginTop: paddings.SM }}>
        <RoundTab tint="#ffffff" title="PEOPLE" />
        <Centered
          style={{ backgroundColor: '#fff', flex: 1, paddingBottom: 20 }}
        >
          <FlatList
            data={data}
            keyExtractor={(item, index) => 'list-item-' + index}
            renderItem={({ item }) => <Person box data={item} />}
            onEndReached={this.handleEnd}
            onEndReachedThreshold={0.4}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            horizontal
            style={{ maxHeight: 500 }}
          />
        </Centered>
      </View>
    );
  }
}

PeopleList.propTypes = {};

export default PeopleList;
