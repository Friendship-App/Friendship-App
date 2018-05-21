import { StyleSheet } from 'react-native';
import { colors, paddings } from '../../styles';

export default StyleSheet.create({
  footer: { position: 'absolute', bottom: 0, minHeight: 60 },
  footerWave: {
    resizeMode: 'stretch',
    alignSelf: 'flex-end',
  },
  footerContent: {
    backgroundColor: colors.ORANGE,
    flexDirection: 'row',
    paddingVertical: paddings.SM,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
