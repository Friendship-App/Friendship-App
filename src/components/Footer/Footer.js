import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors, paddings } from '../../styles';
import { Dimensions, Image, View } from 'react-native';
import wave from '../../../assets/img/curve/curve.png';

class Footer extends Component {
  render() {
    const { children } = this.props;
    const { width } = Dimensions.get('window');

    return (
      <View style={{ position: 'absolute', bottom: 0, minHeight: 60 }}>
        <Image
          source={wave}
          style={{
            width,
            resizeMode: 'stretch',
            alignSelf: 'flex-end',
            tintColor: colors.ORANGE,
          }}
        />
        <View
          style={{
            backgroundColor: colors.ORANGE,
            flexDirection: 'row',
            width,
            paddingVertical: paddings.SM,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          {children}
        </View>
      </View>
    );
  }
}

Footer.propTypes = {};

export default Footer;
