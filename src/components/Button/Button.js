import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

class Button extends Component {
  render() {
    const { primary, text, width, onPress } = this.props;

    let style = primary ? styles.button : styles.buttonSecondary;
    let buttonTextStyle = primary
      ? styles.buttonText
      : styles.buttonTextSecondary;
    let buttonWidth;

    switch (width) {
      case 'sm':
        buttonWidth = 100;
        break;
      case 'md':
        buttonWidth = 150;
        break;
      case 'xl':
        buttonWidth = 200;
        break;
    }

    return (
      <TouchableOpacity
        style={[style, { width: buttonWidth }]}
        onPress={() => onPress()}
      >
        <Text style={[buttonTextStyle]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {};

export default Button;
