import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../styles';
import { Dimensions, Image, View } from 'react-native';
import wave from '../../../assets/img/curve/curve.png';
import styles from './styles';

class Footer extends Component {
  render() {
    const { children, color } = this.props;
    const { width } = Dimensions.get('window');

    let tintColor;

    switch (color) {
      case 'orange':
        tintColor = colors.ORANGE;
        break;
    }

    return (
      <View style={styles.footer}>
        <Image
          source={wave}
          style={[
            styles.footerWave,
            {
              width,
              tintColor,
            },
          ]}
        />
        <View
          style={[
            styles.footerContent,
            {
              backgroundColor: tintColor,
              width,
            },
          ]}
        >
          {children}
        </View>
      </View>
    );
  }
}

Footer.propTypes = {
  color: PropTypes.string,
};

Footer.defaultProps = {
  color: 'orange',
};

export default Footer;
