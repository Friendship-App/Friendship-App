import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { colors } from '../../styles';

class Input extends Component {
  state = {
    text: '',
  };

  handleChange = value => {
    this.setState({ text: value });
  };

  render() {
    const { text } = this.state;
    const { title, color } = this.props;

    let titleColor;
    switch (color) {
      case 'white':
        titleColor = colors.WHITE;
        break;
    }

    return (
      <View style={[styles.wrapper, this.props.style]}>
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
        <TextInput
          style={[styles.textInput]}
          underlineColorAndroid="transparent"
          placeholderTextColor={colors.PLACEHOLDER}
          onChangeText={value => this.handleChange(value)}
          value={text}
          {...this.props.inputProps}
        />
        <View style={[styles.horizontalLine]} />
      </View>
    );
  }
}

Input.propTypes = {
  inputProps: PropTypes.object,
  title: PropTypes.string,
  color: PropTypes.string,
};

Input.defaultProps = {
  color: 'white',
};

export default Input;
