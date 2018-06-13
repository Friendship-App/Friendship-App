import { StyleSheet } from 'react-native';
import {
  colors,
  fonts,
  fontSizes,
  footerText,
  paddings,
} from '../../../styles';

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
  footerText,
  container: {
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    paddingHorizontal: paddings.MD,
    justifyContent: 'center',
  },
  keyboardView: {
    height: '100%',
    width: '100%',
  },
  input: {
    marginBottom: 30,
  },
  forgottenPassword: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgottenPasswordText: {
    color: colors.BEIGE,
    textDecorationLine: 'underline',
    paddingTop: paddings.SM,
  },
});
