import { StyleSheet } from 'react-native';
import { colors, fonts, paddings } from '../../styles';

export default StyleSheet.create({
  emptyChat: {
    flex: 1,
    backgroundColor: colors.WHITE,
    padding: paddings.MD,
  },
  title: {
    fontFamily: fonts.BOLD,
  },
  message: {
    paddingBottom: paddings.MD,
  },
  redirect: {
    textDecorationLine: 'underline',
    color: colors.ORANGE,
  },
});
