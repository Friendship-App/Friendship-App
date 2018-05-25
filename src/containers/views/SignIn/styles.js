import { StyleSheet } from 'react-native';
import { colors, fonts, fontSizes } from '../../../styles';

export default StyleSheet.create({
  statusTextStyle: {
    fontFamily: 'NunitoSans-Regular',
    width: '100%',
    height: 20,
    fontSize: 15,
    textAlign: 'center',
    color: '#f673f7',
    marginTop: 20,
  },
  footerText: {
    fontFamily: fonts.BOLD,
    fontSize: fontSizes.BODY_TEXT,
    color: colors.WHITE,
  },
});
