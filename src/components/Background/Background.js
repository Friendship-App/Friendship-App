import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { colors } from '../../styles';
import styles from './styles';

class Background extends Component {
  render() {
    const { children, color } = this.props;

    let backgroundColor;

    switch (color) {
      case 'blue':
        backgroundColor = colors.DARK_BLUE;
        break;
      case 'light_grey':
        backgroundColor = colors.LIGHT_GREY;
        break;
      case 'grey':
        backgroundColor = colors.MEDIUM_GREY;
        break;
    }

    return (
      <View style={[styles.background, { backgroundColor }]}>{children}</View>
    );
  }
}

Background.propTypes = {
  colors: PropTypes.string,
};

Background.defaultProps = {
  colors: 'blue',
};

export default Background;
