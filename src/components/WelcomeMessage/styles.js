import { StyleSheet } from 'react-native';
import { colors, fonts, fontSizes } from '../../styles';

export default StyleSheet.create({
  welcomeView: {
    alignItems: 'center',
  },
  WelcomeText: {
    fontSize: fontSizes.WELCOME_MESSAGE,
    fontFamily: fonts.TITLE,
    color: colors.WHITE,
    lineHeight: 60,
  },
  welcomeSubtitle: {
    fontSize: fontSizes.HEADING_4,
    fontFamily: fonts.TITLE,
    color: colors.WHITE,
    lineHeight: 100,
  },
});
